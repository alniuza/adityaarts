import React from 'react';
import { BookingRecord, Language } from '../types';
import { X, Printer, Share2, CheckCircle2, MapPin, MessageCircle, Sparkles } from 'lucide-react';

interface BookingReceiptModalProps {
  booking: BookingRecord | null;
  language: Language;
  onClose: () => void;
}

export const BookingReceiptModal: React.FC<BookingReceiptModalProps> = ({
  booking,
  language,
  onClose
}) => {
  if (!booking) return null;
  const isMr = language === 'mr';

  const handlePrint = () => {
    window.print();
  };

  // WhatsApp Alert Message sent directly to Admin (Atul Dada: 9284169779)
  const adminWhatsAppMsg = encodeURIComponent(
    `🚩 *नवीन गणेश मूर्ती ऑनलाईन बुकिंग!* 🚩\n\n` +
    `👤 *ग्राहक नाव:* ${booking.customerName}\n` +
    `📱 *मोबाईल नंबर:* ${booking.phone}\n` +
    `📍 *पत्ता:* ${booking.address}\n` +
    `🗓️ *पिकअप तारीख:* ${booking.pickupDate}\n` +
    `🕉️ *मूर्ती नाव:* ${booking.idolNameMr}\n` +
    `🆔 *माॅडेल/ID:* ${booking.idolId}\n` +
    `💰 *जमा ऑनलाईन टोकन:* ₹${booking.tokenAmount}\n` +
    `💳 *पेमेंट पद्धत:* ${booking.paymentMode}\n` +
    `🧾 *पावती क्र.:* ${booking.bookingId}\n\n` +
    `आदित्य गणराज आर्ट्स स्टॉल नाशिक`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      <div className="bg-amber-950 border border-amber-500/50 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-3.5 px-5 border-b border-amber-600/30 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>{isMr ? 'बुकिंग कन्फर्म झाले! (Booking Confirmed)' : 'Booking Confirmed Successfully!'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Slip Card */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-amber-100 print:text-black print:p-8 print:overflow-visible">
          
          {/* Admin Alert Notification Pill */}
          <div className="bg-emerald-950/80 border border-emerald-500/60 p-3 rounded-xl flex items-center justify-between gap-3 text-xs print:hidden">
            <div className="flex items-center gap-2 text-emerald-300 font-medium">
              <Sparkles className="w-4 h-4 text-yellow-300 shrink-0" />
              <span>{isMr ? 'स्टॉल मालक अतुल दादांना व्हाट्सॲप वर मेसेज पाठवा:' : 'Notify Stall Owner Atul Dada via WhatsApp:'}</span>
            </div>

            <a
              href={`https://wa.me/919284169779?text=${adminWhatsAppMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1 shrink-0 shadow transition"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>{isMr ? 'माहिती पाठवा' : 'Send WhatsApp Alert'}</span>
            </a>
          </div>

          {/* Receipt Header */}
          <div className="text-center border-b border-dashed border-amber-600/50 print:border-gray-400 pb-4 space-y-1">
            <p className="text-xs text-yellow-300 print:text-amber-800 font-bold tracking-widest uppercase">
              || श्री गणेशाय नमः ||
            </p>
            <h2 className="text-2xl font-black text-gold-gradient print:text-red-800">
              आदित्य गणराज आर्ट्स
            </h2>
            <p className="text-xs text-amber-200 print:text-gray-700 font-medium">
              पेन व नगर येथील सुबक गणेश मूर्ती स्टॉल • नाशिक
            </p>
            <p className="text-[11px] text-amber-400 print:text-gray-600 font-mono">
              अतुल गायकवाड: 9284169779 / 7720879798
            </p>
          </div>

          {/* Booking ID & Date Banner */}
          <div className="bg-amber-900/40 print:bg-gray-100 rounded-xl p-3 flex items-center justify-between border border-amber-600/30 print:border-gray-300 text-xs">
            <div>
              <span className="text-[10px] text-amber-300 print:text-gray-600 block">{isMr ? 'पावती क्र. (Booking ID):' : 'Booking ID:'}</span>
              <span className="text-base font-extrabold text-yellow-300 print:text-red-700 font-mono">
                {booking.bookingId}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-amber-300 print:text-gray-600 block">{isMr ? 'बुकिंग तारीख:' : 'Date:'}</span>
              <span className="font-bold text-amber-100 print:text-gray-800">{booking.bookingDate}</span>
            </div>
          </div>

          {/* Customer & Idol Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* Customer Box */}
            <div className="bg-amber-900/20 print:bg-gray-50 p-3 rounded-lg border border-amber-700/30 print:border-gray-200 space-y-1">
              <span className="text-[10px] text-amber-400 print:text-amber-800 font-bold block uppercase">{isMr ? 'ग्राहक माहिती' : 'Customer Info'}</span>
              <p className="font-bold text-sm text-amber-100 print:text-gray-900">{booking.customerName}</p>
              <p className="text-amber-200 print:text-gray-700 font-mono">📱 {booking.phone}</p>
              <p className="text-amber-300/80 print:text-gray-600 text-[11px]">📍 {booking.address}</p>
            </div>

            {/* Idol Box */}
            <div className="bg-amber-900/20 print:bg-gray-50 p-3 rounded-lg border border-amber-700/30 print:border-gray-200 space-y-1">
              <span className="text-[10px] text-amber-400 print:text-amber-800 font-bold block uppercase">{isMr ? 'गणेश मूर्ती तपशील' : 'Idol Details'}</span>
              <p className="font-bold text-sm text-amber-100 print:text-gray-900">{isMr ? booking.idolNameMr : booking.idolNameEn}</p>
              <p className="text-amber-200 print:text-gray-700 font-mono">ID: {booking.idolId}</p>
              <p className="text-emerald-400 print:text-green-700 font-bold">
                📅 {isMr ? 'पिकअप तारीख: ' : 'Pickup Date: '}{booking.pickupDate}
              </p>
            </div>

          </div>

          {/* Token Breakdown Table */}
          <div className="bg-amber-950 print:bg-white rounded-xl border border-amber-600/40 print:border-gray-300 p-3.5 text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-amber-800/40 print:border-gray-200">
              <span className="text-emerald-400 print:text-green-700 font-bold">{isMr ? 'जमा ऑनलाईन टोकन (Advance Token Paid):' : 'Advance Token Paid:'}</span>
              <span className="font-bold text-emerald-400 print:text-green-700 text-base">₹{booking.tokenAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1 pt-1 text-amber-300 text-[11px]">
              <span>{isMr ? 'पेमेंट पद्धत & UTR No.:' : 'Payment Mode & UTR:'}</span>
              <span className="font-bold text-yellow-300 font-mono">{booking.paymentMode} {booking.utrNumber ? `(UTR: ${booking.utrNumber})` : ''}</span>
            </div>

            <div className="flex justify-between py-1 border-t border-amber-800/40 text-[11px]">
              <span>{isMr ? 'पडताळणी स्थिती (Status):' : 'Status:'}</span>
              <span className={`font-bold ${
                booking.status === 'Pending Verification'
                  ? 'text-yellow-400 animate-pulse'
                  : 'text-emerald-400'
              }`}>
                {booking.status === 'Pending Verification'
                  ? (isMr ? '🟡 पेमेंट पडताळणी प्रलंबित' : '🟡 Pending Verification')
                  : (isMr ? '🟢 बुकिंग कन्फर्म झाले' : '🟢 Confirmed')}
              </span>
            </div>
          </div>

          {/* Stall Address & QR Code Footer */}
          <div className="flex items-center justify-between bg-amber-900/30 print:bg-gray-100 p-3 rounded-xl border border-amber-700/30 print:border-gray-300 text-[11px]">
            <div className="space-y-1 max-w-[70%]">
              <p className="font-bold text-amber-200 print:text-gray-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{isMr ? 'स्टॉल पत्ता (Stall Address):' : 'Stall Address:'}</span>
              </p>
              <p className="text-amber-300/80 print:text-gray-600 leading-tight">
                आदित्य गणराज आर्ट्स स्टॉल, पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक - 422002.
              </p>
            </div>

            <div className="bg-white p-1 rounded-lg border border-amber-500/40 shrink-0 text-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${booking.bookingId}`}
                alt="QR Code"
                className="w-14 h-14 object-contain"
              />
              <span className="text-[8px] text-gray-800 font-bold block mt-0.5">VERIFIED</span>
            </div>
          </div>

        </div>

        {/* Action Buttons (Hidden on print) */}
        <div className="p-3 bg-amber-950 border-t border-amber-600/30 flex items-center justify-between gap-2 print:hidden">
          <a
            href={`https://wa.me/919284169779?text=${adminWhatsAppMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>{isMr ? 'अतुल दादांना अलर्ट पाठवा' : 'WhatsApp Owner'}</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-amber-900 hover:bg-amber-800 text-amber-200 text-xs font-bold px-3 py-2.5 rounded-xl border border-amber-600/40 transition shadow"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>{isMr ? 'पावती प्रिंट' : 'Print'}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-black px-4 py-2.5 rounded-xl shadow transition"
            >
              {isMr ? 'होय' : 'Done'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
