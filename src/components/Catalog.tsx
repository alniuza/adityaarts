import React, { useState, useMemo } from 'react';
import { GanpatiIdol, Language, FilterState } from '../types';
import { Search, Filter, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

interface CatalogProps {
  idols: GanpatiIdol[];
  language: Language;
  onSelectIdol: (idol: GanpatiIdol) => void;
  onBookIdol: (idol: GanpatiIdol) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  idols,
  language,
  onSelectIdol,
  onBookIdol
}) => {
  const isMr = language === 'mr';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    origin: 'All',
    category: 'All',
    material: 'All',
    maxPrice: 100000,
    height: 'All'
  });

  const filteredIdols = useMemo(() => {
    return idols.filter((idol) => {
      // Search
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        idol.nameMr.toLowerCase().includes(query) ||
        idol.nameEn.toLowerCase().includes(query) ||
        idol.id.toLowerCase().includes(query) ||
        idol.descriptionMr.toLowerCase().includes(query);

      // Origin
      const matchesOrigin =
        filters.origin === 'All' || idol.origin === filters.origin;

      // Category
      const matchesCategory =
        filters.category === 'All' || idol.category === filters.category;

      // Material
      const matchesMaterial =
        filters.material === 'All' || idol.material.includes(filters.material);

      // Height
      let matchesHeight = true;
      if (filters.height === 'small') matchesHeight = idol.heightFeet <= 1.5;
      if (filters.height === 'medium') matchesHeight = idol.heightFeet > 1.5 && idol.heightFeet <= 2.5;
      if (filters.height === 'large') matchesHeight = idol.heightFeet > 2.5;

      return (
        matchesSearch &&
        matchesOrigin &&
        matchesCategory &&
        matchesMaterial &&
        matchesHeight
      );
    });
  }, [idols, filters]);

  return (
    <section id="catalog" className="py-16 bg-amber-950/60 relative border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase bg-amber-900/60 px-4 py-1 rounded-full border border-amber-600/30">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>{isMr ? 'गणेश मूर्ती कॅटलॉग (Book Online)' : 'EXPLORE GANESH IDOLS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gold-gradient">
            {isMr ? 'पेन व नगर येथील ७३ सुबक गणेश मूर्ती' : 'Pen & Ahmednagar Exclusive Idols'}
          </h2>
          <p className="text-amber-200/80 text-sm sm:text-base">
            {isMr
              ? 'तुमच्या पसंतीची मूर्ती निवडा, आकार, रंगसंगती तपासा आणि टोकन भरून ऑनलाईन बुक करा.'
              : 'Filter by origin, height & material. Reserve your idol online with advance token.'}
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="bg-amber-950/90 rounded-2xl p-5 border border-amber-600/40 shadow-2xl mb-10 space-y-4">
          
          {/* Top Search Bar & Origin Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isMr ? 'मूर्तीचे नाव किंवा माॅडेल शोधा... (उदा. लालबाग, माॅडेल #5)' : 'Search idol by name or model number...'}
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-amber-900/40 text-amber-100 placeholder-amber-400/60 pl-11 pr-4 py-3 rounded-xl border border-amber-600/40 focus:outline-none focus:border-amber-400 text-sm"
              />
            </div>

            {/* Origin Pills */}
            <div className="md:col-span-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {isMr ? 'मूर्तीचे उगमस्थान:' : 'Origin:'}
              </span>

              {[
                { labelMr: 'सर्व (All)', labelEn: 'All', value: 'All' },
                { labelMr: 'पेन मूर्ती (Pen)', labelEn: 'Pen Idols', value: 'Pen' },
                { labelMr: 'नगर मूर्ती (Ahmednagar)', labelEn: 'Ahmednagar', value: 'Ahmednagar' }
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilters({ ...filters, origin: opt.value })}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow ${
                    filters.origin === opt.value
                      ? 'bg-amber-500 text-amber-950 border border-amber-300'
                      : 'bg-amber-900/40 hover:bg-amber-800 text-amber-200 border border-amber-700/50'
                  }`}
                >
                  {isMr ? opt.labelMr : opt.labelEn}
                </button>
              ))}
            </div>

          </div>

          {/* Secondary Filter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-amber-700/30">
            
            {/* Height Filter */}
            <div>
              <label className="block text-[11px] text-amber-300/80 mb-1 font-medium">
                {isMr ? 'मूर्तीची उंची (Height):' : 'Height:'}
              </label>
              <select
                value={filters.height}
                onChange={(e) => setFilters({ ...filters, height: e.target.value })}
                className="w-full bg-amber-900/50 text-amber-100 text-xs rounded-lg px-3 py-2 border border-amber-600/40 focus:outline-none"
              >
                <option value="All">{isMr ? 'सर्व उंची (All)' : 'All Heights'}</option>
                <option value="small">{isMr ? '1.5 फुटांपर्यंत' : 'Up to 1.5 ft'}</option>
                <option value="medium">{isMr ? '1.5 ते 2.5 फूट' : '1.5 - 2.5 ft'}</option>
                <option value="large">{isMr ? '3 फुटांपेक्षा मोठे' : '3 ft+'}</option>
              </select>
            </div>

            {/* Material Filter */}
            <div>
              <label className="block text-[11px] text-amber-300/80 mb-1 font-medium">
                {isMr ? 'मटेरियल (Material):' : 'Material:'}
              </label>
              <select
                value={filters.material}
                onChange={(e) => setFilters({ ...filters, material: e.target.value })}
                className="w-full bg-amber-900/50 text-amber-100 text-xs rounded-lg px-3 py-2 border border-amber-600/40 focus:outline-none"
              >
                <option value="All">{isMr ? 'सर्व प्रकार' : 'All Materials'}</option>
                <option value="Shadu">{isMr ? 'शाडू माती (इको-फ्रेंडली)' : 'Shadu Clay (Eco)'}</option>
                <option value="POP">POP</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-[11px] text-amber-300/80 mb-1 font-medium">
                {isMr ? 'प्रकार (Category):' : 'Category:'}
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full bg-amber-900/50 text-amber-100 text-xs rounded-lg px-3 py-2 border border-amber-600/40 focus:outline-none"
              >
                <option value="All">{isMr ? 'सर्व (Home/Office/Mandal)' : 'All Categories'}</option>
                <option value="Home">{isMr ? 'घरगुती पूजेसाठी' : 'Home Puja'}</option>
                <option value="Office">{isMr ? 'ऑफिस / दुकान' : 'Office & Shop'}</option>
                <option value="Mandal">{isMr ? 'सार्वजनिक मंडळ' : 'Mandal'}</option>
              </select>
            </div>

            {/* Reset Filters */}
            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    origin: 'All',
                    category: 'All',
                    material: 'All',
                    maxPrice: 100000,
                    height: 'All'
                  })
                }
                className="w-full bg-red-950/70 hover:bg-red-900 text-amber-200 text-xs font-semibold py-2 px-3 rounded-lg border border-red-700/50 transition"
              >
                {isMr ? 'फिल्टर रीसेट करा' : 'Reset Filters'}
              </button>
            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-amber-300">
          <p>
            {isMr
              ? `एकूण उपलब्ध मूर्ती: ${filteredIdols.length}`
              : `Showing ${filteredIdols.length} idols available`}
          </p>
          <span className="text-amber-400/70 font-mono">
            {isMr ? 'आदित्य गणराज स्टॉल नाशिक' : 'Aditya Ganraj Stall Nashik'}
          </span>
        </div>

        {/* Product Cards Grid */}
        {filteredIdols.length === 0 ? (
          <div className="text-center py-16 bg-amber-950/40 rounded-2xl border border-amber-600/20">
            <div className="text-4xl mb-3">🕉️</div>
            <h3 className="text-xl font-bold text-amber-200">
              {isMr ? 'कोणतीही गणेश मूर्ती सापडली नाही' : 'No idols match your search criteria'}
            </h3>
            <p className="text-amber-300/70 text-sm mt-1">
              {isMr ? 'कृपया सर्च शब्द बदलून किंवा फिल्टर रीसेट करून पुन्हा प्रयत्न करा.' : 'Try adjusting your search terms or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdols.map((idol) => (
              <div
                key={idol.id}
                className="bg-amber-950/90 rounded-2xl overflow-hidden border border-amber-600/30 shadow-xl hover:border-amber-400/60 transition duration-300 flex flex-col group"
              >
                {/* Image & Status Badge */}
                <div className="relative aspect-square overflow-hidden bg-amber-950">
                  <img
                    src={idol.image}
                    alt={isMr ? idol.nameMr : idol.nameEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  
                  {/* Origin Badge */}
                  <div className="absolute top-3 left-3 bg-red-700/90 text-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-500/50 shadow">
                    {idol.origin === 'Pen' ? (isMr ? 'पेन मूळ मूर्ती' : 'Pen Idol') : (isMr ? 'नगर विशेष' : 'Ahmednagar')}
                  </div>

                  {/* Code Badge */}
                  <div className="absolute top-3 right-3 bg-amber-950/80 text-yellow-300 font-mono text-xs font-extrabold px-2.5 py-0.5 rounded border border-amber-500/40">
                    {idol.id}
                  </div>

                  {/* Height Overlay */}
                  <div className="absolute bottom-3 left-3 bg-amber-950/80 text-amber-200 text-xs px-2 py-0.5 rounded border border-amber-600/40 font-semibold">
                    📏 {idol.heightFeet} {isMr ? 'फूट उंची' : 'ft Height'}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
                      <span>{idol.stallNo}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {isMr ? 'बुकिंग उपलब्ध' : 'Available'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-amber-100 group-hover:text-yellow-300 transition leading-snug">
                      {isMr ? idol.nameMr : idol.nameEn}
                    </h3>

                    <p className="text-xs text-amber-200/70 line-clamp-2 leading-relaxed">
                      {isMr ? idol.descriptionMr : idol.descriptionEn}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    <span className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700/40">
                      {idol.material}
                    </span>
                    <span className="bg-amber-900/60 text-amber-200 px-2 py-0.5 rounded border border-amber-700/40">
                      {idol.colorScheme}
                    </span>
                  </div>

                  {/* Booking Action without prices */}
                  <div className="pt-3 border-t border-amber-700/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-amber-300 font-semibold block">
                        {isMr ? 'बुकिंग स्टेटस:' : 'Booking Status:'}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">
                        {isMr ? 'टोकन देऊन बुक करा' : 'Reserve with Token'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectIdol(idol)}
                        className="p-2 bg-amber-900/50 hover:bg-amber-800 text-amber-200 rounded-lg border border-amber-600/40 transition"
                        title={isMr ? 'तपशील पहा' : 'View Details'}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onBookIdol(idol)}
                        className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-amber-950 font-extrabold px-3.5 py-2 rounded-lg text-xs shadow-md transition transform active:scale-95"
                      >
                        <span>{isMr ? 'आताच बुक करा' : 'Book Now'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
