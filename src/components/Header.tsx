import React from 'react';
import { Phone, Search, ShieldCheck, Sparkles, MapPin, Globe, Share2, MessageCircle } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenTrackModal: () => void;
  onOpenAdminModal: () => void;
  onOpenPamphletModal: () => void;
  isAdmin: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenTrackModal,
  onOpenAdminModal,
  onOpenPamphletModal,
  isAdmin
}) => {
  const isMr = language === 'mr';

  const whatsappMsg = encodeURIComponent(
    isMr
      ? 'नमस्कार अतुल दादा, मला आदित्य गणराज आर्ट्स स्टॉलवरून गणेश मूर्ती बुकिंग विषयी चौकशी करायची आहे.'
      : 'Hello Atul Dada, I want to inquire about Ganesh Murti booking.'
  );

  return (
    <>
      <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur-md border-b border-amber-600/30 shadow-2xl">
        {/* Devotional Ticker Bar */}
        <div className="bg-gradient-to-r from-amber-700 via-red-700 to-amber-700 text-amber-100 text-xs sm:text-sm py-1.5 px-4 font-medium flex items-center justify-between overflow-hidden shadow-inner">
          <div className="flex items-center gap-2 whitespace-nowrap animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>|| श्री गणेशाय नमः ||</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-amber-200">
            <span>🚩 {isMr ? 'बुकिंग सुरु! पेन व नगर येथील मूळ मूर्ती' : 'Booking Open! Pen & Ahmednagar Idols'}</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-red-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-amber-950 flex items-center justify-center text-amber-400 text-xl sm:text-2xl font-bold border border-amber-500/40">
                🌺
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gold-gradient tracking-wide">
                  {isMr ? 'आदित्य गणराज आर्ट्स' : 'Aditya Ganraj Arts'}
                </h1>
                <span className="bg-red-800/90 text-amber-200 text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-red-500/40 font-semibold shadow">
                  {isMr ? 'नाशिक' : 'Nashik'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-300/90 font-medium">
                {isMr 
                  ? 'पेन व नगर येथील सुबक गणेश मूर्ती स्टॉल (अतुल गायकवाड)' 
                  : 'Pen & Ahmednagar Ganesh Idols (Atul Gaikwad)'}
              </p>
            </div>
          </div>

          {/* Contact Numbers & Action Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            
            {/* Social Pamphlet Button */}
            <button
              onClick={onOpenPamphletModal}
              className="flex items-center gap-1 bg-amber-900/80 hover:bg-amber-800 text-amber-200 border border-amber-600/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow"
              title="Social Media Pamphlet"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isMr ? 'पॅम्पलेट' : 'Flyer'}</span>
            </button>

            {/* Language Switch */}
            <button
              onClick={() => onLanguageChange(isMr ? 'en' : 'mr')}
              className="flex items-center gap-1 bg-amber-900/70 hover:bg-amber-800 text-amber-200 border border-amber-600/40 px-2.5 py-1.5 rounded-lg text-xs font-bold transition shadow"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{isMr ? 'Eng' : 'मराठी'}</span>
            </button>

            {/* Track Booking */}
            <button
              onClick={onOpenTrackModal}
              className="flex items-center gap-1 bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600 text-amber-100 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-500/50 shadow-md transition transform active:scale-95"
            >
              <Search className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isMr ? 'बुकिंग शोधा' : 'Track'}</span>
            </button>

            {/* Admin Panel Toggle */}
            <button
              onClick={onOpenAdminModal}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition shadow ${
                isAdmin
                  ? 'bg-amber-500 text-amber-950 border-amber-300 font-extrabold'
                  : 'bg-amber-950/80 hover:bg-amber-900 text-amber-300 border-amber-700/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdmin ? (isMr ? 'स्टॉल मालक ON' : 'Admin Active') : (isMr ? 'स्टॉल मालक' : 'Admin')}</span>
            </button>

          </div>
        </div>
      </header>

      {/* Sticky Mobile Bottom Quick Action Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-amber-950/95 border-t border-amber-500/40 backdrop-blur-lg px-3 py-2 flex items-center justify-around text-amber-200 text-[10px] font-bold shadow-2xl">
        <a
          href="tel:9284169779"
          className="flex flex-col items-center gap-0.5 hover:text-yellow-300 transition"
        >
          <div className="p-1.5 rounded-full bg-amber-900 border border-amber-600/40 text-amber-400">
            <Phone className="w-4 h-4" />
          </div>
          <span>{isMr ? 'कॉल करा' : 'Call'}</span>
        </a>

        <a
          href={`https://wa.me/919284169779?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 hover:text-emerald-400 transition"
        >
          <div className="p-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400">
            <MessageCircle className="w-4 h-4 fill-current" />
          </div>
          <span>{isMr ? 'व्हाट्सॲप' : 'WhatsApp'}</span>
        </a>

        <button
          onClick={onOpenPamphletModal}
          className="flex flex-col items-center gap-0.5 hover:text-yellow-300 transition"
        >
          <div className="p-1.5 rounded-full bg-amber-900 border border-amber-600/40 text-amber-400">
            <Share2 className="w-4 h-4" />
          </div>
          <span>{isMr ? 'पॅम्पलेट' : 'Flyer'}</span>
        </button>

        <button
          onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-0.5 text-yellow-300"
        >
          <div className="p-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 font-black shadow">
            <Sparkles className="w-4 h-4 fill-amber-950" />
          </div>
          <span>{isMr ? 'मूर्ती पहा' : 'Idols'}</span>
        </button>
      </div>
    </>
  );
};
