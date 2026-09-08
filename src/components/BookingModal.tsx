import React, { useState } from 'react';
import { GanpatiIdol, Language, BookingRecord } from '../types';
import { X, QrCode, CheckCircle2, User, Phone, MapPin, Calendar, CreditCard, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  idol: GanpatiIdol | null;
  language: Language;
  onClose: () => void;
  onBookingSuccess: (record: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  idol,
  language,
  onClose,
  onBookingSuccess
}) => {
  if (!idol) return null;
  const isMr = language === 'mr';

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 5);
    return defaultDate.toISOString().split('T')[0];
  });
  const [tokenAmount, setTokenAmount] = useState<number>(500);
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Cash at Stall'>('UPI');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(isMr ? 'कृपया सर्व माहिती योग्य भरा (नाव, फोन, पत्ता)' : 'Please fill all required fields.');
      return;
    }

    if (phone.length < 10) {
      setErrorMsg(isMr ? 'कृपया १० अंकी वैध फोन नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: BookingRecord = {
      bookingId: `AGA-2026-${randomSuffix}`,
      idolId: idol.id,
      idolNameMr: idol.nameMr,
      idolNameEn: idol.nameEn,
      idolImage: idol.image,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      pickupDate,
      tokenAmount,
      totalPrice: idol.price,
      balanceAmount: Math.max(0, idol.price - tokenAmount),
      paymentMode,
      paymentStatus: 'Advance Paid',
      bookingDate: new Date().toLocaleDateString('mr-IN'),
      status: 'Confirmed'
    };

    // Save to MongoDB Cloud Database API
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (response.ok) {
        const savedDB = await response.json();
        console.log('Saved to MongoDB Cloud:', savedDB);
      }
    } catch (err) {
      console.log('MongoDB API offline, saving to LocalStorage fallback.');
    }

    // Save to LocalStorage fallback as well
    const existingStr = localStorage.getItem('aditya_ganraj_bookings');
    const existing: BookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem('aditya_ganraj_bookings', JSON.stringify([newBooking, ...existing]));

    setIsSubmitting(false);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-amber-950 border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-4 border-b border-amber-600/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="text-lg font-bold text-amber-100">
              {isMr ? 'गणेश मूर्ती ऑनलाईन बुकिंग' : 'Ganesh Idol Online Booking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Idol Summary Banner */}
        <div className="bg-amber-900/40 p-3 px-4 border-b border-amber-700/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={idol.image}
              alt={idol.nameMr}
              className="w-12 h-12 rounded-lg object-cover border border-amber-500/40"
            />
            <div>
              <p className="text-xs text-amber-300 font-mono">{idol.id} • {idol.stallNo}</p>
              <h4 className="text-sm font-bold text-amber-100">{isMr ? idol.nameMr : idol.nameEn}</h4>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-amber-300">{isMr ? 'किंमत:' : 'Price:'}</span>
            <p className="text-base font-black text-yellow-400">₹{idol.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleConfirmBooking} className="p-5 overflow-y-auto space-y-4 flex-1 text-amber-100">
          
          {errorMsg && (
            <div className="bg-red-950/80 border border-red-500/60 text-red-200 text-xs p-2.5 rounded-lg text-center font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'ग्राहक पूर्ण नाव (Full Name):' : 'Full Name:'}</span>
            </label>
            <input
              type="text"
              required
              placeholder={isMr ? 'उदा. राहुल पवार' : 'e.g. Rahul Pawar'}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-amber-900/40 border border-amber-600/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Mobile Phone */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'मोबाईल नंबर (WhatsApp Number):' : 'Mobile Number:'}</span>
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="98XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-amber-900/40 border border-amber-600/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'पत्ता / परिसर (Delivery / Pickup Address):' : 'Address:'}</span>
            </label>
            <input
              type="text"
              required
              placeholder={isMr ? 'उदा. पंचवटी, नाशिक' : 'e.g. Panchavati, Nashik'}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-amber-900/40 border border-amber-600/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'मूर्ती घेऊन जाण्याची तारीख (Pickup Date):' : 'Pickup Date:'}</span>
            </label>
            <input
              type="date"
              required
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full bg-amber-900/40 border border-amber-600/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Advance Token Selection */}
          <div className="bg-amber-900/30 p-3 rounded-xl border border-amber-700/40 space-y-2">
            <label className="block text-xs font-bold text-amber-200 flex items-center justify-between">
              <span>{isMr ? 'ॲडव्हान्स टोकन रक्कम (Token Amount):' : 'Advance Token:'}</span>
              <span className="text-yellow-400 font-extrabold font-mono text-sm">₹{tokenAmount}</span>
            </label>

            <div className="flex gap-2">
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTokenAmount(amt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                    tokenAmount === amt
                      ? 'bg-amber-500 text-amber-950 border-amber-300'
                      : 'bg-amber-950/60 text-amber-200 border-amber-700/40 hover:bg-amber-900'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="flex justify-between text-[11px] text-amber-300/80 pt-1">
              <span>{isMr ? 'शिल्लक रक्कम (बाकी):' : 'Remaining Balance:'}</span>
              <span className="font-bold text-amber-100">
                ₹{Math.max(0, idol.price - tokenAmount).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-amber-200 mb-1 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'पेमेंट पद्धत (Payment Method):' : 'Payment Mode:'}</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMode('UPI')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  paymentMode === 'UPI'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-950 border-amber-300'
                    : 'bg-amber-900/40 text-amber-200 border-amber-700/40'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>{isMr ? 'UPI / Google Pay / QR' : 'UPI QR Code'}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('Cash at Stall')}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  paymentMode === 'Cash at Stall'
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-amber-950 border-amber-300'
                    : 'bg-amber-900/40 text-amber-200 border-amber-700/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isMr ? 'स्टॉलवर रोख (Cash)' : 'Cash at Stall'}</span>
              </button>
            </div>
          </div>

          {/* Simulated UPI QR Display */}
          {paymentMode === 'UPI' && (
            <div className="bg-amber-900/50 p-4 rounded-xl border border-amber-500/40 text-center space-y-2">
              <p className="text-xs text-amber-200 font-bold">
                {isMr ? `Google Pay / PhonePe / Paytm ने खालील QR वर ₹${tokenAmount} स्कॅन करा:` : `Scan & Pay ₹${tokenAmount} via UPI:`}
              </p>
              
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl shadow-md flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=9284169779@upi&pn=AdityaGanrajArts&am=${tokenAmount}&cu=INR`}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-[10px] text-amber-300/80 font-mono">
                UPI ID: 9284169779@upi (Atul Gaikwad)
              </p>
            </div>
          )}

          {/* Form Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-black py-3 rounded-xl shadow-xl transition transform active:scale-98 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-amber-950" />
              <span>
                {isSubmitting
                  ? (isMr ? 'बुकिंग सेव्ह होत आहे...' : 'Saving to MongoDB Database...')
                  : (isMr ? 'बुकिंग पूर्ण करा व पावती मिळवा' : 'Confirm Booking & Get Receipt')}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
