import React, { useState } from 'react';
import { WishlistItem, LedgerTransaction, Advertisement, UserProfile } from '../types';
import { X, Plus, Receipt, Megaphone, User, Store, MapPin, Truck, ShieldCheck, FileText, Headphones, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Request Product Modal
interface RequestProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (item: Omit<WishlistItem, 'id' | 'votes' | 'votedByUser'>) => void;
}

export const RequestProductModal: React.FC<RequestProductModalProps> = ({ isOpen, onClose, onSubmitRequest }) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !name.trim()) return;
    onSubmitRequest({
      title: title.trim(),
      requestedBy: name.trim(),
      timeAgo: 'Just now',
      status: 'Under Review'
    });
    setTitle('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Request New Product</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Product Name / Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Almond Milk or Jasmine Rice"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006948] hover:bg-[#00855d] text-white font-bold rounded-xl text-sm transition-all"
          >
            Submit Wishlist Request
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Record Transaction Modal
interface RecordTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitTransaction: (tx: Omit<LedgerTransaction, 'id' | 'date'>) => void;
}

export const RecordTransactionModal: React.FC<RecordTransactionModalProps> = ({ isOpen, onClose, onSubmitTransaction }) => {
  const [customerName, setCustomerName] = useState('');
  const [breakdown, setBreakdown] = useState('');
  const [type, setType] = useState<'Store Credit +' | 'Cash Payment -'>('Store Credit +');
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !amount) return;
    onSubmitTransaction({
      customerName: customerName.trim(),
      breakdown: breakdown.trim() || 'General store tab update',
      type,
      amount: parseFloat(amount) || 0,
      currency: '₦',
      status: 'Completed'
    });
    setCustomerName('');
    setBreakdown('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#006948]" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Record Ledger Entry</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Customer Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. John Smith"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Transaction Type *</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold"
            >
              <option value="Store Credit +">Store Credit + (Tab Addition)</option>
              <option value="Cash Payment -">Cash Payment - (Tab Clearance)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Amount (₦) *</label>
            <input
              type="number"
              required
              placeholder="e.g. 15000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Purchase / Payment Breakdown</label>
            <input
              type="text"
              placeholder="e.g. Rice, Oil, Flour bundle or Cash payment"
              value={breakdown}
              onChange={(e) => setBreakdown(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006948] hover:bg-[#00855d] text-white font-bold rounded-xl text-sm transition-all"
          >
            Save Transaction
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// Post Advert Modal
interface PostAdvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAdvert: (ad: Omit<Advertisement, 'id'>) => void;
}

export const PostAdvertModal: React.FC<PostAdvertModalProps> = ({ isOpen, onClose, onSubmitAdvert }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('New Arrivals');
  const [badge, setBadge] = useState('SPECIAL PROMO');
  const [timeframe, setTimeframe] = useState('This Week Only');
  const [discountCode, setDiscountCode] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !discountCode.trim()) return;
    onSubmitAdvert({
      title: title.trim(),
      category,
      badge: badge.toUpperCase(),
      badgeColor: category === 'Flash Sales' ? 'tertiary' : category === 'Bulk Deals' ? 'primary' : 'secondary',
      timeframe,
      description: description || 'Special community offer from Fresh & Home Central.',
      discountCode: discountCode.trim().toUpperCase(),
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
    });
    setTitle('');
    setDiscountCode('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[#006948]" />
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Post New Promotion Advert</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs md:text-sm">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Promotion Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Fresh Mango Fest - 20% Off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              >
                <option value="New Arrivals">New Arrivals</option>
                <option value="Flash Sales">Flash Sales</option>
                <option value="Bulk Deals">Bulk Deals</option>
                <option value="Home Essentials">Home Essentials</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Discount Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. MANGO20"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono uppercase font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Validity / Timeframe</label>
            <input
              type="text"
              placeholder="e.g. Oct 25 - Nov 2"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">Description</label>
            <textarea
              rows={2}
              placeholder="Describe the offer details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006948] hover:bg-[#00855d] text-white font-bold rounded-xl text-sm transition-all"
          >
            Publish Advert
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// User Profile Modal
interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, profile }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800 space-y-5"
      >
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#006948] text-white flex items-center justify-center font-bold text-lg">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{profile.name}</h3>
              <p className="text-xs text-slate-500">{profile.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Store Credit Tab</span>
            <div className="font-extrabold text-lg text-[#006948] dark:text-[#68dba9] mt-0.5">
              ₦{profile.currentTabDebt.toLocaleString()}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Reward Points</span>
            <div className="font-extrabold text-lg text-[#904d00] dark:text-amber-400 mt-0.5">
              {profile.rewardPoints} pts
            </div>
          </div>
        </div>

        <div className="text-xs space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
          <div className="flex justify-between">
            <span className="font-semibold">Phone:</span>
            <span>{profile.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Default Delivery:</span>
            <span>Central Community Zone A</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Generic Info Modal (Store Locations, Delivery Info, Privacy, Terms, Contact)
interface InfoModalProps {
  type: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'locations':
        return {
          title: 'Store Locations',
          icon: <MapPin className="w-6 h-6 text-[#006948]" />,
          body: (
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="font-bold text-slate-900 dark:text-white">Fresh & Home Central Main Hub</p>
                <p className="mt-1">12 Market Street, Community Central Hub</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold mt-1">Open Daily: 7:00 AM – 9:00 PM</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="font-bold text-slate-900 dark:text-white">Fresh Express Counter</p>
                <p className="mt-1">45 North Plaza, Station Road</p>
                <p className="text-emerald-700 dark:text-emerald-400 font-semibold mt-1">Open Daily: 8:00 AM – 8:00 PM</p>
              </div>
            </div>
          )
        };
      case 'delivery':
        return {
          title: 'Delivery Information',
          icon: <Truck className="w-6 h-6 text-[#006948]" />,
          body: (
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p>• <strong>Same-Day Delivery:</strong> Orders placed before 11 AM are delivered by 5 PM.</p>
              <p>• <strong>Free Local Delivery:</strong> On all orders over ₦20,000 or $30.</p>
              <p>• <strong>Eco-Friendly Packaging:</strong> Recyclable boxes and reusable cotton bags used exclusively.</p>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <ShieldCheck className="w-6 h-6 text-[#006948]" />,
          body: (
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fresh & Home Central respects community privacy. Your store credit records and contact details are strictly confidential and used solely for local store tab management and order notifications.
            </p>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="w-6 h-6 text-[#006948]" />,
          body: (
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Store credit tabs are issued to verified community members and are expected to be reconciled monthly. Wishlist items are sourced subject to seasonal agricultural availability.
            </p>
          )
        };
      case 'support':
      default:
        return {
          title: 'Contact Store Support',
          icon: <Headphones className="w-6 h-6 text-[#006948]" />,
          body: (
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Hotline:</strong> +234 802 345 6789</p>
              <p><strong>Email:</strong> support@freshhomecentral.org</p>
              <p><strong>Store Manager Desk:</strong> Available daily at the main counter from 8 AM to 6 PM.</p>
            </div>
          )
        };
    }
  };

  const content = getContent();

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white dark:bg-[#1e293b] w-full max-w-md p-6 rounded-2xl shadow-2xl z-10 border border-slate-200 dark:border-slate-800 space-y-4"
      >
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            {content.icon}
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{content.title}</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{content.body}</div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};
