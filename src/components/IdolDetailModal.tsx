import React from 'react';
import { GanpatiIdol, Language } from '../types';
import { X, CheckCircle2, ShieldCheck, Box, Phone, Sparkles } from 'lucide-react';

interface IdolDetailModalProps {
  idol: GanpatiIdol | null;
  language: Language;
  onClose: () => void;
  onBook: (idol: GanpatiIdol) => void;
}

export const IdolDetailModal: React.FC<IdolDetailModalProps> = ({
  idol,
  language,
  onClose,
  onBook
}) => {
  if (!idol) return null;
  const isMr = language === 'mr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-amber-950 border border-amber-500/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-4 border-b border-amber-600/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-amber-950 text-xs font-mono font-extrabold px-2.5 py-0.5 rounded">
              {idol.id}
            </span>
            <span className="text-amber-200 text-sm font-bold">
              {idol.origin === 'Pen' ? (isMr ? 'पेन ओरिजिनल मूर्ती' : 'Pen Original Idol') : (isMr ? 'नगर विशेष' : 'Ahmednagar Special')}
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-amber-100">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Image Preview */}
            <div className="relative rounded-xl overflow-hidden border border-amber-600/40 aspect-square bg-amber-950 shadow-inner">
              <img
                src={idol.image}
                alt={isMr ? idol.nameMr : idol.nameEn}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-amber-950/90 text-yellow-300 text-xs px-2.5 py-1 rounded font-bold border border-amber-500/40">
                {idol.stallNo}
              </div>
            </div>

            {/* Main Specs */}
            <div className="space-y-4 flex flex-col justify-between">
              
              <div>
                <h3 className="text-2xl font-extrabold text-gold-gradient leading-tight">
                  {isMr ? idol.nameMr : idol.nameEn}
                </h3>
                
                <p className="text-xs text-amber-300/80 mt-2 leading-relaxed">
                  {isMr ? idol.descriptionMr : idol.descriptionEn}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="bg-amber-900/40 rounded-xl p-3.5 border border-amber-700/40 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-amber-700/30">
                  <span className="text-amber-300/70">{isMr ? 'उंची (Height):' : 'Height:'}</span>
                  <span className="font-bold text-amber-100">{idol.heightFeet} {isMr ? 'फूट' : 'Feet'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-amber-700/30">
                  <span className="text-amber-300/70">{isMr ? 'मटेरियल (Material):' : 'Material:'}</span>
                  <span className="font-bold text-amber-100">{idol.material}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-amber-700/30">
                  <span className="text-amber-300/70">{isMr ? 'रंगसंगती (Colors):' : 'Color Scheme:'}</span>
                  <span className="font-bold text-amber-100">{idol.colorScheme}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-amber-300/70">{isMr ? 'पॅकिंग facility:' : 'Packaging:'}</span>
                  <span className="font-bold text-emerald-400">{isMr ? 'सुरक्षित बॉक्स समाविष्ट' : 'Safe Box Included'}</span>
                </div>
              </div>

              {/* Booking Token Info without price */}
              <div className="bg-gradient-to-r from-amber-900/60 to-red-950/60 rounded-xl p-3.5 border border-amber-500/40 text-center">
                <p className="text-xs text-yellow-300 font-bold">
                  {isMr ? 'ॲडव्हान्स टोकन ऑनलाईन भरून मूर्ती बुक करा' : 'Reserve your murti online with advance token'}
                </p>
                <p className="text-[11px] text-amber-200/90 mt-1">
                  {isMr ? 'अतुल गायकवाड: 9284169779 / 7720879798' : 'Call Atul Gaikwad: 9284169779'}
                </p>
              </div>

            </div>

          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-2 text-center text-[11px] pt-2">
            <div className="bg-amber-900/30 p-2 rounded border border-amber-700/30 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? '१००% ओरिजिनल' : '100% Original'}</span>
            </div>
            <div className="bg-amber-900/30 p-2 rounded border border-amber-700/30 flex items-center justify-center gap-1">
              <Box className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'सुरक्षित पॅकिंग' : 'Safe Transport'}</span>
            </div>
            <div className="bg-amber-900/30 p-2 rounded border border-amber-700/30 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'पावती व QR कोड' : 'Official Receipt'}</span>
            </div>
          </div>

        </div>

        {/* Footer Action */}
        <div className="p-4 bg-amber-950 border-t border-amber-600/30 flex items-center justify-between gap-4">
          <a
            href="tel:9284169779"
            className="flex items-center gap-1.5 text-amber-300 hover:text-yellow-300 text-xs font-semibold"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>{isMr ? 'अतुल गायकवाड: 9284169779' : 'Call 9284169779'}</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onBook(idol);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-black px-6 py-2.5 rounded-xl shadow-lg transition"
          >
            <Sparkles className="w-4 h-4 fill-amber-950" />
            <span>{isMr ? 'ही मूर्ती बुक करा' : 'Book This Murti'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
