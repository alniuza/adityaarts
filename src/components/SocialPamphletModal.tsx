import React from 'react';
import { X, Printer, Share2, Download, Phone, MapPin, Sparkles, QrCode } from 'lucide-react';
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

  const targetWebsiteUrl = "https://adityaarts-9s44k3q9n-an-ced4.vercel.app";

  const whatsappMessage = encodeURIComponent(
    `🚩 *आदित्य गणराज आर्ट्स - गणपती बुकिंग सुरु!* 🚩\n\n` +
    `पेन व नगर येथील अतिशय सुबक व आकर्षक गणेश मूर्ती बुकिंगसाठी आजच भेट द्या:\n` +
    `📍 *पत्ता:* पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक.\n` +
    `📞 *संपर्क:* अतुल गायकवाड (9284169779 / 7720879798)\n\n` +
    `ऑनलाईन मूर्ती पाहण्यासाठी व बुकिंग करण्यासाठी खालील लिंकवर क्लिक करा:\n` +
    `${targetWebsiteUrl}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="bg-amber-950 border border-amber-500/50 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-3 px-4 border-b border-amber-600/30 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isMr ? 'सोशल मीडिया पॅम्पलेट / डिजिटल पोस्टर' : 'Social Media Promotional Flyer'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable / Shareable Poster Container */}
        <div className="p-4 overflow-y-auto space-y-4 text-amber-100 print:text-black print:p-4 print:overflow-visible">
          
          {/* Main Visual Poster Image with Real QR Code */}
          <div className="relative rounded-xl overflow-hidden border-2 border-amber-500/80 shadow-2xl group print:border-none">
            <img
              src="/aditya_ganraj_arts_flyer.jpg"
              alt="आदित्य गणराज आर्ट्स - सोशल मीडिया पॅम्पलेट"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Dedicated Scannable QR Code Box */}
          <div className="bg-amber-900/60 p-3.5 rounded-xl border border-amber-500/40 flex items-center justify-between gap-3 text-xs print:bg-gray-100">
            <div className="space-y-1">
              <span className="text-yellow-300 font-extrabold flex items-center gap-1 text-xs">
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'ऑनलाईन बुकिंग QR कोड (१००% स्कॅन चालू):' : 'Scannable Website Booking QR Code:'}</span>
              </span>
              <p className="text-[11px] text-amber-200/90 leading-tight">
                {isMr ? 'कॅमेऱ्याने स्कॅन करून ऑनलाईन ७३ मूर्ती पहा व बुक करा:' : 'Scan with mobile camera to view 73 idols & book:'}
              </p>
              <a
                href={targetWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-yellow-300 hover:underline font-mono block font-bold truncate"
              >
                {targetWebsiteUrl}
              </a>
            </div>

            <div className="bg-white p-1.5 rounded-lg border-2 border-amber-400 shrink-0 text-center shadow-md">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=1&data=${encodeURIComponent(targetWebsiteUrl)}`}
                alt="100% Scannable Website QR Code"
                className="w-20 h-20 object-contain"
              />
              <span className="text-[8px] text-gray-900 font-extrabold block mt-0.5">SCAN TO BOOK</span>
            </div>
          </div>

          {/* Quick Caption Box */}
          <div className="bg-amber-900/30 p-3 rounded-xl border border-amber-700/40 text-xs space-y-1 print:hidden">
            <span className="text-[10px] text-amber-400 font-bold uppercase">{isMr ? 'सोशल मीडिया कॅप्शन (WhatsApp/Instagram Text):' : 'Social Media Caption:'}</span>
            <p className="text-amber-200/90 leading-relaxed font-mono text-[11px]">
              🚩 आदित्य गणराज आर्ट्स - पेन व नगर येथील सुबक गणेश मूर्ती ऑनलाईन बुकिंग सुरु! 📞 अतुल गायकवाड: 9284169779 / 7720879798 📍 नाशिक त्र्यंबक रोड {targetWebsiteUrl}
            </p>
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
            <span>{isMr ? 'व्हाट्सॲप वर शेअर करा' : 'Share Flyer'}</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/aditya_ganraj_arts_flyer.jpg"
              download="Aditya_Ganraj_Arts_Social_Flyer.jpg"
              className="flex items-center gap-1.5 bg-amber-900 hover:bg-amber-800 text-amber-200 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-amber-600/40 transition shadow"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'डाउनलोड पॅम्पलेट' : 'Download Poster'}</span>
            </a>

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
