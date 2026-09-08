import React, { useState, useEffect } from 'react';
import { GanpatiIdol, BookingRecord, Language } from '../types';
import { ShieldCheck, Plus, Lock, X, Eye } from 'lucide-react';

interface AdminDashboardProps {
  idols: GanpatiIdol[];
  language: Language;
  onClose: () => void;
  onAddIdol: (newIdol: GanpatiIdol) => void;
  onUpdateIdolAvailability: (id: string, isAvailable: boolean) => void;
  onSelectBookingReceipt: (booking: BookingRecord) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  idols,
  language,
  onClose,
  onAddIdol,
  onUpdateIdolAvailability,
  onSelectBookingReceipt
}) => {
  const isMr = language === 'mr';

  // PIN Authentication state - Updated default PIN to 0808
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');

  // Bookings list state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'inventory' | 'add'>('bookings');
  const [bookingFilter, setBookingFilter] = useState('All');

  // New Idol Form State
  const [newIdol, setNewIdol] = useState({
    nameMr: '',
    nameEn: '',
    origin: 'Pen' as const,
    heightFeet: 2.0,
    material: 'Shadu Mati (Eco-Friendly)' as const,
    category: 'Home' as const,
    price: 3000,
    originalPrice: 3500,
    image: '/idols/murti_page_1.jpg',
    descriptionMr: 'नवीन सुबक गणेश मूर्ती, आकर्षक रंगसंगती.',
    descriptionEn: 'New handcrafted Ganesh idol with fine detailing.',
    stallNo: 'स्टॉल नं. A-3',
    colorScheme: 'सोनेरी व लाल (Gold & Red)'
  });

  useEffect(() => {
    // Fetch bookings from MongoDB Cloud Database API via Vercel
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        if (res.ok) {
          const dbBookings: BookingRecord[] = await res.json();
          if (dbBookings && dbBookings.length > 0) {
            setBookings(dbBookings);
            return;
          }
        }
      } catch (err) {
        console.log('MongoDB API offline, reading LocalStorage.');
      }

      // LocalStorage fallback
      const saved = localStorage.getItem('aditya_ganraj_bookings');
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    };

    fetchBookings();
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '0808' || pinInput === '9284169779') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError(isMr ? 'चुकीचा पिन! कृपया बरोबर पिन टाका.' : 'Incorrect PIN! Please try again.');
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: BookingRecord['status']) => {
    const updated = bookings.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus } : b));
    setBookings(updated);
    localStorage.setItem('aditya_ganraj_bookings', JSON.stringify(updated));

    // Update in MongoDB API
    try {
      await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.log('MongoDB update status API offline.');
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: GanpatiIdol = {
      ...newIdol,
      id: `GAN-${Math.floor(100 + Math.random() * 900)}`,
      isAvailable: true,
      isFeatured: true,
      bookedCount: 0
    };

    // Save to MongoDB API
    try {
      await fetch('/api/idols', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (err) {
      console.log('MongoDB add idol API offline.');
    }

    onAddIdol(created);
    setActiveTab('inventory');
  };

  // Metrics
  const totalRevenue = bookings.reduce((acc, b) => acc + b.tokenAmount, 0);
  const totalBookingsCount = bookings.length;

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'All') return true;
    return b.status === bookingFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="bg-amber-950 border border-amber-500/50 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 rounded-full bg-amber-900/60 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-amber-900/60 rounded-full mx-auto flex items-center justify-center border border-amber-500/40 text-amber-400">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-gold-gradient">
              {isMr ? 'स्टॉल मालक लॉगिन' : 'Stall Owner Login'}
            </h3>
            <p className="text-xs text-amber-300/80 mt-1">
              {isMr ? 'अतुल गायकवाड (आदित्य गणराज आर्ट्स)' : 'Atul Gaikwad (Aditya Ganraj Arts)'}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-3">
            {pinError && <p className="text-xs text-red-400 font-bold">{pinError}</p>}
            <input
              type="password"
              maxLength={10}
              placeholder={isMr ? 'पिन टाका' : 'Enter PIN'}
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center tracking-widest text-lg bg-amber-900/40 border border-amber-600/40 rounded-xl py-2.5 text-yellow-300 placeholder-amber-400/50 focus:outline-none focus:border-amber-400 font-mono"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-black py-2.5 rounded-xl shadow text-sm"
            >
              {isMr ? 'लॉगिन करा' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-amber-950 border border-amber-500/50 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-red-950 to-amber-900 p-4 border-b border-amber-600/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-yellow-300" />
            <div>
              <h3 className="text-lg font-bold text-amber-100">
                {isMr ? 'आदित्य गणराज आर्ट्स - स्टॉल मॅनेजमेंट' : 'Aditya Ganraj Stall Admin Dashboard'}
              </h3>
              <p className="text-xs text-amber-300/80">
                {isMr ? 'स्टॉल मालक: अतुल गायकवाड • नाशिक (MongoDB Live Connected)' : 'Owner: Atul Gaikwad • Nashik Stall'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-amber-900/60 hover:bg-amber-800 text-amber-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Analytics Widgets Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-amber-900/30 border-b border-amber-700/30 text-xs">
          <div className="bg-amber-950 p-3 rounded-xl border border-amber-600/40">
            <span className="text-amber-300 text-[10px] block">{isMr ? 'एकूण ऑनलाईन बुकिंग्स' : 'Total Bookings'}</span>
            <p className="text-xl font-black text-yellow-400 font-mono mt-0.5">{totalBookingsCount}</p>
          </div>

          <div className="bg-amber-950 p-3 rounded-xl border border-amber-600/40">
            <span className="text-amber-300 text-[10px] block">{isMr ? 'जमा टोकन रक्कम (UPI/Cash)' : 'Token Collected'}</span>
            <p className="text-xl font-black text-emerald-400 font-mono mt-0.5">₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>

          <div className="bg-amber-950 p-3 rounded-xl border border-amber-600/40">
            <span className="text-amber-300 text-[10px] block">{isMr ? 'कॅटलॉग मूर्ती संख्या' : 'Total Idol Types'}</span>
            <p className="text-xl font-black text-yellow-300 font-mono mt-0.5">{idols.length}</p>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex border-b border-amber-700/40 px-4 bg-amber-950 text-xs font-bold">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'bookings'
                ? 'border-amber-400 text-yellow-300 bg-amber-900/30'
                : 'border-transparent text-amber-300/70 hover:text-amber-200'
            }`}
          >
            {isMr ? 'ग्राहक बुकिंग यादी' : 'Customer Bookings'} ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-yellow-300 bg-amber-900/30'
                : 'border-transparent text-amber-300/70 hover:text-amber-200'
            }`}
          >
            {isMr ? 'मूर्ती स्टॉक' : 'Idol Inventory'} ({idols.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-1 ${
              activeTab === 'add'
                ? 'border-amber-400 text-yellow-300 bg-amber-900/30'
                : 'border-transparent text-amber-300/70 hover:text-amber-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>{isMr ? 'नवीन मूर्ती जोडा' : 'Add New Idol'}</span>
          </button>
        </div>

        {/* Main Tab Content Area */}
        <div className="p-5 overflow-y-auto flex-1 text-amber-100">
          
          {/* TAB 1: Customer Bookings */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              
              {/* Live Pending Verification Banner */}
              {bookings.filter(b => b.status === 'Pending Verification').length > 0 && (
                <div className="bg-yellow-950/90 border border-yellow-500/70 p-3 rounded-xl flex items-center justify-between gap-3 text-xs text-yellow-200 animate-pulse">
                  <div className="flex items-center gap-2 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shrink-0"></span>
                    <span>
                      {isMr
                        ? `🔴 ${bookings.filter(b => b.status === 'Pending Verification').length} नवीन ऑनलाईन पेमेंट पडताळणी प्रलंबित! GPay/PhonePe मध्ये UTR तपासून कन्फर्म करा.`
                        : `🔴 ${bookings.filter(b => b.status === 'Pending Verification').length} New Payment Verifications Pending! Check UTR and click Approve.`}
                    </span>
                  </div>
                  <button
                    onClick={() => setBookingFilter('Pending Verification')}
                    className="bg-yellow-500 hover:bg-yellow-400 text-yellow-950 font-black px-3 py-1 rounded text-[11px] shrink-0"
                  >
                    {isMr ? 'पहा' : 'View'}
                  </button>
                </div>
              )}

              {/* Filter */}
              <div className="flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="text-amber-300 font-bold">{isMr ? 'बुकिंग फिल्टर:' : 'Filter:'}</span>
                <div className="flex gap-1 flex-wrap">
                  {['All', 'Pending Verification', 'Confirmed', 'Ready for Pickup', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setBookingFilter(st)}
                      className={`px-3 py-1 rounded text-[11px] font-bold ${
                        bookingFilter === st
                          ? 'bg-amber-500 text-amber-950'
                          : st === 'Pending Verification'
                          ? 'bg-yellow-900/60 text-yellow-300 border border-yellow-600/40'
                          : 'bg-amber-900/40 text-amber-200'
                      }`}
                    >
                      {st === 'Pending Verification' && isMr ? 'पडताळणी प्रलंबित' : st}
                      {st === 'Pending Verification' && ` (${bookings.filter(b => b.status === 'Pending Verification').length})`}
                    </button>
                  ))}
                </div>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-10 bg-amber-900/20 rounded-xl border border-amber-700/30">
                  <p className="text-sm font-bold text-amber-200">{isMr ? 'कोणतेही ऑनलाईन बुकिंग नोंदवलेले नाही.' : 'No customer bookings available yet.'}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-amber-900/60 border-b border-amber-700/40 text-amber-300">
                        <th className="p-2.5 font-bold">ID</th>
                        <th className="p-2.5 font-bold">{isMr ? 'ग्राहक & फोन' : 'Customer'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'UTR / Ref ID' : 'UTR No.'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'मूर्ती नाव' : 'Idol'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'टोकन रक्कम' : 'Token'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'पिकअप तारीख' : 'Pickup Date'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'स्टेटस' : 'Status'}</th>
                        <th className="p-2.5 font-bold">{isMr ? 'ॲक्शन' : 'Action'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-700/30">
                      {filteredBookings.map((b) => (
                        <tr key={b.bookingId} className="hover:bg-amber-900/30 transition">
                          <td className="p-2.5 font-mono font-bold text-yellow-300">{b.bookingId}</td>
                          <td className="p-2.5">
                            <p className="font-bold text-amber-100">{b.customerName}</p>
                            <p className="text-[10px] text-amber-300/80 font-mono">{b.phone}</p>
                          </td>
                          <td className="p-2.5 font-mono">
                            <span className="text-yellow-300 font-extrabold text-[11px] block">{b.utrNumber || 'N/A'}</span>
                            <span className="text-[9px] text-amber-400/70">{b.paymentMode}</span>
                          </td>
                          <td className="p-2.5">
                            <p className="font-medium text-amber-200">{isMr ? b.idolNameMr : b.idolNameEn}</p>
                          </td>
                          <td className="p-2.5 font-mono">
                            <span className="text-emerald-400 font-bold">₹{b.tokenAmount}</span>
                          </td>
                          <td className="p-2.5">{b.pickupDate}</td>
                          <td className="p-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              b.status === 'Completed'
                                ? 'bg-emerald-900 text-emerald-300'
                                : b.status === 'Pending Verification'
                                ? 'bg-yellow-950 text-yellow-300 border border-yellow-500/50 animate-pulse'
                                : b.status === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-300'
                                : 'bg-amber-900 text-yellow-300'
                            }`}>
                              {b.status === 'Pending Verification' ? (isMr ? 'पडताळणी प्रलंबित' : 'Pending Verification') : b.status}
                            </span>
                          </td>
                          <td className="p-2.5 flex items-center gap-1 flex-wrap">
                            <button
                              onClick={() => onSelectBookingReceipt(b)}
                              className="p-1 bg-amber-800 hover:bg-amber-700 text-amber-200 rounded"
                              title="View Receipt"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {b.status === 'Pending Verification' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(b.bookingId, 'Confirmed')}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] rounded font-black shadow"
                                  title="Approve Payment"
                                >
                                  {isMr ? '✓ कन्फर्म' : 'Approve'}
                                </button>
                                <button
                                  onClick={() => handleStatusChange(b.bookingId, 'Cancelled')}
                                  className="px-1.5 py-1 bg-red-900/80 hover:bg-red-800 text-red-200 text-[10px] rounded font-bold"
                                  title="Reject Payment"
                                >
                                  {isMr ? '✕ नाकारा' : 'Reject'}
                                </button>
                              </>
                            )}

                            {b.status === 'Confirmed' && (
                              <button
                                onClick={() => handleStatusChange(b.bookingId, 'Ready for Pickup')}
                                className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] rounded font-bold"
                              >
                                {isMr ? 'रेडी' : 'Ready'}
                              </button>
                            )}

                            {b.status === 'Ready for Pickup' && (
                              <button
                                onClick={() => handleStatusChange(b.bookingId, 'Completed')}
                                className="px-2 py-0.5 bg-blue-700 hover:bg-blue-600 text-white text-[10px] rounded font-bold"
                              >
                                {isMr ? 'पूर्ण' : 'Done'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Idol Inventory */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {idols.map((idol) => (
                <div
                  key={idol.id}
                  className="bg-amber-900/30 p-3 rounded-xl border border-amber-600/30 flex gap-3 items-center"
                >
                  <img
                    src={idol.image}
                    alt={idol.nameMr}
                    className="w-16 h-16 rounded-lg object-cover border border-amber-500/40 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-yellow-300 font-bold">{idol.id}</span>
                      <button
                        onClick={() => onUpdateIdolAvailability(idol.id, !idol.isAvailable)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          idol.isAvailable ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                        }`}
                      >
                        {idol.isAvailable ? (isMr ? 'उपलब्ध' : 'Available') : (isMr ? 'बुकिंग फुल' : 'Booked')}
                      </button>
                    </div>
                    <h4 className="text-xs font-bold text-amber-100 truncate">{isMr ? idol.nameMr : idol.nameEn}</h4>
                    <p className="text-[10px] text-amber-300/80">{idol.origin} • {idol.stallNo}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: Add New Idol Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddSubmit} className="space-y-4 max-w-xl mx-auto text-xs">
              <h4 className="text-sm font-bold text-yellow-300">{isMr ? 'नवीन गणेश मूर्ती जोडा:' : 'Add New Idol Listing:'}</h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-300 mb-1">{isMr ? 'मूर्ती नाव (मराठी):' : 'Name (Marathi):'}</label>
                  <input
                    type="text"
                    required
                    value={newIdol.nameMr}
                    onChange={(e) => setNewIdol({ ...newIdol, nameMr: e.target.value })}
                    className="w-full bg-amber-900/40 border border-amber-600/40 rounded-lg p-2 text-amber-100"
                  />
                </div>

                <div>
                  <label className="block text-amber-300 mb-1">{isMr ? 'Name (English):' : 'Name (English):'}</label>
                  <input
                    type="text"
                    required
                    value={newIdol.nameEn}
                    onChange={(e) => setNewIdol({ ...newIdol, nameEn: e.target.value })}
                    className="w-full bg-amber-900/40 border border-amber-600/40 rounded-lg p-2 text-amber-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-amber-300 mb-1">{isMr ? 'उगम (Origin):' : 'Origin:'}</label>
                  <select
                    value={newIdol.origin}
                    onChange={(e) => setNewIdol({ ...newIdol, origin: e.target.value as any })}
                    className="w-full bg-amber-900/40 border border-amber-600/40 rounded-lg p-2 text-amber-100"
                  >
                    <option value="Pen">Pen</option>
                    <option value="Ahmednagar">Ahmednagar</option>
                    <option value="Special Edition">Special Edition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-amber-300 mb-1">{isMr ? 'स्टॉल क्र.:' : 'Stall No:'}</label>
                  <input
                    type="text"
                    value={newIdol.stallNo}
                    onChange={(e) => setNewIdol({ ...newIdol, stallNo: e.target.value })}
                    className="w-full bg-amber-900/40 border border-amber-600/40 rounded-lg p-2 text-amber-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-1">{isMr ? 'फोटो URL (Image URL):' : 'Image URL:'}</label>
                <input
                  type="text"
                  value={newIdol.image}
                  onChange={(e) => setNewIdol({ ...newIdol, image: e.target.value })}
                  className="w-full bg-amber-900/40 border border-amber-600/40 rounded-lg p-2 text-amber-100"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-black py-2.5 rounded-xl shadow"
              >
                {isMr ? 'कॅटलॉगमध्ये मूर्ती जोडा' : 'Add Idol to Catalog'}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
