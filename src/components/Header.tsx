import React from 'react';
import { Phone, Search, ShieldCheck, Sparkles, MapPin, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTrackModal: () => void;
  onOpenAdminModal: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenTrackModal,
  onOpenAdminModal,
  isAdmin
}) => {
  const isMr = language === 'mr';

  return (
    <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur-md border-b border-amber-600/30 shadow-2xl">
      {/* Devotional Ticker Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 text-amber-100 text-xs sm:text-sm py-1.5 px-4 font-medium flex items-center justify-between overflow-hidden shadow-inner">
        <div className="flex items-center gap-2 whitespace-nowrap animate-pulse">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>|| श्री गणेशाय नमः ||</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-amber-200">
          <span>🚩 {isMr ? 'बुकिंग सुरु! पेन व नगर येथील मूळ मूर्ती' : 'Booking Open! Pen & Ahmednagar Original Idols'}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            {isMr ? 'त्र्यंबक रोड, नाशिक' : 'Trimbak Road, Nashik'}
          </span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap font-bold text-yellow-200">
          <span>|| गणपती बाप्पा मोरया ||</span>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-red-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-amber-950 flex items-center justify-center text-amber-400 text-2xl font-bold border border-amber-500/40">
              🌺
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-gradient tracking-wide">
                {isMr ? 'आदित्य गणराज आर्ट्स' : 'Aditya Ganraj Arts'}
              </h1>
              <span className="bg-red-800/90 text-amber-200 text-xs px-2 py-0.5 rounded-full border border-red-500/40 font-semibold shadow">
                {isMr ? 'नाशिक' : 'Nashik'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-300/90 font-medium">
              {isMr 
                ? 'पेन व नगर येथील आकर्षक गणेश मूर्ती स्टॉल (अतुल गायकवाड)' 
                : 'Pen & Ahmednagar Attractive Ganesh Idols (Atul Gaikwad)'}
            </p>
          </div>
        </div>

        {/* Contact Numbers & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto">
          {/* Quick Call */}
          <div className="hidden lg:flex items-center gap-2 bg-amber-900/60 border border-amber-600/40 px-3 py-1.5 rounded-xl text-amber-200 text-xs font-semibold">
            <Phone className="w-4 h-4 text-amber-400 animate-bounce" />
            <div>
              <p className="text-[10px] text-amber-400/80 leading-none">{isMr ? 'सुलभ संपर्क / फोन' : 'Direct Call'}</p>
              <div className="flex gap-2">
                <a href="tel:9284169779" className="hover:text-yellow-300 transition">9284169779</a>
                <span>/</span>
                <a href="tel:7720879798" className="hover:text-yellow-300 transition">7720879798</a>
              </div>
            </div>
          </div>

          {/* Language Switch */}
          <button
            onClick={() => onLanguageChange(isMr ? 'en' : 'mr')}
            className="flex items-center gap-1.5 bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-600/40 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow"
            title="Switch Language"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{isMr ? 'English' : 'मराठी'}</span>
          </button>

          {/* Track Booking */}
          <button
            onClick={onOpenTrackModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600 text-amber-100 px-3.5 py-1.5 rounded-lg text-xs font-bold border border-amber-500/50 shadow-md transition transform active:scale-95"
          >
            <Search className="w-3.5 h-3.5 text-yellow-300" />
            <span>{isMr ? 'बुकिंग शोधा' : 'Track Booking'}</span>
          </button>

          {/* Admin Panel Toggle */}
          <button
            onClick={onOpenAdminModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition shadow ${
              isAdmin
                ? 'bg-amber-500 text-amber-950 border-amber-300 font-extrabold'
                : 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-700/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isAdmin ? (isMr ? 'स्टॉल मालक मोड ON' : 'Admin Active') : (isMr ? 'स्टॉल मालक' : 'Stall Owner')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
