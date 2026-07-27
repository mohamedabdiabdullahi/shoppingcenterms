import React, { useState } from 'react';
import { WishlistItem } from '../types';
import { PlusCircle, TrendingUp, ChevronUp, CheckCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface WishlistViewProps {
  wishlistItems: WishlistItem[];
  onToggleVote: (id: string) => void;
  onOpenRequestModal: () => void;
  onNavigateToProduct?: (title: string) => void;
}

export const WishlistView: React.FC<WishlistViewProps> = ({
  wishlistItems,
  onToggleVote,
  onOpenRequestModal,
  onNavigateToProduct
}) => {
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter & Sort logic
  const filtered = wishlistItems.filter((item) => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return b.votes - a.votes;
    return a.id.localeCompare(b.id); // placeholder for date sorting
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Community Wishlist Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl mb-8 min-h-[260px] flex items-center shadow-md">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvf_AaZ8jQiyTGHlMAFfPd86oZMDp5_KKm39SsARrGKWJIMpxlviNye5QgqmBbkwqGtvlAXgCnVauOWcnv20AiN6bOGH8p5OFt3kt7gUUV-QDP1HRL9pJNIYma6jQZB1pKh_oLz-X4Dr4qjDz2K2_1mzWt5MS4oIQlF_AxzyPh2sozcaT2RbvNSu4NiGHuhZ5enJpDoG2k2ekPDM1YyEjVrVm4HuaDefT1uA-vBYbCXeDDJdqtVY1kNyVX7SFyfWX3GsYLGOcygjFW')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#006948]/95 via-[#006948]/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 md:p-10 flex flex-col items-start gap-4 max-w-2xl text-white">
          <h1 className="font-extrabold text-3xl md:text-5xl tracking-tight leading-tight">
            Community Wishlist
          </h1>
          <p className="text-sm md:text-base text-white/90">
            Help us stock your favorites! Request items and vote on community needs. We listen to what you want to see on our shelves.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-2">
            <button
              onClick={onOpenRequestModal}
              className="flex items-center gap-2 bg-white text-[#006948] px-5 py-2.5 rounded-full text-xs md:text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Request New Product
            </button>

            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00855d]/40 backdrop-blur-md rounded-full border border-white/20 text-white font-medium text-xs">
              <TrendingUp className="w-4 h-4 text-[#68dba9]" />
              <span>84 requests this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Board Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#131b2e] dark:text-white">
            Community Requests
          </h2>
          <p className="text-xs text-[#3d4a42] dark:text-slate-400">
            Voted by neighbors, sourced by us.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Popular / Recent toggle */}
          <div className="flex bg-[#eaedff] dark:bg-slate-800 rounded-xl p-1 border border-[#bccac0]/40 dark:border-slate-700 text-xs font-semibold">
            <button
              onClick={() => setSortBy('popular')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sortBy === 'popular'
                  ? 'bg-white dark:bg-slate-900 text-[#006948] dark:text-[#68dba9] shadow-xs'
                  : 'text-[#3d4a42] dark:text-slate-400 hover:text-[#006948]'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                sortBy === 'recent'
                  ? 'bg-white dark:bg-slate-900 text-[#006948] dark:text-[#68dba9] shadow-xs'
                  : 'text-[#3d4a42] dark:text-slate-400 hover:text-[#006948]'
              }`}
            >
              Recent
            </button>
          </div>

          {/* Status filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none bg-white dark:bg-[#1e293b] border border-[#bccac0]/60 dark:border-slate-700 text-[#131b2e] dark:text-slate-200 text-xs font-semibold px-3 py-2 pr-8 rounded-xl shadow-xs focus:outline-none focus:ring-1 focus:ring-[#006948]"
            >
              <option value="All">All Statuses</option>
              <option value="Ordered - Arriving Soon">Ordered</option>
              <option value="In Sourcing">In Sourcing</option>
              <option value="Under Review">Under Review</option>
              <option value="In Stock!">In Stock!</option>
            </select>
            <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Request Board List */}
      <div className="grid grid-cols-1 gap-4">
        {sorted.map((item) => {
          const isInStock = item.status === 'In Stock!';
          const isOrdered = item.status === 'Ordered - Arriving Soon';
          const isSourcing = item.status === 'In Sourcing';

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className={`wishlist-card flex flex-col sm:flex-row items-start sm:items-center bg-white dark:bg-[#1e293b] border p-4 md:p-5 rounded-2xl gap-4 md:gap-6 ${
                isInStock
                  ? 'border-[#006948]/30 bg-[#006948]/5 dark:bg-emerald-950/20'
                  : 'border-[#bccac0]/40 dark:border-slate-800'
              }`}
            >
              {/* Vote Count Column */}
              <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-1 min-w-[64px] w-full sm:w-auto bg-[#e2e7ff] dark:bg-slate-800 rounded-xl py-2 px-3 border border-[#bccac0]/20 dark:border-slate-700">
                {isInStock ? (
                  <CheckCircle className="w-6 h-6 text-[#006948] dark:text-[#68dba9]" />
                ) : (
                  <button
                    onClick={() => onToggleVote(item.id)}
                    className={`p-1 rounded-md transition-all ${
                      item.votedByUser
                        ? 'text-[#006948] dark:text-[#68dba9] bg-emerald-100 dark:bg-emerald-950/60 scale-110'
                        : 'text-slate-500 hover:text-[#006948] hover:scale-110'
                    }`}
                    title={item.votedByUser ? 'Remove Vote' : 'Upvote Request'}
                  >
                    <ChevronUp className="w-6 h-6 stroke-[3]" />
                  </button>
                )}

                <span className={`font-bold text-base md:text-lg ${
                  isInStock ? 'text-[#006948] dark:text-[#68dba9]' : 'text-[#131b2e] dark:text-white'
                }`}>
                  {isInStock ? 'Done' : item.votes}
                </span>
              </div>

              {/* Title & Metadata */}
              <div className="flex-1 flex flex-col gap-1">
                <h3 className={`font-bold text-base md:text-lg ${
                  isInStock
                    ? 'line-through text-slate-500 dark:text-slate-400'
                    : 'text-[#131b2e] dark:text-white'
                }`}>
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Requested by {item.requestedBy}</span>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
                  <span className="italic">{item.timeAgo}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col items-start sm:items-end gap-1 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                {isOrdered && (
                  <div className="text-right">
                    <span className="px-3 py-1 bg-[#fe932c]/20 text-[#663500] dark:bg-amber-950/60 dark:text-amber-300 rounded-full font-bold text-xs whitespace-nowrap">
                      Ordered - Arriving Soon
                    </span>
                    {item.estimatedDelivery && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.estimatedDelivery}</p>
                    )}
                  </div>
                )}

                {isSourcing && (
                  <span className="px-3 py-1 bg-[#00855d]/15 text-[#006948] dark:bg-emerald-950/60 dark:text-emerald-300 rounded-full font-bold text-xs whitespace-nowrap">
                    In Sourcing
                  </span>
                )}

                {item.status === 'Under Review' && (
                  <span className="px-3 py-1 bg-[#dae2fd] text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full font-bold text-xs whitespace-nowrap">
                    Under Review
                  </span>
                )}

                {isInStock && (
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <span className="px-3 py-1 bg-[#006948] text-white rounded-full font-bold text-xs whitespace-nowrap shadow-xs">
                      In Stock!
                    </span>
                    <button
                      onClick={() => onNavigateToProduct?.(item.title)}
                      className="text-xs text-[#006948] dark:text-[#68dba9] font-bold hover:underline"
                    >
                      View in Store
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-3 pt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="p-2 rounded-full border border-[#bccac0]/40 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                currentPage === page
                  ? 'bg-[#006948] text-white shadow-sm'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
          className="p-2 rounded-full border border-[#bccac0]/40 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
