import React from 'react';
import { Palette, Shield, Sparkles, Box, HeartHandshake, Home } from 'lucide-react';
import { Language } from '../types';

interface FeaturesProps {
  language: Language;
}

export const Features: React.FC<FeaturesProps> = ({ language }) => {
  const isMr = language === 'mr';

  const featureList = [
    {
      icon: Sparkles,
      titleMr: 'विविध प्रकारच्या गणेश मूर्ती',
      titleEn: 'Wide Variety of Ganesh Idols',
      descMr: 'पेन आणि नगर येथील सर्व प्रसिद्ध रूपे: लालबागचा राजा, दगडूशेठ, चिंतामणी, बाल गणपती व इको-फ्रेंडली शाडू मूर्ती.',
      descEn: 'All famous designs from Pen & Ahmednagar: Lalbaugcha Raja, Dagdusheth, Chintamani, Bal Ganesha & Shadu idols.',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      icon: Shield,
      titleMr: 'उत्तम दर्जा आणि टिकाऊपणा',
      titleEn: 'Top Quality & Durability',
      descMr: 'उच्च दर्जाची माती आणि टिकाऊ कोटिंग. दीर्घकाळ रंग ताजे व आकर्षक राहतात.',
      descEn: 'High grade clay and durable coating ensuring long-lasting radiant colors.',
      color: 'from-red-600 to-amber-700'
    },
    {
      icon: Palette,
      titleMr: 'सुंदर रंगसंगती आणि आकर्षक डिझाईन',
      titleEn: 'Vibrant Colors & Eye-Catching Design',
      descMr: 'कुशल कारागिरांच्या हाताने रेखाटलेले सुबक नक्षीकाम व मनमोहक रंगसंगती.',
      descEn: 'Hand-painted intricate jewelry patterns and serene expressions by traditional artists.',
      color: 'from-amber-600 to-red-600'
    },
    {
      icon: Box,
      titleMr: 'सुरक्षित पॅकिंगची सुविधा',
      titleEn: 'Safe & Secure Packaging Facility',
      descMr: 'मूर्ती सुखरूप घरी नेण्यासाठी विशेष लाकडी/थर्मोकोल बॉक्स व कापडी सुरक्षित पॅकिंग.',
      descEn: 'Special protective thermocol/wooden box & cloth wrapping for safe transport.',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      icon: HeartHandshake,
      titleMr: 'योग्य दरात उत्तम सेवा',
      titleEn: 'Honest Rates & Dedicated Service',
      descMr: 'कोणतीही अतिरिक्त दडपण फी नाही. योग्य भावात थेट कारागीर दराने बुकिंग.',
      descEn: 'Transparent pricing directly from artisans with polite customer service.',
      color: 'from-red-700 to-amber-800'
    },
    {
      icon: Home,
      titleMr: 'घर, ऑफिस, दुकान साठी विशेष मूर्ती',
      titleEn: 'Special Idols for Home, Office & Shop',
      descMr: '1 फुटापासून ते 5+ फुटांपर्यंत प्रत्येक स्थानासाठी योग्य आकाराच्या सुबक गणेश मूर्ती.',
      descEn: 'Custom sizes ranging from 1 ft to 5+ ft suitable for homes, offices, and business setups.',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-amber-950/90 relative border-b border-amber-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase bg-amber-900/60 px-4 py-1 rounded-full border border-amber-600/30">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isMr ? 'आमची वैशिष्ट्ये (Our Features)' : 'OUR KEY HIGHLIGHTS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-gradient">
            {isMr ? 'आदित्य गणराज आर्ट्स का निवडावे?' : 'Why Choose Aditya Ganraj Arts?'}
          </h2>
          <p className="text-amber-200/80 text-sm sm:text-base">
            {isMr 
              ? 'आम्ही देतो तुमच्या लाडक्या बाप्पासाठी सर्वोत्तम गुणवत्तेच्या गणेश मूर्ती व विश्वसनीय सेवा.'
              : 'We provide premium quality Ganesh idols and trusted booking services for your home.'}
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-b from-amber-900/40 to-amber-950/80 rounded-2xl p-6 border border-amber-600/30 shadow-xl hover:border-amber-500/60 transition duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-lg shrink-0 flex items-center justify-center`}>
                    <div className="w-full h-full rounded-[10px] bg-amber-950 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-amber-400 group-hover:scale-110 transition duration-300" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] text-amber-400/70 font-mono font-bold">0{idx + 1}.</span>
                    <h3 className="text-lg font-bold text-amber-100 group-hover:text-yellow-300 transition">
                      {isMr ? item.titleMr : item.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-200/75 leading-relaxed">
                      {isMr ? item.descMr : item.descEn}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
