import React, { useState } from 'react';
import { BookingRecord, Language } from '../types';
import { X, Search, CheckCircle2, Eye } from 'lucide-react';

interface TrackBookingModalProps {
  language: Language;
  onClose: () => void;
  onSelectBooking: (booking: BookingRecord) => void;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  language,
  onClose,
  onSelectBooking
}) => {
  const isMr = language === 'mr';

  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BookingRecord[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const clean = query.trim().toLowerCase();

    // 1. Try fetching from MongoDB Backend API
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/track?query=${encodeURIComponent(clean)}`);
      if (response.ok) {
        const dbMatches: BookingRecord[] = await response.json();
        if (dbMatches && dbMatches.length > 0) {
          setResults(dbMatches);
          setSearched(true);
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.log('MongoDB API offline, falling back to LocalStorage search.');
    }

    // 2. LocalStorage Fallback
    const existingStr = localStorage.getItem('aditya_ganraj_bookings');
    const allBookings: BookingRecord[] = existingStr ? JSON.parse(existingStr) : [];
    const matches = allBookings.filter(
      (b) =>
        b.bookingId.toLowerCase().includes(clean) ||
        b.phone.includes(clean) ||
        b.customerName.toLowerCase().includes(clean)
    );

    setResults(matches);
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-amber-950 border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-4 border-b border-amber-600/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-yellow-300" />
            <h3 className="text-lg font-bold text-amber-100">
              {isMr ? 'बुकिंग स्टेटस तपासा (Track Booking)' : 'Track Your Ganpati Booking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-amber-100">
          
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs text-amber-300 font-medium">
              {isMr ? 'तुमचा १० अंकी मोबाईल नंबर किंवा बुकिंग ID टाका:' : 'Enter Mobile Number or Booking ID:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder={isMr ? 'उदा. 9822XXXXXX किंवा AGA-2026-XXXX' : 'e.g. 9822XXXXXX or AGA-2026-XXXX'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-amber-900/40 border border-amber-600/40 rounded-xl px-3.5 py-2.5 text-xs text-amber-100 placeholder-amber-400/50 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-black px-4 py-2.5 rounded-xl text-xs shadow transition flex items-center gap-1 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                <span>{loading ? (isMr ? 'शोधत आहे...' : 'Searching...') : (isMr ? 'शोधा' : 'Search')}</span>
              </button>
            </div>
          </form>

          {/* Search Results */}
          {searched && (
            <div className="space-y-3 pt-3 border-t border-amber-700/30">
              {results.length === 0 ? (
                <div className="text-center py-8 bg-amber-900/20 rounded-xl border border-amber-700/30">
                  <p className="text-sm font-bold text-amber-200">
                    {isMr ? 'कोणतेही बुकिंग सापडले नाही' : 'No bookings found'}
                  </p>
                  <p className="text-xs text-amber-300/70 mt-1">
                    {isMr ? 'कृपया मोबाईल नंबर किंवा बुकिंग ID पुन्हा तपासा.' : 'Please check your inputs and try again.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-amber-300 font-bold">
                    {isMr ? `सापडलेले बुकिंग: ${results.length}` : `Found ${results.length} record(s):`}
                  </p>

                  {results.map((item) => (
                    <div
                      key={item.bookingId}
                      className="bg-amber-900/40 rounded-xl p-4 border border-amber-600/40 flex flex-col justify-between gap-3 hover:border-amber-400/60 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] bg-amber-500 text-amber-950 font-mono font-extrabold px-2 py-0.5 rounded">
                            {item.bookingId}
                          </span>
                          <h4 className="text-sm font-bold text-amber-100 mt-1">
                            {isMr ? item.idolNameMr : item.idolNameEn}
                          </h4>
                          <p className="text-xs text-amber-300/80">
                            {isMr ? `ग्राहक: ${item.customerName} (${item.phone})` : `Customer: ${item.customerName}`}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 bg-emerald-950 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" />
                            {item.status}
                          </span>
                          <p className="text-xs text-yellow-400 font-bold mt-1">
                            {isMr ? 'जमा: ₹' + item.tokenAmount : `Paid: ₹${item.tokenAmount}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-amber-700/30 text-xs">
                        <div className="text-[11px] text-amber-300/80">
                          <span>{isMr ? 'पिकअप तारीख: ' : 'Pickup Date: '}</span>
                          <span className="font-bold text-amber-100">{item.pickupDate}</span>
                        </div>

                        <button
                          onClick={() => {
                            onClose();
                            onSelectBooking(item);
                          }}
                          className="flex items-center gap-1 text-xs bg-amber-800 hover:bg-amber-700 text-amber-100 px-3 py-1.5 rounded-lg border border-amber-600/40 transition font-bold"
                        >
                          <Eye className="w-3.5 h-3.5 text-yellow-300" />
                          <span>{isMr ? 'पावती पहा' : 'View Receipt'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="p-3 bg-amber-950 border-t border-amber-600/30 text-center text-xs text-amber-400">
          <span>{isMr ? 'काही अडचण असल्यास कॉल करा: 9284169779' : 'For help call: 9284169779'}</span>
        </div>

      </div>
    </div>
  );
};
