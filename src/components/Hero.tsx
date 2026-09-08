import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, MessageCircle, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  language: Language;
  onBrowseClick: () => void;
  onLocationClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onBrowseClick, onLocationClick }) => {
  const isMr = language === 'mr';

  // Ganesh Chaturthi countdown calculation
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Hero carousel image auto-slide using extracted catalog photos
  const heroImages = [
    { src: '/idols/murti_page_1.jpg', titleMr: 'पेण लालबागचा राजा स्पेशल (माॅडेल #1)', titleEn: 'Pen Lalbaugcha Raja Special (#1)' },
    { src: '/idols/murti_page_2.jpg', titleMr: 'नगर श्रीमंत दगडूशेठ हलवाई (माॅडेल #2)', titleEn: 'Ahmednagar Dagdusheth Style (#2)' },
    { src: '/idols/murti_page_3.jpg', titleMr: 'चिंतामणी पेण विशेष मूर्ती (माॅडेल #3)', titleEn: 'Pen Chintamani Edition (#3)' },
    { src: '/idols/murti_page_6.jpg', titleMr: 'शाही पेशवाई सुवर्ण सिंहासन (माॅडेल #6)', titleEn: 'Shahi Peshwai Gold Throne (#6)' }
  ];

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveImgIdx((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const whatsappMessage = encodeURIComponent(
    isMr 
      ? 'नमस्कार अतुल दादा, मला आदित्य गणराज आर्ट्स स्टॉलमधून गणेश मूर्ती बुकिंग करायची आहे. अधिक माहिती द्या.' 
      : 'Hello Atul Dada, I want to book a Ganesh Idol from Aditya Ganraj Arts stall. Please provide details.'
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-950 via-amber-900/60 to-amber-950 py-12 md:py-20 border-b border-amber-600/30">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-950 to-amber-900 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-amber-950/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4" />
              <span>{isMr ? '७३ मूळ गणेश मूर्ती बुकिंग सुरु! (PDF Catalog Active)' : '73 ORIGINAL MURTI CATALOG LIVE!'}</span>
            </div>

            {/* Main Title */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-tight">
                {isMr ? (
                  <>
                    <span className="text-gold-gradient block">आदित्य गणराज आर्ट्स</span>
                    <span className="text-2xl sm:text-4xl text-amber-200 block font-bold mt-1">
                      पेन व नगर येथील ७३ आकर्षक गणेश मूर्ती
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-gold-gradient block">Aditya Ganraj Arts</span>
                    <span className="text-2xl sm:text-4xl text-amber-200 block font-bold mt-1">
                      73 Authentic Pen & Ahmednagar Ganesh Idols
                    </span>
                  </>
                )}
              </h2>
            </div>

            {/* Tagline Box */}
            <div className="bg-amber-950/80 border-l-4 border-amber-500 p-4 rounded-r-xl text-amber-200/90 text-sm sm:text-base leading-relaxed backdrop-blur shadow-inner">
              <p>
                {isMr 
                  ? 'आमच्याकडे पेन (Pen) आणि नगर (Ahmednagar) येथील नामांकित कारागिरांच्या सुबक, टिकाऊ व सुंदर रंगसंगतीच्या ७३ गणेश मूर्ती योग्य दरात उपलब्ध आहेत. आजच तुमची मूर्ती ५०० रू. टोकन देऊन बुक करा!' 
                  : 'Explore 73 original Ganesh idols handcrafted by master artisans of Pen & Ahmednagar at reasonable rates. Reserve your Murti today with ₹500 advance token!'}
              </p>
            </div>

            {/* Key Bullet Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-medium text-amber-200">
              <div className="flex items-center gap-1.5 bg-amber-900/40 p-2 rounded-lg border border-amber-600/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isMr ? '७३ मूळ फोटो कॅटलॉग' : '73 PDF Photos'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-900/40 p-2 rounded-lg border border-amber-600/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isMr ? 'सुरक्षित पॅकिंग facility' : 'Safe Box Packaging'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-900/40 p-2 rounded-lg border border-amber-600/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isMr ? 'शाडू माती & POP मूर्ती' : 'Shadu & POP'}</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onBrowseClick}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-black px-6 py-3.5 rounded-xl shadow-xl shadow-amber-600/30 text-sm sm:text-base transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5 text-amber-950 fill-amber-950" />
                <span>{isMr ? '७३ मूर्ती पहा व बुक करा' : 'Browse 73 Idols & Book'}</span>
              </button>

              <a
                href={`https://wa.me/919284169779?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-3.5 rounded-xl shadow-lg border border-emerald-500/40 text-sm sm:text-base transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{isMr ? 'व्हाट्सॲप बुकिंग' : 'WhatsApp Chat'}</span>
              </a>

              <button
                onClick={onLocationClick}
                className="flex items-center gap-1.5 bg-amber-950 hover:bg-amber-900 text-amber-200 border border-amber-600/50 px-4 py-3.5 rounded-xl text-sm font-semibold transition"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'स्टॉलचा पत्ता' : 'Stall Location'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Hero Real Murti Carousel Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Main Visual Poster Card */}
            <div className="relative w-full max-w-md rounded-2xl p-1 bg-gradient-to-b from-amber-500 via-red-600 to-amber-700 shadow-2xl shadow-amber-950/80 transform hover:scale-[1.01] transition duration-300">
              <div className="bg-amber-950 rounded-xl p-5 border border-amber-500/30 text-center space-y-4">
                
                {/* Devotional Symbol & Header */}
                <div className="flex items-center justify-between text-amber-300 text-sm font-bold border-b border-amber-600/30 pb-2">
                  <span>🚩 नाशिक स्टॉल</span>
                  <span className="text-gold-gradient font-black">अतुल गायकवाड</span>
                  <span>73 {isMr ? 'मूर्ती' : 'Idols'}</span>
                </div>

                {/* Real Extracted Murti Image Carousel Frame */}
                <div className="relative overflow-hidden rounded-lg aspect-square border-2 border-amber-500/50 shadow-inner group">
                  <img
                    src={heroImages[activeImgIdx].src}
                    alt={isMr ? heroImages[activeImgIdx].titleMr : heroImages[activeImgIdx].titleEn}
                    className="w-full h-full object-cover transition duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-red-700 text-amber-100 text-[10px] font-bold px-2 py-0.5 rounded shadow border border-red-500/40">
                    PDF {isMr ? 'कॅटलॉग फोटो' : 'Catalog Photo'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="bg-amber-500 text-amber-950 text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                      {isMr ? 'पेन व नगर मूळ फोटो' : 'Pen & Ahmednagar Real Murti'}
                    </span>
                    <p className="text-base font-extrabold text-amber-100 mt-0.5">
                      {isMr ? heroImages[activeImgIdx].titleMr : heroImages[activeImgIdx].titleEn}
                    </p>
                  </div>
                </div>

                {/* Carousel Indicator Dots */}
                <div className="flex justify-center gap-1.5">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIdx(i)}
                      className={`h-2 rounded-full transition-all ${
                        activeImgIdx === i ? 'w-6 bg-yellow-400' : 'w-2 bg-amber-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Countdown Box */}
                <div className="bg-amber-900/60 rounded-lg p-3 border border-amber-600/30">
                  <p className="text-xs text-amber-300 font-medium flex items-center justify-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isMr ? 'गणेशोत्सव आगमन काउंटडाऊन' : 'Ganeshotsav Arrival Countdown'}</span>
                  </p>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-amber-950 p-1.5 rounded border border-amber-500/30">
                      <span className="block text-lg font-black text-yellow-400 leading-none">{timeLeft.days}</span>
                      <span className="text-[10px] text-amber-300">{isMr ? 'दिवस' : 'Days'}</span>
                    </div>
                    <div className="bg-amber-950 p-1.5 rounded border border-amber-500/30">
                      <span className="block text-lg font-black text-yellow-400 leading-none">{timeLeft.hours}</span>
                      <span className="text-[10px] text-amber-300">{isMr ? 'तास' : 'Hours'}</span>
                    </div>
                    <div className="bg-amber-950 p-1.5 rounded border border-amber-500/30">
                      <span className="block text-lg font-black text-yellow-400 leading-none">{timeLeft.minutes}</span>
                      <span className="text-[10px] text-amber-300">{isMr ? 'मिनिटे' : 'Mins'}</span>
                    </div>
                    <div className="bg-amber-950 p-1.5 rounded border border-amber-500/30">
                      <span className="block text-lg font-black text-yellow-400 leading-none">{timeLeft.seconds}</span>
                      <span className="text-[10px] text-amber-300">{isMr ? 'सेकंद' : 'Secs'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
