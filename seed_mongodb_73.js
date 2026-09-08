import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { INITIAL_IDOLS } from './src/data/idolsData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anunand2004_db_user:EVvPnTq5Nn43iEY1@cluster0.3anonxd.mongodb.net/ganpati_booking?retryWrites=true&w=majority';

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

const Idol = mongoose.models.Idol || mongoose.model('Idol', idolSchema);

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    // Delete old demo items
    await Idol.deleteMany({});
    console.log('Cleared old demo items from MongoDB Atlas!');

    // Insert all 73 PDF catalog idols
    const inserted = await Idol.insertMany(INITIAL_IDOLS);
    console.log(`✅ Successfully inserted ${inserted.length} catalog murtis into MongoDB Atlas!`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
    process.exit(1);
  }
}

seed();
