import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { ShoppingBasket, X, Minus, Plus, Trash2, Banknote, CreditCard, Tag, CheckCircle2 } from 'lucide-react';

interface ShoppingBasketDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckoutCash: () => void;
  onCheckoutTab: () => void;
  appliedCoupon: string | null;
  discountPercent: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const ShoppingBasketDrawer: React.FC<ShoppingBasketDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutCash,
  onCheckoutTab,
  appliedCoupon,
  discountPercent,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  const [couponInput, setCouponInput] = React.useState('');
  const [couponError, setCouponError] = React.useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const serviceFee = subtotal > 0 ? 1.50 : 0;
  const estimatedTotal = Math.max(0, subtotal - discountAmount + serviceFee);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim());
    if (success) {
      setCouponInput('');
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try FRESH25 or FRESH30!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xs"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white dark:bg-[#1e293b] h-full shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#bccac0]/40 dark:border-slate-800 flex items-center justify-between bg-[#faf8ff] dark:bg-[#0f172a]">
              <div className="flex items-center gap-3">
                <ShoppingBasket className="w-6 h-6 text-[#006948] dark:text-[#68dba9]" />
                <h2 className="text-lg font-bold text-[#131b2e] dark:text-white">Your Shopping Basket</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
                  <ShoppingBasket className="w-16 h-16 mb-4 stroke-1 opacity-40" />
                  <p className="font-semibold text-base text-slate-700 dark:text-slate-300">Your basket is empty</p>
                  <p className="text-xs mt-1">Explore our fresh store products and add items to your cart.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 group items-center bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-slate-200 dark:border-slate-700">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback placeholder image if hotlink is restricted
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-20 py-0.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-sm text-[#131b2e] dark:text-white line-clamp-1">{item.product.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.product.unit}</p>
                        </div>
                        <span className="font-bold text-sm text-[#006948] dark:text-[#68dba9]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center bg-white dark:bg-slate-700 rounded-lg p-1 border border-slate-200 dark:border-slate-600 gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-[#131b2e] dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Coupon Section */}
            {cartItems.length > 0 && (
              <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 p-2.5 rounded-lg text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Code <strong>{appliedCoupon}</strong> ({discountPercent}% OFF) applied!</span>
                    </div>
                    <button onClick={onRemoveCoupon} className="text-rose-600 dark:text-rose-400 font-bold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCouponSubmit} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Promo code (e.g. FRESH25)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#006948]"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#006948] text-white text-xs font-semibold rounded-lg hover:bg-[#00855d] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}
                  </form>
                )}
              </div>
            )}

            {/* Drawer Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-[#f2f3ff] dark:bg-[#0f172a] border-t border-[#bccac0]/40 dark:border-slate-800 space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-base text-[#131b2e] dark:text-white">
                    <span>Estimated Total</span>
                    <span className="text-[#006948] dark:text-[#68dba9]">${estimatedTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Actions */}
                <div className="space-y-2 pt-2">
                  <button
                    onClick={onCheckoutCash}
                    className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Banknote className="w-5 h-5" />
                    Pay Cash at Counter
                  </button>
                  <button
                    onClick={onCheckoutTab}
                    className="w-full h-12 bg-[#283044] hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <CreditCard className="w-5 h-5 text-[#ffb77d]" />
                    Pay on Store Tab (Credit Ledger)
                  </button>
                </div>
                <p className="text-center text-[10px] text-slate-500 dark:text-slate-400">
                  Pricing includes local taxes and community service fees.
                </p>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
