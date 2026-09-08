import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';

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

const murti_names_mr = [
  "पेण लालबागचा राजा स्पेशल", "नगर श्रीमंत दगडूशेठ हलवाई मूर्ती", "पेण चिंतामणी विशेष", 
  "बाल गणपती गोंडस मूर्ती", "शाही पेशवाई सुवर्ण सिंहासन", "तितवाळा गणपती क्लासिक", 
  "इको-फ्रेंडली शुद्ध शाडू माती", "सुवर्ण मुकुट गणराज", "राजा मोरया होम & ऑफिस",
  "पेण विशेष पेशवाई बाप्पा", "नगर सुवर्ण नक्षीकाम मूर्ती", "वरदविनायक पारंपरिक मूर्ती",
  "मयुरेश गणेश विशेष", "सिद्धिविनायक सिंहासनारूढ", "महागणपती भव्य रूप"
];

const murti_names_en = [
  "Pen Lalbaugcha Raja Special", "Ahmednagar Shrimant Dagdusheth Style", "Pen Chintamani Edition",
  "Bal Ganesha Cute Edition", "Shahi Peshwai Golden Throne", "Titwala Classic Idol",
  "Eco-Friendly Pure Shadu Clay", "Golden Crown Radiant Idol", "Raja Morya Home & Office",
  "Pen Special Peshwai Bappa", "Nagar Gold Carving Idol", "Varadvinayak Traditional Murti",
  "Mayureshesh Ganesh Special", "Siddhivinayak Seated Throne", "Mahaganpati Grand Edition"
];

const origins = ["Pen", "Ahmednagar", "Pen", "Ahmednagar", "Special Edition"];
const materials = ["Shadu Mati (Eco-Friendly)", "Shadu Mati (Eco-Friendly)", "POP", "Brass Accent"];
const categories = ["Home", "Home", "Office", "Mandal", "Shop"];
const colors = [
  "शाही लाल आणि सुवर्ण (Royal Red & Gold)",
  "सुवर्ण पिवळा व गुलाबी (Golden Yellow & Pink)",
  "केशरी व मोरपिंची (Saffron & Peacock Blue)",
  "हलका पिवळा व निळा (Pastel Yellow & Soft Blue)",
  "शाही जांभळा व सुवर्ण (Royal Purple & Gold)",
  "नैसर्गिक शाडू व सुवर्ण (Natural Clay & Gold)"
];

async function seed() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');

    const extracted = JSON.parse(fs.readFileSync('./src/data/extracted_pdf_catalog.json', 'utf-8'));

    const idolsList = extracted.map((item, idx) => {
      const page_num = item.pageNumber;
      const idol_id = `GAN-PDF-${page_num < 10 ? '0' + page_num : page_num}`;
      const name_idx = (page_num - 1) % murti_names_mr.length;
      
      const heights = [1.5, 1.8, 2.0, 2.2, 2.5, 3.0, 3.5, 4.0];
      const price_base = 1500 + (page_num % 15) * 400;

      return {
        id: idol_id,
        nameMr: `${murti_names_mr[name_idx]} (माॅडेल #${page_num})`,
        nameEn: `${murti_names_en[name_idx]} (Model #${page_num})`,
        origin: origins[page_num % origins.length],
        heightFeet: heights[page_num % heights.length],
        material: materials[page_num % materials.length],
        category: categories[page_num % categories.length],
        price: price_base,
        originalPrice: price_base + 600,
        image: `/idols/murti_page_${page_num}.jpg`,
        descriptionMr: `PDF कॅटलॉग मधील प्रत्यक्ष फोटो - पान क्र. ${page_num}. पेन व नगर येथील कारागिरांची उत्तम सुबक रचना.`,
        descriptionEn: `Actual photo from official PDF Catalog page ${page_num}. Handcrafted Pen/Nagar idol.`,
        isAvailable: true,
        isFeatured: page_num % 5 === 0,
        bookedCount: (page_num * 3) % 25,
        stallNo: `स्टॉल नं. ${String.fromCharCode(65 + (page_num % 8))}-${(page_num % 10) + 1}`,
        colorScheme: colors[page_num % colors.length]
      };
    });

    // Delete old demo items from MongoDB Atlas
    await Idol.deleteMany({});
    console.log('Deleted old demo items!');

    // Insert all 73 catalog murtis
    const inserted = await Idol.insertMany(idolsList);
    console.log(`✅ Successfully inserted ${inserted.length} real PDF catalog murtis into MongoDB Atlas!`);

    process.exit(0);
  } catch (err) {
    console.error('Error seeding MongoDB:', err);
    process.exit(1);
  }
}

seed();
