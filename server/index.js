import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anunand2004_db_user:EVvPnTq5Nn43iEY1@cluster0.3anonxd.mongodb.net/ganpati_booking?retryWrites=true&w=majority';

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Cloud Database successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

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

const Idol = mongoose.model('Idol', idolSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Initial Seed Dataset if collection is empty
const INITIAL_IDOLS = [
  {
    id: 'GAN-101',
    nameMr: 'पेण लालबागचा राजा स्टाईल',
    nameEn: 'Pen Lalbaugcha Raja Style',
    origin: 'Pen',
    heightFeet: 2.5,
    material: 'Shadu Mati (Eco-Friendly)',
    category: 'Home',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'पेण येथील प्रख्यात कारागिरांनी बनवलेली आकर्षक लालबागचा राजा स्टाईल मूर्ती.',
    descriptionEn: 'Famous Pen artisan handcrafted Lalbaugcha Raja style Ganesh idol.',
    isAvailable: true,
    isFeatured: true,
    bookedCount: 14,
    stallNo: 'स्टॉल नं. A-1',
    colorScheme: 'शाही लाल आणि सुवर्ण रंग (Royal Red & Gold)'
  },
  {
    id: 'GAN-102',
    nameMr: 'नगर श्रीमंत दगडूशेठ हलवाई मूर्ती',
    nameEn: 'Ahmednagar Shrimant Dagdusheth Style',
    origin: 'Ahmednagar',
    heightFeet: 2.0,
    material: 'Shadu Mati (Eco-Friendly)',
    category: 'Home',
    price: 2800,
    originalPrice: 3400,
    image: 'https://images.unsplash.com/photo-1567591370504-20d0f19c3b88?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'नगर येथील विशेष रंगसंगतीसह दगडूशेठ गणपती डिझाईन.',
    descriptionEn: 'Special Ahmednagar color-work Dagdusheth style Ganpati idol.',
    isAvailable: true,
    isFeatured: true,
    bookedCount: 22,
    stallNo: 'स्टॉल नं. A-2',
    colorScheme: 'सुवर्ण पिवळा व गुलाबी (Golden Yellow & Pink)'
  },
  {
    id: 'GAN-103',
    nameMr: 'चिंतामणी पेण विशेष मूर्ती',
    nameEn: 'Pen Chintamani Special Idol',
    origin: 'Pen',
    heightFeet: 3.0,
    material: 'Shadu Mati (Eco-Friendly)',
    category: 'Mandal',
    price: 4500,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1631024724206-6ccc65fe8c61?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'पेणचे उत्कृष्ट नक्षीकाम आणि बसलेल्या मुद्रेतील चिंतामणी मूर्ती.',
    descriptionEn: 'Exquisite Pen craftsmanship Chintamani idol in seated pose.',
    isAvailable: true,
    isFeatured: true,
    bookedCount: 9,
    stallNo: 'स्टॉल नं. B-1',
    colorScheme: 'केशरी व मोरपिंची (Saffron & Peacock Blue)'
  },
  {
    id: 'GAN-104',
    nameMr: 'बाल गणपती गोंडस मूर्ती',
    nameEn: 'Bal Ganpati Cute Edition',
    origin: 'Pen',
    heightFeet: 1.5,
    material: 'Shadu Mati (Eco-Friendly)',
    category: 'Home',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1567591370504-20d0f19c3b88?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'लहान मुलांच्या व कुटुंबाच्या पसंतीची गोंडस बाल गणपती मूर्ती.',
    descriptionEn: 'Charming Bal Ganesha idol beloved by kids and families.',
    isAvailable: true,
    isFeatured: false,
    bookedCount: 31,
    stallNo: 'स्टॉल नं. C-1',
    colorScheme: 'हलका पिवळा व निळा (Pastel Yellow & Soft Blue)'
  },
  {
    id: 'GAN-105',
    nameMr: 'ऑफिस व दुकान विशेष गणराज',
    nameEn: 'Office & Shop Special Ganraj',
    origin: 'Ahmednagar',
    heightFeet: 1.2,
    material: 'Brass Accent',
    category: 'Office',
    price: 1500,
    originalPrice: 1900,
    image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'व्यापार, दुकान व ऑफिस टेबलवर स्थापनेसाठी विशेष लहान व तेजस्वी मूर्ती.',
    descriptionEn: 'Compact radiant idol designed specifically for offices & shops.',
    isAvailable: true,
    isFeatured: false,
    bookedCount: 18,
    stallNo: 'स्टॉल नं. C-2',
    colorScheme: 'तांबडी माती व सोनेरी स्पर्श (Clay Red & Gold Touch)'
  },
  {
    id: 'GAN-106',
    nameMr: 'शाही पेशवाई सुवर्ण सिंहासन मूर्ती',
    nameEn: 'Shahi Peshwai Gold Throne Idol',
    origin: 'Pen',
    heightFeet: 4.0,
    material: 'POP',
    category: 'Mandal',
    price: 7500,
    originalPrice: 8900,
    image: 'https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?auto=format&fit=crop&q=80&w=800',
    descriptionMr: 'भव्य सिंहासनारूढ पेशवाई डिझाईन. सुवर्ण दागिने आणि भरजरी वस्त्रभूषेने नटलेली मूर्ती.',
    descriptionEn: 'Royal Peshwai design seated on an ornate golden throne.',
    isAvailable: true,
    isFeatured: true,
    bookedCount: 5,
    stallNo: 'स्टॉल नं. Special VIP',
    colorScheme: 'शाही जांभळा व सुवर्ण (Royal Purple & Gold)'
  }
];

// API Routes

// 1. GET /api/idols - Fetch all Ganesh Idols from MongoDB
app.get('/api/idols', async (req, res) => {
  try {
    let idols = await Idol.find().sort({ createdAt: -1 });
    if (idols.length === 0) {
      // Auto seed initial data
      idols = await Idol.insertMany(INITIAL_IDOLS);
    }
    res.json(idols);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch idols', details: err.message });
  }
});

// 2. POST /api/idols - Create new Ganesh Idol listing
app.post('/api/idols', async (req, res) => {
  try {
    const newIdol = new Idol(req.body);
    const saved = await newIdol.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create idol', details: err.message });
  }
});

// 3. PATCH /api/idols/:id/availability - Toggle Idol Availability
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

// 4. GET /api/bookings - Fetch all Bookings (Admin)
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: err.message });
  }
});

// 5. POST /api/bookings - Create new Customer Booking
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const saved = await newBooking.save();

    // Increment booked count on corresponding Idol
    await Idol.findOneAndUpdate(
      { id: req.body.idolId },
      { $inc: { bookedCount: 1 } }
    );

    // System Backend Alert Dispatch
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

// 6. GET /api/bookings/track?query=... - Search Bookings by Mobile or Booking ID
app.get('/api/bookings/track', async (req, res) => {
  try {
    const query = req.query.query ? req.query.query.toString().trim() : '';
    if (!query) {
      return res.json([]);
    }

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

// 7. PATCH /api/bookings/:bookingId/status - Update Booking Status
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ganpati Booking API connected to MongoDB Atlas' });
});

app.listen(PORT, () => {
  console.log(`🚀 Ganpati Booking Backend Server running on http://localhost:${PORT}`);
});
