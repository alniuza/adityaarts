import React from 'react';
import { X, Printer, Share2, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface SocialPamphletModalProps {
  language: Language;
  onClose: () => void;
}

export const SocialPamphletModal: React.FC<SocialPamphletModalProps> = ({
  language,
  onClose
}) => {
  const isMr = language === 'mr';

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `🚩 *आदित्य गणराज आर्ट्स - गणपती बुकिंग सुरु!* 🚩\n\nपेन व नगर येथील अतिशय सुबक व आकर्षक गणेश मूर्ती बुकिंगसाठी आजच भेट द्या:\n📍 पत्ता: पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक.\n📞 संपर्क: अतुल गायकवाड (9284169779 / 7720879798)\n\nऑनलाईन मूर्ती पाहण्यासाठी आणि बुक करण्यासाठी लिंकवर क्लिक करा:`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="bg-amber-950 border border-amber-500/50 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-3 px-4 border-b border-amber-600/30 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isMr ? 'सोशल मीडिया पॅम्पलेट / डिजिटल पोस्टर' : 'Social Media Flyer / Poster'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable / Shareable Poster Container */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-amber-100 print:text-black print:p-6 print:overflow-visible bg-gradient-to-b from-amber-950 via-red-950 to-amber-950 print:bg-white">
          
          {/* Main Poster Inner Box */}
          <div className="border-4 border-amber-500/80 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-amber-950 to-amber-900/90 shadow-2xl relative overflow-hidden print:border-red-800 print:bg-white">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-red-800 via-amber-600 to-red-800 text-white rounded-lg p-2 text-center shadow-md mb-3 flex items-center justify-between px-3">
              <span className="text-[11px] sm:text-xs font-black text-yellow-200 uppercase tracking-widest">
                || गणपती बाप्पा मोरया ||
              </span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-yellow-300">
                <Phone className="w-3.5 h-3.5" />
                <span>9284169779 / 7720879798</span>
              </div>
            </div>

            {/* Shop Title */}
            <div className="text-center space-y-1 mb-4">
              <span className="bg-red-900/90 text-amber-200 text-[10px] sm:text-xs font-black px-3 py-0.5 rounded-full border border-red-500/50 uppercase tracking-wider">
                🚩 {isMr ? 'बुकिंग सुरु' : 'BOOKING OPEN'} 🚩
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-gold-gradient tracking-tight leading-none pt-1">
                आदित्य गणराज आर्ट्स
              </h2>
              <p className="text-xs sm:text-sm font-bold text-amber-200 print:text-gray-800">
                अतुल गायकवाड (स्टॉल मालक)
              </p>
            </div>

            {/* Slogan Banner */}
            <div className="bg-amber-900/80 print:bg-gray-100 rounded-lg p-2.5 text-center border border-amber-500/40 print:border-gray-300 mb-4">
              <p className="text-xs sm:text-sm font-extrabold text-yellow-300 print:text-red-800 leading-snug">
                आमच्याकडे पेन व नगर येथील सुबक व आकर्षक गणेश मूर्ती योग्य दरात मिळतील.
              </p>
            </div>

            {/* Features 6 Grid */}
            <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs mb-4">
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>विविध प्रकारच्या गणेश मूर्ती</span>
              </div>
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>उत्तम दर्जा आणि टिकाऊपणा</span>
              </div>
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>सुंदर रंगसंगती व डिझाईन</span>
              </div>
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>सुरक्षित पॅकिंगची सुविधा</span>
              </div>
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>योग्य दरात उत्तम सेवा</span>
              </div>
              <div className="bg-amber-950/80 print:bg-gray-50 p-2 rounded-lg border border-amber-600/30 print:border-gray-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>घर, ऑफिस, दुकान मूर्ती</span>
              </div>
            </div>

            {/* Address & QR Code Box */}
            <div className="bg-amber-950 print:bg-gray-100 rounded-xl p-3 border border-amber-500/40 print:border-gray-300 flex items-center justify-between gap-3">
              <div className="space-y-1 text-[10px] sm:text-xs">
                <p className="font-bold text-amber-200 print:text-gray-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>स्टॉल पत्ता:</span>
                </p>
                <p className="text-amber-100 print:text-gray-800 leading-tight font-medium">
                  आदित्य गणराज आर्ट्स स्टॉल, पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक, महाराष्ट्र - 422002.
                </p>
              </div>

              {/* Dynamic Website Booking QR Code */}
              <div className="bg-white p-1 rounded-lg border border-amber-400 shrink-0 text-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=https://adityaarts-9s44k3q9n-an-ced4.vercel.app"
                  alt="Website QR Code"
                  className="w-16 h-16 object-contain"
                />
                <span className="text-[7px] text-gray-900 font-bold block">SCAN TO BOOK</span>
              </div>
            </div>

          </div>

        </div>

        {/* Action Buttons (Hidden on print) */}
        <div className="p-3 bg-amber-950 border-t border-amber-600/30 flex items-center justify-between gap-2 print:hidden">
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow"
          >
            <Share2 className="w-4 h-4" />
            <span>{isMr ? 'व्हाट्सॲप वर शेअर करा' : 'Share Poster'}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-900 hover:bg-amber-800 text-amber-200 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-amber-600/40 transition shadow"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'पॅम्पलेट सेव्ह करा' : 'Download Flyer'}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-black px-4 py-2.5 rounded-xl shadow transition"
            >
              {isMr ? 'बंद करा' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
