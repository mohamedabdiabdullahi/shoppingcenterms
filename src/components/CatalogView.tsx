import React, { useState } from 'react';
import { ProductItem } from '../types';
import { Search, Plus, Truck, Award, ShoppingBasket, Copy, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CatalogViewProps {
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
  cartTotal: number;
  cartCount: number;
  onOpenCart: () => void;
  onApplyCouponCode: (code: string) => void;
  onNavigateToDeals: () => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  onAddToCart,
  cartTotal,
  cartCount,
  onOpenCart,
  onApplyCouponCode,
  onNavigateToDeals
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [copiedCode, setCopiedCode] = useState(false);

  const categories = ['All Items', 'Foodstuff', 'Home Goods', 'Cleaning', 'Dairy', 'Proteins', 'Pantry'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All Items' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    onApplyCouponCode(code);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      
      {/* Hero Announcement Banner */}
      <section className="rounded-2xl overflow-hidden relative group shadow-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[#006948] via-[#00855d] to-[#006948] opacity-95" />
        {/* Decorative Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        <div className="relative px-6 py-8 md:px-10 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[220px]">
          <div className="flex flex-col gap-2 text-white text-center md:text-left">
            <span className="inline-flex w-fit mx-auto md:mx-0 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full font-bold text-[10px] tracking-wider uppercase">
              SPECIAL PROMO
            </span>
            <h1 className="font-extrabold text-2xl md:text-4xl lg:text-5xl max-w-xl leading-tight">
              Get 25% Off Fresh Veggies
            </h1>
            <p className="text-white/90 text-sm md:text-base max-w-md">
              Sourced daily from local organic farmers. Freshness guaranteed for all community orders.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-xl flex flex-col items-center shadow-lg transform group-hover:scale-105 transition-transform text-center border border-emerald-100 dark:border-slate-800">
              <span className="text-[#006948] dark:text-[#68dba9] text-[10px] font-bold uppercase tracking-widest mb-1">
                Discount Code
              </span>
              <span className="text-[#00855d] dark:text-[#68dba9] font-black text-xl md:text-2xl select-all">
                FRESH25
              </span>
            </div>
            <button
              onClick={() => handleCopyCode('FRESH25')}
              className="bg-[#fe932c] hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-xs md:text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
            >
              {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedCode ? 'Applied Code!' : 'Redeem Now'}
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search for fresh produce, home essentials, pantry staples..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#bccac0]/60 dark:border-slate-700 bg-white dark:bg-[#1e293b] text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-[#006948] focus:outline-none transition-all text-sm shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-[#006948] text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-[#bccac0]/40 dark:border-slate-700 text-[#3d4a42] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#131b2e] dark:text-white">Product Catalog</h2>
            <p className="text-xs md:text-sm text-[#3d4a42] dark:text-slate-400">
              Fresh arrivals and household essentials updated daily.
            </p>
          </div>
          <button 
            onClick={onNavigateToDeals}
            className="text-xs font-bold text-[#006948] dark:text-[#68dba9] hover:underline flex items-center gap-1"
          >
            View Special Deals <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#1e293b] rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              No products found matching "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Items');
              }}
              className="mt-3 text-xs font-bold text-[#006948] dark:text-[#68dba9] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#1e293b] border border-[#bccac0]/50 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Product Image Box */}
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full shadow-xs ${
                          badge === 'Flash Deal' || badge === 'Top Pick'
                            ? 'bg-[#fe932c] text-slate-950'
                            : badge === 'Organic' || badge === 'Fresh Daily'
                            ? 'bg-[#00855d] text-white'
                            : 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 flex flex-col gap-2 flex-grow justify-between">
                  <div>
                    <h3 className="font-bold text-base text-[#131b2e] dark:text-white line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#3d4a42] dark:text-slate-400 line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-base text-[#006948] dark:text-[#68dba9]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">
                        / {product.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-9 h-9 bg-[#006948] hover:bg-[#00855d] text-white rounded-lg flex items-center justify-center active:scale-90 transition-transform shadow-xs"
                      title="Add to Basket"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Delivery & Member Club Callout Banners */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="bg-[#006948]/10 dark:bg-emerald-950/30 border border-[#006948]/20 dark:border-emerald-800/40 rounded-2xl p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#006948] text-white rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#131b2e] dark:text-white">Same-Day Doorstep Delivery</h4>
              <p className="text-xs text-[#3d4a42] dark:text-slate-300">Order before 11 AM for same-day delivery across the neighborhood.</p>
            </div>
          </div>
          <button 
            onClick={() => alert('Delivery covers all neighborhood zones within 10km of Fresh & Home Central.')}
            className="text-xs font-bold text-[#006948] dark:text-[#68dba9] flex items-center gap-1 hover:underline"
          >
            Check delivery areas <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#fe932c]/10 dark:bg-amber-950/30 border border-[#fe932c]/30 dark:border-amber-800/40 rounded-2xl p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#fe932c] text-slate-950 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-[#131b2e] dark:text-white">Join Community Rewards Club</h4>
              <p className="text-xs text-[#3d4a42] dark:text-slate-300">Earn points on every purchase and unlock exclusive member discounts.</p>
            </div>
          </div>
          <button 
            onClick={() => alert('You are automatically enrolled in Fresh & Home Central Rewards!')}
            className="text-xs font-bold text-[#904d00] dark:text-amber-400 flex items-center gap-1 hover:underline"
          >
            Sign up for free <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Persistent Floating Shopping Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4">
          <div className="bg-white dark:bg-[#1e293b] border border-[#bccac0] dark:border-slate-700 p-3.5 rounded-2xl shadow-xl flex items-center gap-5">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Basket ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
              <span className="font-bold text-base text-[#006948] dark:text-[#68dba9]">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onOpenCart}
              className="bg-[#006948] hover:bg-[#00855d] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <ShoppingBasket className="w-4 h-4" />
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
