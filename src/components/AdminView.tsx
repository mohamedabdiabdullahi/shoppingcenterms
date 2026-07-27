import React, { useState } from 'react';
import { ProductItem, WishlistItem } from '../types';
import { ShieldAlert, Plus, CheckCircle, PackageCheck, Megaphone, Receipt } from 'lucide-react';

interface AdminViewProps {
  products: ProductItem[];
  wishlistItems: WishlistItem[];
  onAddProduct: (product: Omit<ProductItem, 'id'>) => void;
  onUpdateWishlistStatus: (id: string, newStatus: WishlistItem['status']) => void;
  onOpenRecordModal: () => void;
  onOpenPostAdModal: () => void;
  onOpenRequestModal: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  wishlistItems,
  onAddProduct,
  onUpdateWishlistStatus,
  onOpenRecordModal,
  onOpenPostAdModal,
  onOpenRequestModal
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'requests'>('requests');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductItem['category']>('Foodstuff');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdUnit, setNewProdUnit] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImage, setNewProdImage] = useState('');
  const [showAddProdForm, setShowAddProdForm] = useState(false);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    onAddProduct({
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice) || 0,
      unit: newProdUnit || 'unit',
      description: newProdDesc || 'Fresh local product sourced for store inventory.',
      image: newProdImage || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      badges: ['In Stock', newProdCategory],
      inStock: true
    });

    setNewProdName('');
    setNewProdPrice('');
    setNewProdUnit('');
    setNewProdDesc('');
    setNewProdImage('');
    setShowAddProdForm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Banner */}
      <div className="bg-[#ba0035] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 rounded-xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-extrabold text-2xl">Store Admin Management</h1>
            <p className="text-xs text-rose-100 mt-0.5">
              Control store inventory, fulfill customer wishlist requests, post ads, and reconcile tab ledgers.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenRecordModal}
            className="px-4 py-2 bg-white text-[#ba0035] rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <Receipt className="w-4 h-4" />
            Record Transaction
          </button>
          <button
            onClick={onOpenPostAdModal}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Megaphone className="w-4 h-4" />
            Post Advert
          </button>
        </div>
      </div>

      {/* Admin Sub-tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 font-bold text-sm">
        <button
          onClick={() => setActiveTab('requests')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'requests'
              ? 'text-[#006948] dark:text-[#68dba9]'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Customer Wishlist Moderation ({wishlistItems.length})
          {activeTab === 'requests' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006948]" />}
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'inventory'
              ? 'text-[#006948] dark:text-[#68dba9]'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Inventory & Stock ({products.length})
          {activeTab === 'inventory' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006948]" />}
        </button>
      </div>

      {/* Wishlist Status Admin Management */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Update Request Fulfillment Status
            </h3>
            <button
              onClick={onOpenRequestModal}
              className="text-xs text-[#006948] font-bold underline"
            >
              + Create Test Request
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1e293b] p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500">
                    Requested by {item.requestedBy} • {item.votes} votes
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="text-xs font-semibold text-slate-500">Change Status:</span>
                  <select
                    value={item.status}
                    onChange={(e) => onUpdateWishlistStatus(item.id, e.target.value as WishlistItem['status'])}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="In Sourcing">In Sourcing</option>
                    <option value="Ordered - Arriving Soon">Ordered - Arriving Soon</option>
                    <option value="In Stock!">In Stock!</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
              Current Store Products Catalog
            </h3>
            <button
              onClick={() => setShowAddProdForm(!showAddProdForm)}
              className="bg-[#006948] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              {showAddProdForm ? 'Cancel Form' : 'Add New Product'}
            </button>
          </div>

          {/* Add Product Form */}
          {showAddProdForm && (
            <form onSubmit={handleCreateProduct} className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Add New Product to Store Catalog</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Avocados"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as ProductItem['category'])}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  >
                    <option value="Foodstuff">Foodstuff</option>
                    <option value="Home Goods">Home Goods</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Pantry">Pantry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 4.99"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Unit / Weight</label>
                  <input
                    type="text"
                    placeholder="e.g. 1kg pack or 500g"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Brief description of item freshness and sourcing..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-semibold mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-[#006948] text-white font-bold text-xs rounded-lg hover:bg-[#00855d]"
              >
                Save Product
              </button>
            </form>
          )}

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white dark:bg-[#1e293b] p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-3 items-center">
                <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">{p.name}</h4>
                  <p className="text-[11px] text-slate-500">${p.price.toFixed(2)} / {p.unit}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded-full">
                    In Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
