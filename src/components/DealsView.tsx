import React, { useState } from 'react';
import { Advertisement } from '../types';
import { 
  Megaphone, 
  Copy, 
  Check, 
  Calendar, 
  Timer, 
  Package, 
  Home, 
  Milk, 
  Coffee,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'motion/react';

interface DealsViewProps {
  ads: Advertisement[];
  onOpenPostAdModal: () => void;
  onApplyCouponCode: (code: string) => void;
  onNavigateToCatalog: () => void;
}

export const DealsView: React.FC<DealsViewProps> = ({
  ads,
  onOpenPostAdModal,
  onApplyCouponCode,
  onNavigateToCatalog
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All Ads');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filters = ['All Ads', 'New Arrivals', 'Flash Sales', 'Bulk Deals', 'Home Essentials'];

  const filteredAds = ads.filter((ad) => {
    if (selectedFilter === 'All Ads') return true;
    return ad.category === selectedFilter;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    onApplyCouponCode(code);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryIcon = (badge: string) => {
    if (badge.includes('ARRIVAL')) return <Sparkles className="w-4 h-4 text-amber-500" />;
    if (badge.includes('FLASH')) return <Timer className="w-4 h-4 text-rose-500" />;
    if (badge.includes('BULK')) return <Package className="w-4 h-4 text-emerald-500" />;
    if (badge.includes('HOME')) return <Home className="w-4 h-4 text-amber-600" />;
    if (badge.includes('DAIRY')) return <Milk className="w-4 h-4 text-emerald-600" />;
    return <Coffee className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Promotional Banner */}
      <section className="relative rounded-3xl overflow-hidden mb-8 h-[360px] md:h-[400px] flex items-center bg-[#006948] shadow-md">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#006948] via-[#006948]/80 to-transparent z-10" />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyuEs4FvohGGH3hjSVY1TK3jATs5BbeQIuRf6ozT2fM93S5wdslGgAHx6ywvTBuX8xo-aJW6druafVp5SppyyCsBO19ELXAy5mkET47za1gIrOYwwXvFjS_2Rd8jEoY-4-18Fh9KkUIYj-alxJcHG2qW6V6S_ZFXbvjhUGvmWy8J8KPCxMgW5BFFPT77-zg6v47vjQO3U6WTcz8b5xjTZeHs6WemZgizUBCYUKxsEMTfU-lYF-VVHUdg6Gy0HpkWOQIvqtKUvNSEdc"
            alt="Fresh produce hero banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 px-6 md:px-12 max-w-2xl text-white">
          <span className="inline-block px-3.5 py-1 bg-[#fe932c] text-slate-950 font-extrabold text-xs rounded-full mb-3 uppercase tracking-wider">
            Season's Best
          </span>
          <h1 className="font-black text-3xl md:text-5xl mb-3 leading-tight tracking-tight">
            Fresh Harvest, <br />Delivered Daily.
          </h1>
          <p className="text-white/90 text-sm md:text-base mb-6 font-medium">
            Discover our latest arrivals from local farms. Quality you can taste, prices you'll love.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onNavigateToCatalog}
              className="bg-white text-[#006948] px-6 py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-[#85f8c4] transition-colors shadow-sm"
            >
              Shop Now
            </button>
            <button
              onClick={() => setSelectedFilter('Flash Sales')}
              className="border border-white text-white px-6 py-3 rounded-xl font-bold text-xs md:text-sm hover:bg-white/10 transition-colors"
            >
              View Flash Sales
            </button>
          </div>
        </div>
      </section>

      {/* Manager Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#131b2e] dark:text-white">
            Advertisements & New Arrivals
          </h2>
          <p className="text-xs text-[#3d4a42] dark:text-slate-400">
            Manage and explore current grocery promotions & discount vouchers.
          </p>
        </div>

        <button
          onClick={onOpenPostAdModal}
          className="flex items-center gap-2 bg-[#006948] hover:bg-[#00855d] text-white px-5 py-3 rounded-xl font-bold text-xs md:text-sm shadow-sm hover:scale-105 transition-all"
        >
          <Megaphone className="w-4 h-4" />
          Post New Advert
        </button>
      </div>

      {/* Filter Pill Row */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-[#006948] text-white shadow-xs'
                  : 'bg-[#e2e7ff]/70 dark:bg-slate-800 text-[#3d4a42] dark:text-slate-300 hover:bg-[#006948]/10'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Promotional Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAds.map((ad) => {
          const isCopied = copiedId === ad.id;
          return (
            <motion.div
              key={ad.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-[#1e293b] rounded-2xl border border-[#bccac0]/50 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Card Image Header */}
              <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  ad.badgeColor === 'tertiary'
                    ? 'bg-[#ba0035] text-white'
                    : ad.badgeColor === 'secondary'
                    ? 'bg-[#fe932c] text-slate-950'
                    : 'bg-[#006948] text-white'
                }`}>
                  {ad.badge}
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                    {getCategoryIcon(ad.badge)}
                    <span>{ad.timeframe}</span>
                  </div>

                  <h3 className="font-bold text-base md:text-lg text-[#131b2e] dark:text-white mb-2">
                    {ad.title}
                  </h3>

                  <p className="text-xs text-[#3d4a42] dark:text-slate-300 leading-relaxed">
                    {ad.description}
                  </p>
                </div>

                {/* Coupon Box */}
                <div className="dashed-border p-3.5 flex items-center justify-between bg-[#ffdcc3]/20 dark:bg-amber-950/20 rounded-xl">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#6e3900] dark:text-amber-300">
                      Discount Voucher
                    </p>
                    <p className="font-black text-lg text-[#904d00] dark:text-amber-400 tracking-wider">
                      {ad.discountCode}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(ad.id, ad.discountCode)}
                      className="p-2 bg-[#904d00] hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                      title="Copy & Apply Code"
                    >
                      {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        onApplyCouponCode(ad.discountCode);
                        onNavigateToCatalog();
                      }}
                      className="p-2 bg-[#006948] hover:bg-[#00855d] text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-bold"
                      title="Use in Store"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
