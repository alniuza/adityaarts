import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface ContactLocationProps {
  language: Language;
}

export const ContactLocation: React.FC<ContactLocationProps> = ({ language }) => {
  const isMr = language === 'mr';

  const whatsappMsg = encodeURIComponent(
    isMr
      ? 'नमस्कार अतुल दादा, मी आदित्य गणराज आर्ट्स स्टॉलचा पत्ता व बुकिंग विषयी चौकशी करत आहे.'
      : 'Hello Atul Dada, I want to inquire about stall location and Ganpati booking.'
  );

  return (
    <section id="contact-location" className="py-16 bg-amber-950/80 relative border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Address Details (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase bg-amber-900/60 px-4 py-1 rounded-full border border-amber-600/30">
              <MapPin className="w-4 h-4 text-yellow-300" />
              <span>{isMr ? 'स्टॉल पत्ता व संपर्क (Stall Address & Contact)' : 'STALL LOCATION & CONTACT'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-gradient leading-tight">
              {isMr ? 'आदित्य गणराज आर्ट्स स्टॉल, नाशिक' : 'Aditya Ganraj Arts Stall, Nashik'}
            </h2>

            {/* Address Card */}
            <div className="bg-amber-900/40 rounded-2xl p-6 border border-amber-600/40 shadow-xl space-y-4">
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-800 text-amber-200 flex items-center justify-center shrink-0 border border-amber-500/40">
                  <MapPin className="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                  <h4 className="text-xs text-amber-400 font-bold uppercase tracking-wide">
                    {isMr ? 'स्टॉलचा पूर्ण पत्ता (Full Address):' : 'Full Stall Address:'}
                  </h4>
                  <p className="text-sm sm:text-base font-bold text-amber-100 mt-1 leading-relaxed">
                    {isMr ? (
                      <>
                        आदित्य गणराज आर्ट्स स्टॉल, पोलीस ट्रेनिंग सेंटरच्या समोर (PTC), शॉपर्स स्टॉप शेजारी, त्र्यंबक रोड, नाशिक, महाराष्ट्र - 422002.
                      </>
                    ) : (
                      <>
                        Aditya Ganraj Arts Stall, Opp. Police Training Center (PTC), Near Shoppers Stop, Trimbak Road, Nashik, Maharashtra - 422002.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Owner Info & Phones */}
              <div className="pt-4 border-t border-amber-700/40 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 border border-amber-600/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-amber-400 text-[10px] block">{isMr ? 'स्टॉल प्रमुख (Owner):' : 'Stall Owner:'}</span>
                    <span className="font-extrabold text-sm text-yellow-300">अतुल गायकवाड</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-950 text-amber-300 flex items-center justify-center shrink-0 border border-amber-600/40">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-amber-400 text-[10px] block">{isMr ? 'स्टॉल वेळ (Stall Hours):' : 'Stall Hours:'}</span>
                    <span className="font-bold text-amber-100">सकाळी ९:०० ते रात्री १०:००</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="tel:9284169779"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-black px-5 py-3 rounded-xl shadow-lg text-sm transition transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>9284169779 / 7720879798</span>
              </a>

              <a
                href={`https://wa.me/919284169779?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-3 rounded-xl shadow-lg text-sm border border-emerald-500/40 transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{isMr ? 'व्हाट्सॲप चॅट करा' : 'WhatsApp Chat'}</span>
              </a>

              <a
                href="https://maps.google.com/?q=Shoppers+Stop+Trimbak+Road+Nashik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-amber-900 hover:bg-amber-800 text-amber-200 font-bold px-5 py-3 rounded-xl border border-amber-600/40 text-sm transition"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{isMr ? 'मॅप वर मार्ग पहा' : 'Google Maps Directions'}</span>
              </a>
            </div>

          </div>

          {/* Map & Poster Visual (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-amber-900/60 to-amber-950/80 p-2 rounded-2xl border border-amber-600/40 shadow-2xl space-y-3">
              
              <div className="rounded-xl overflow-hidden aspect-video relative border border-amber-500/40">
                {/* Embed OpenStreetMap iframe for Nashik Trimbak Road */}
                <iframe
                  title="Stall Location Map"
                  width="100%"
                  height="100%"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.7500%2C19.9800%2C73.8000%2C20.0200&amp;layer=mapnik"
                  className="border-0 filter saturate-150 contrast-125"
                />
                
                <div className="absolute top-2 left-2 bg-amber-950/90 text-yellow-300 text-xs px-2.5 py-1 rounded font-bold border border-amber-500/40 shadow">
                  📍 त्र्यंबक रोड, नाशिक स्टॉल
                </div>
              </div>

              <div className="p-3 text-center bg-amber-950/80 rounded-lg border border-amber-700/30 text-xs text-amber-200">
                <p className="font-bold text-yellow-300">
                  {isMr ? 'पेन व नगर येथील ओरिजिनल गणेश मूर्ती उपलब्ध' : 'Authentic Pen & Ahmednagar Ganesh Idols'}
                </p>
                <p className="text-[11px] text-amber-300/80 mt-0.5">
                  {isMr ? 'शॉपर्स स्टॉप जवळ • पोलीस ट्रेनिंग सेंटर समोर, नाशिक' : 'Near Shoppers Stop • Opp PTC, Nashik'}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
