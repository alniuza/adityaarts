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
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [upiHandle, setUpiHandle] = useState('8793521139@ybl');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Cash at Stall'>('UPI');
  const [utrNumber, setUtrNumber] = useState('');
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

    if (!tokenAmount || tokenAmount <= 0) {
      setErrorMsg(isMr ? 'कृपया आधी ॲडव्हान्स टोकन रक्कम टाका (उदा. ₹500, ₹1000).' : 'Please enter advance token amount.');
      return;
    }

    if (paymentMode === 'UPI' && (!utrNumber.trim() || utrNumber.trim().length < 6)) {
      setErrorMsg(isMr ? 'कृपया तुमच्या पेमेंटचा १२ अंकी UTR / Ref ID नंबर टाका.' : 'Please enter 12-digit UTR / Ref ID number.');
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
      totalPrice: idol.price || 0,
      balanceAmount: 0,
      paymentMode,
      paymentStatus: 'Advance Paid',
      bookingDate: new Date().toLocaleDateString('mr-IN'),
      utrNumber: utrNumber.trim(),
      status: 'Confirmed'
    };

    // Save to MongoDB Cloud Database API
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      if (response.ok) {
        const savedDB = await response.json();
        console.log('Saved to MongoDB Cloud via Vercel:', savedDB);
      }
    } catch (err) {
      console.log('MongoDB API offline, saving to LocalStorage fallback.');
    }

    // Save to LocalStorage fallback as well
    const existingStr = localStorage.getItem('aditya_ganraj_bookings');
    const existing: BookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem('aditya_ganraj_bookings', JSON.stringify([newBooking, ...existing]));

    // Auto trigger WhatsApp alert to stall owner Atul Gaikwad (9284169779)
    const adminWhatsAppMsg = encodeURIComponent(
      `🚩 *नवीन गणेश मूर्ती ऑनलाईन बुकिंग!* 🚩\n\n` +
      `👤 *ग्राहक नाव:* ${newBooking.customerName}\n` +
      `📱 *मोबाईल नंबर:* ${newBooking.phone}\n` +
      `📍 *पत्ता:* ${newBooking.address}\n` +
      `🗓️ *पिकअप तारीख:* ${newBooking.pickupDate}\n` +
      `🕉️ *मूर्ती नाव:* ${newBooking.idolNameMr}\n` +
      `🆔 *माॅडेल/ID:* ${newBooking.idolId}\n` +
      `💰 *जमा ऑनलाईन टोकन:* ₹${newBooking.tokenAmount}\n` +
      `💳 *पेमेंट पद्धत:* ${newBooking.paymentMode}\n` +
      `🧾 *पावती क्र.:* ${newBooking.bookingId}\n\n` +
      `आदित्य गणराज आर्ट्स स्टॉल नाशिक`
    );
    try {
      window.open(`https://wa.me/919284169779?text=${adminWhatsAppMsg}`, '_blank');
    } catch (e) {
      console.log('Popups blocked');
    }

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
            <span className="text-xs text-emerald-400 font-bold">
              {isMr ? 'बुकिंग उघडे' : 'Booking Open'}
            </span>
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

          {/* Advance Token Amount Input */}
          <div className="bg-amber-900/30 p-3.5 rounded-xl border border-amber-700/40 space-y-2">
            <label className="block text-xs font-bold text-amber-200 flex items-center justify-between">
              <span>{isMr ? 'ॲडव्हान्स टोकन रक्कम (Token Amount ₹):' : 'Advance Token Amount ₹:'}</span>
              {tokenAmount > 0 && (
                <span className="text-yellow-400 font-extrabold font-mono text-sm">₹{tokenAmount}</span>
              )}
            </label>

            <input
              type="number"
              min={100}
              step={100}
              value={tokenAmount > 0 ? tokenAmount : ''}
              onChange={(e) => setTokenAmount(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full bg-amber-950 border-2 border-amber-500/80 rounded-xl px-3.5 py-2.5 text-sm text-yellow-300 font-mono font-bold placeholder-amber-400/50 focus:outline-none focus:border-yellow-400 shadow-inner"
              placeholder={isMr ? 'रक्कम टाका (उदा. ₹500, ₹1000, ₹1500)' : 'Enter token amount (e.g. 500, 1000)'}
            />

            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-amber-300 font-medium">{isMr ? 'त्वरित निवड:' : 'Quick Select:'}</span>
              {[500, 1000, 2000, 5000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTokenAmount(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                    tokenAmount === amt
                      ? 'bg-amber-500 text-amber-950 border-amber-300'
                      : 'bg-amber-950/60 text-amber-200 border-amber-700/40 hover:bg-amber-900'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
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
                <span>{isMr ? 'UPI / Google Pay / QR' : 'UPI Dynamic QR Code'}</span>
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

          {/* Dynamic UPI QR Display & Direct Pay Button */}
          {paymentMode === 'UPI' && (
            tokenAmount <= 0 ? (
              <div className="bg-amber-900/40 p-4 rounded-xl border border-dashed border-amber-500/60 text-center space-y-1">
                <p className="text-xs text-yellow-300 font-bold">
                  {isMr ? '👉 आधी वर ॲडव्हान्स टोकन रक्कम टाका, त्यानंतर QR कोड व पेमेंट बटण दिसेल.' : '👉 Please enter token amount above to generate QR code.'}
                </p>
              </div>
            ) : (
              <div className="bg-amber-900/50 p-4 rounded-xl border border-amber-500/40 text-center space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-amber-200 font-bold">
                    {isMr ? `Google Pay / PhonePe / Paytm ने खालील QR वर ₹${tokenAmount} स्कॅन करा:` : `Scan Dynamic QR & Pay ₹${tokenAmount}:`}
                  </p>

                  {/* App Handle Selector */}
                  <div className="flex justify-center gap-1 text-[10px]">
                    {[
                      { label: 'PhonePe / GPay (@ybl)', handle: '8793521139@ybl' },
                      { label: 'Paytm (@paytm)', handle: '8793521139@paytm' },
                      { label: 'GPay Axis (@okbizaxis)', handle: '8793521139@okbizaxis' }
                    ].map((h) => (
                      <button
                        key={h.handle}
                        type="button"
                        onClick={() => setUpiHandle(h.handle)}
                        className={`px-2 py-0.5 rounded border ${
                          upiHandle === h.handle
                            ? 'bg-amber-500 text-amber-950 font-bold border-amber-300'
                            : 'bg-amber-950/60 text-amber-300 border-amber-700/40'
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="w-44 h-44 mx-auto bg-white p-2 rounded-xl shadow-lg border-2 border-amber-400 flex items-center justify-center relative">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=1&data=${encodeURIComponent(`upi://pay?pa=${upiHandle}&pn=AdityaGanrajArts&am=${tokenAmount}&cu=INR&tn=GaneshIdolBooking`)}`}
                    alt={`UPI Dynamic QR ₹${tokenAmount}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1.5">
                  <a
                    href={`upi://pay?pa=${upiHandle}&pn=AdityaGanrajArts&am=${tokenAmount}&cu=INR&tn=GaneshIdolBooking`}
                    className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl shadow transition"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>{isMr ? `📱 मोबाईल ॲपवरून थेट ₹${tokenAmount} भरा (GPay / PhonePe)` : `Pay ₹${tokenAmount} Directly via App`}</span>
                  </a>

                  <p className="text-[10px] text-amber-300/90 font-mono">
                    UPI ID: {upiHandle} (Atul Gaikwad)
                  </p>
                </div>

                {/* UTR Input Field */}
                <div className="pt-2 text-left space-y-1 border-t border-amber-700/40">
                  <label className="block text-[11px] font-bold text-yellow-300">
                    {isMr ? 'पेमेंट केल्यावर मिळणारा 12-Digit UTR / Ref No. टाका:' : 'Enter 12-Digit UTR / Ref No. after payment:'}
                  </label>
                  <input
                    type="text"
                    maxLength={18}
                    placeholder={isMr ? 'उदा. 423812345678 (GPay / PhonePe / Paytm)' : 'e.g. 423812345678'}
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                    className="w-full bg-amber-950 border border-amber-500/60 rounded-xl px-3 py-2 text-xs text-yellow-200 placeholder-amber-400/50 font-mono focus:outline-none focus:border-amber-300"
                  />
                </div>
              </div>
            )
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
                  ? (isMr ? 'बुकिंग सेव्ह होत आहे...' : 'Saving to Database...')
                  : (isMr ? 'बुकिंग पूर्ण करा व पावती मिळवा' : 'Confirm Booking & Get Receipt')}
              </span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
