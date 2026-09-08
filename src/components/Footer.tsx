import React from 'react';
import { Sparkles, Phone, MapPin, Heart } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isMr = language === 'mr';

  return (
    <footer className="bg-amber-950 text-amber-200 border-t border-amber-600/30 py-10 relative overflow-hidden">
      
      {/* Devotional Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 text-yellow-300 font-extrabold text-sm sm:text-base bg-gradient-to-r from-red-950 via-amber-900 to-red-950 px-6 py-2 rounded-full border border-amber-500/40 shadow-lg">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>|| गणपती बाप्पा मोरया, मंगलमूर्ती मोरया ||</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs text-amber-300/80 border-b border-amber-800/40 pb-8">
          
          <div className="space-y-2">
            <h4 className="text-lg font-bold text-gold-gradient">آदित्य गणराज आर्ट्स</h4>
            <p className="text-amber-200/90 leading-relaxed">
              {isMr 
                ? 'पेन व नगर येथील आकर्षक व सुबक गणेश मूर्तींचे नाशिकमधील अधिकृत स्टॉल. ऑनलाईन बुकिंग सुलभ सेवा.'
                : 'Official Ganesh Idol Stall in Nashik featuring Pen & Ahmednagar idols.'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-100 flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'स्टॉल पत्ता (Nashik Stall)' : 'Stall Location'}</span>
            </h4>
            <p className="leading-relaxed">
              पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक - 422002.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-100 flex items-center justify-center gap-1">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'संपर्क (Contact Us)' : 'Contact Person'}</span>
            </h4>
            <p className="font-extrabold text-yellow-300 text-sm">अतुल गायकवाड</p>
            <div className="flex justify-center gap-3 font-mono text-amber-100">
              <a href="tel:9284169779" className="hover:text-yellow-300">9284169779</a>
              <span>/</span>
              <a href="tel:7720879798" className="hover:text-yellow-300">7720879798</a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-amber-400/70 pt-2">
          <p>© {new Date().getFullYear()} आदित्य गणराज आर्ट्स (Aditya Ganraj Arts). All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            <span>{isMr ? 'गणपती बाप्पाच्या कृपेने साकारलेले' : 'Built with devotion for Ganeshotsav'}</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
          </p>
        </div>

      </div>

    </footer>
  );
};
