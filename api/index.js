import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anunand2004_db_user:EVvPnTq5Nn43iEY1@cluster0.3anonxd.mongodb.net/ganpati_booking?retryWrites=true&w=majority';

// Cached connection for Vercel Serverless functions
let isConnected = false;
async function connectToDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas via Vercel Serverless Function');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
}

app.use(async (req, res, next) => {
  await connectToDatabase();
  next();
});

// Mongoose Schemas & Models
const idolSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    nameMr: { type: String, required: true },
    nameEn: { type: String, required: true },
    origin: { type: String, required: true },
    heightFeet: { type: Number, required: true },
    material: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    image: { type: String, required: true },
    descriptionMr: { type: String },
    descriptionEn: { type: String },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    bookedCount: { type: Number, default: 0 },
    stallNo: { type: String, required: true },
    colorScheme: { type: String }
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    idolId: { type: String, required: true },
    idolNameMr: { type: String, required: true },
    idolNameEn: { type: String, required: true },
    idolImage: { type: String },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pickupDate: { type: String, required: true },
    tokenAmount: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    balanceAmount: { type: Number, required: true },
    paymentMode: { type: String, default: 'UPI' },
    paymentStatus: { type: String, default: 'Advance Paid' },
    bookingDate: { type: String, required: true },
    utrNumber: { type: String, default: '' },
    status: { type: String, default: 'Pending Verification' }
  },
  { timestamps: true }
);

const Idol = mongoose.models.Idol || mongoose.model('Idol', idolSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ganpati Booking Vercel API connected to MongoDB Atlas' });
});

app.get('/api/idols', async (req, res) => {
  try {
    const idols = await Idol.find().sort({ createdAt: -1 });
    res.json(idols);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch idols', details: err.message });
  }
});

app.post('/api/idols', async (req, res) => {
  try {
    const newIdol = new Idol(req.body);
    const saved = await newIdol.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create idol', details: err.message });
  }
});

app.patch('/api/idols/:id/availability', async (req, res) => {
  try {
    const updated = await Idol.findOneAndUpdate(
      { id: req.params.id },
      { isAvailable: req.body.isAvailable },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update availability', details: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const saved = await newBooking.save();

    await Idol.findOneAndUpdate(
      { id: req.body.idolId },
      { $inc: { bookedCount: 1 } }
    );

    // System Server Alert Dispatch
    console.log(`🔔 [SYSTEM BACKEND ALERT] New Booking ${saved.bookingId} received for ${saved.customerName} (UTR: ${saved.utrNumber || 'N/A'})`);
    if (process.env.ADMIN_WEBHOOK_URL) {
      fetch(process.env.ADMIN_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'NEW_BOOKING_ALERT',
          adminPhone: '9284169779',
          booking: saved
        })
      }).catch(err => console.error('Webhook error:', err));
    }

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save booking', details: err.message });
  }
});

app.get('/api/bookings/track', async (req, res) => {
  try {
    const query = req.query.query ? req.query.query.toString().trim() : '';
    if (!query) return res.json([]);

    const matches = await Booking.find({
      $or: [
        { bookingId: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } },
        { customerName: { $regex: query, $options: 'i' } }
      ]
    }).sort({ createdAt: -1 });

    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search bookings', details: err.message });
  }
});

app.patch('/api/bookings/:bookingId/status', async (req, res) => {
  try {
    const updated = await Booking.findOneAndUpdate(
      { bookingId: req.params.bookingId },
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update booking status', details: err.message });
  }
});

export default app;
