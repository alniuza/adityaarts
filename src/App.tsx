import React, { useState, useEffect } from 'react';
import { GanpatiIdol, BookingRecord, Language } from './types';
import { INITIAL_IDOLS } from './data/idolsData';
import { FestiveEffects } from './components/FestiveEffects';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Catalog } from './components/Catalog';
import { IdolDetailModal } from './components/IdolDetailModal';
import { BookingModal } from './components/BookingModal';
import { BookingReceiptModal } from './components/BookingReceiptModal';
import { TrackBookingModal } from './components/TrackBookingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SocialPamphletModal } from './components/SocialPamphletModal';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';

export function App() {
  const [language, setLanguage] = useState<Language>('mr');
  const [idols, setIdols] = useState<GanpatiIdol[]>(INITIAL_IDOLS);

  useEffect(() => {
    // Fetch from MongoDB API (works on Vercel & Local)
    const fetchIdolsFromDB = async () => {
      try {
        const response = await fetch('/api/idols');
        if (response.ok) {
          const dbIdols: GanpatiIdol[] = await response.json();
          if (dbIdols && dbIdols.length > 0) {
            setIdols(dbIdols);
            return;
          }
        }
      } catch (err) {
        console.log('MongoDB API offline, falling back to LocalStorage & local dataset.');
      }

      // LocalStorage fallback
      const saved = localStorage.getItem('aditya_ganraj_custom_idols');
      if (saved) {
        try {
          const custom: GanpatiIdol[] = JSON.parse(saved);
          setIdols([...custom, ...INITIAL_IDOLS]);
        } catch (e) {
          setIdols(INITIAL_IDOLS);
        }
      }
    };

    fetchIdolsFromDB();
  }, []);

  // Modal States
  const [selectedIdolForDetail, setSelectedIdolForDetail] = useState<GanpatiIdol | null>(null);
  const [selectedIdolForBooking, setSelectedIdolForBooking] = useState<GanpatiIdol | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<BookingRecord | null>(null);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showPamphletModal, setShowPamphletModal] = useState(false);

  const handleScrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToLocation = () => {
    document.getElementById('contact-location')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAddIdol = (newIdol: GanpatiIdol) => {
    const updated = [newIdol, ...idols];
    setIdols(updated);

    const customOnly = updated.filter((item) => !INITIAL_IDOLS.some((init) => init.id === item.id));
    localStorage.setItem('aditya_ganraj_custom_idols', JSON.stringify(customOnly));
  };

  const handleUpdateAvailability = async (id: string, isAvailable: boolean) => {
    const updated = idols.map((item) => (item.id === id ? { ...item, isAvailable } : item));
    setIdols(updated);

    try {
      await fetch(`/api/idols/${id}/availability`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable })
      });
    } catch (e) {
      console.log('MongoDB availability update API offline.');
    }

    const customOnly = updated.filter((item) => !INITIAL_IDOLS.some((init) => init.id === item.id));
    localStorage.setItem('aditya_ganraj_custom_idols', JSON.stringify(customOnly));
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-950 text-slate-100 relative selection:bg-amber-500 selection:text-amber-950 pb-16 md:pb-0">
      {/* Floating Petals Effect */}
      <FestiveEffects />

      {/* Header Bar & Sticky Mobile Action Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenTrackModal={() => setShowTrackModal(true)}
        onOpenAdminModal={() => setShowAdminModal(true)}
        onOpenPamphletModal={() => setShowPamphletModal(true)}
        isAdmin={showAdminModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Festive Hero Banner */}
        <Hero
          language={language}
          onBrowseClick={handleScrollToCatalog}
          onLocationClick={handleScrollToLocation}
        />

        {/* Poster 6 Key Highlights */}
        <Features language={language} />

        {/* Interactive Idol Catalog & Filters */}
        <Catalog
          idols={idols}
          language={language}
          onSelectIdol={(idol) => setSelectedIdolForDetail(idol)}
          onBookIdol={(idol) => setSelectedIdolForBooking(idol)}
        />

        {/* Stall Location & Contact Info */}
        <ContactLocation language={language} />
      </main>

      {/* Devotional Footer */}
      <Footer language={language} />

      {/* --- MODALS --- */}

      {/* Social Media Pamphlet / Poster Generator Modal */}
      {showPamphletModal && (
        <SocialPamphletModal
          language={language}
          onClose={() => setShowPamphletModal(false)}
        />
      )}

      {/* Idol Detail Specs Modal */}
      <IdolDetailModal
        idol={selectedIdolForDetail}
        language={language}
        onClose={() => setSelectedIdolForDetail(null)}
        onBook={(idol) => {
          setSelectedIdolForDetail(null);
          setSelectedIdolForBooking(idol);
        }}
      />

      {/* Online Pre-Booking Form Modal */}
      <BookingModal
        idol={selectedIdolForBooking}
        language={language}
        onClose={() => setSelectedIdolForBooking(null)}
        onBookingSuccess={(record) => {
          setSelectedIdolForBooking(null);
          setActiveReceipt(record);
        }}
      />

      {/* Official Booking Receipt Slip Modal */}
      <BookingReceiptModal
        booking={activeReceipt}
        language={language}
        onClose={() => setActiveReceipt(null)}
      />

      {/* Customer Track Booking Lookup Modal */}
      {showTrackModal && (
        <TrackBookingModal
          language={language}
          onClose={() => setShowTrackModal(false)}
          onSelectBooking={(record) => {
            setShowTrackModal(false);
            setActiveReceipt(record);
          }}
        />
      )}

      {/* Stall Owner Admin Dashboard */}
      {showAdminModal && (
        <AdminDashboard
          idols={idols}
          language={language}
          onClose={() => setShowAdminModal(false)}
          onAddIdol={handleAddIdol}
          onUpdateIdolAvailability={handleUpdateAvailability}
          onSelectBookingReceipt={(record) => {
            setActiveReceipt(record);
          }}
        />
      )}
    </div>
  );
}

export default App;
