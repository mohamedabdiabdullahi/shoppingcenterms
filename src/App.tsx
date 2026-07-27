import React, { useState, useEffect } from 'react';
import { ActiveTab, ProductItem, CartItem, WishlistItem, LedgerTransaction, Advertisement, UserProfile } from './types';
import { 
  initialProducts, 
  initialWishlistItems, 
  initialLedgerTransactions, 
  initialAdvertisements, 
  initialUserProfile 
} from './data/initialData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ShoppingBasketDrawer } from './components/ShoppingBasketDrawer';
import { CatalogView } from './components/CatalogView';
import { WishlistView } from './components/WishlistView';
import { LedgerView } from './components/LedgerView';
import { DealsView } from './components/DealsView';
import { AdminView } from './components/AdminView';
import { 
  RequestProductModal, 
  RecordTransactionModal, 
  PostAdvertModal, 
  UserProfileModal, 
  InfoModal 
} from './components/Modals';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Data Collections
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(initialWishlistItems);
  const [ledger, setLedger] = useState<LedgerTransaction[]>(initialLedgerTransactions);
  const [ads, setAds] = useState<Advertisement[]>(initialAdvertisements);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  // Cart Drawer & Coupon State
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Modals
  const [requestModalOpen, setRequestModalOpen] = useState<boolean>(false);
  const [recordTxModalOpen, setRecordTxModalOpen] = useState<boolean>(false);
  const [postAdModalOpen, setPostAdModalOpen] = useState<boolean>(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState<boolean>(false);
  const [infoModalType, setInfoModalType] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Dark Mode side effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    showToast(`Added ${product.name} to your shopping basket.`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleApplyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FRESH25') {
      setAppliedCoupon('FRESH25');
      setDiscountPercent(25);
      showToast('Coupon FRESH25 applied! 25% discount activated.');
      return true;
    } else if (cleanCode === 'FRESH30') {
      setAppliedCoupon('FRESH30');
      setDiscountPercent(30);
      showToast('Coupon FRESH30 applied! 30% discount activated.');
      return true;
    } else if (cleanCode === 'HONEY10') {
      setAppliedCoupon('HONEY10');
      setDiscountPercent(10);
      showToast('Coupon HONEY10 applied! 10% discount activated.');
      return true;
    } else if (cleanCode === 'BULKBUY') {
      setAppliedCoupon('BULKBUY');
      setDiscountPercent(20);
      showToast('Coupon BULKBUY applied! 20% discount activated.');
      return true;
    } else {
      setAppliedCoupon(cleanCode);
      setDiscountPercent(15);
      showToast(`Promo code ${cleanCode} applied! 15% discount activated.`);
      return true;
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountPercent(0);
    showToast('Coupon removed.');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountedTotal = Math.max(0, cartTotal - (cartTotal * discountPercent) / 100 + (cart.length > 0 ? 1.5 : 0));

  const handleCheckoutCash = () => {
    showToast('Order confirmed! Please present your cash payment at the counter.');
    setCart([]);
    setIsCartOpen(false);
  };

  const handleCheckoutTab = () => {
    const amountInNaira = Math.round(discountedTotal * 1500); // converting for local currency representation
    const newTx: LedgerTransaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      date: 'Today, Just Now',
      customerName: userProfile.name,
      breakdown: cart.map(i => `${i.product.name} (x${i.quantity})`).join(', '),
      type: 'Store Credit +',
      amount: amountInNaira,
      currency: '₦',
      status: 'Completed'
    };

    setLedger([newTx, ...ledger]);
    setUserProfile(prev => ({
      ...prev,
      currentTabDebt: prev.currentTabDebt + amountInNaira,
      rewardPoints: prev.rewardPoints + Math.round(discountedTotal * 10)
    }));

    showToast(`Order placed on your store tab! Added ₦${amountInNaira.toLocaleString()} to credit ledger.`);
    setCart([]);
    setIsCartOpen(false);
  };

  // Wishlist operations
  const handleToggleVote = (id: string) => {
    setWishlist((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const wasVoted = item.votedByUser;
          return {
            ...item,
            votes: wasVoted ? item.votes - 1 : item.votes + 1,
            votedByUser: !wasVoted
          };
        }
        return item;
      })
    );
  };

  const handleCreateWishlistRequest = (item: Omit<WishlistItem, 'id' | 'votes' | 'votedByUser'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: `REQ-${Date.now()}`,
      votes: 1,
      votedByUser: true
    };
    setWishlist([newItem, ...wishlist]);
    showToast(`Request "${newItem.title}" published to Community Wishlist!`);
  };

  const handleUpdateWishlistStatus = (id: string, newStatus: WishlistItem['status']) => {
    setWishlist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast(`Updated wishlist item status to "${newStatus}".`);
  };

  // Ledger operations
  const handleCreateLedgerTransaction = (tx: Omit<LedgerTransaction, 'id' | 'date'>) => {
    const newTx: LedgerTransaction = {
      ...tx,
      id: `TX-${Date.now().toString().slice(-4)}`,
      date: 'Today, Just Now'
    };
    setLedger([newTx, ...ledger]);
    showToast(`Transaction for ${tx.customerName} recorded in ledger.`);
  };

  // Ad operations
  const handleCreateAdvert = (ad: Omit<Advertisement, 'id'>) => {
    const newAd: Advertisement = {
      ...ad,
      id: `AD-${Date.now()}`
    };
    setAds([newAd, ...ads]);
    showToast(`Advert "${newAd.title}" published!`);
  };

  // Inventory operations
  const handleAddProduct = (product: Omit<ProductItem, 'id'>) => {
    const newProduct: ProductItem = {
      ...product,
      id: `prod-${Date.now()}`
    };
    setProducts([newProduct, ...products]);
    showToast(`Added ${newProduct.name} to store catalog.`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#0f172a] text-[#131b2e] dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[80] animate-in slide-in-from-top-4 fade-in">
          <div className="bg-[#006948] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs md:text-sm font-semibold border border-emerald-500">
            <CheckCircle2 className="w-5 h-5 text-[#68dba9] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenProfile={() => setUserProfileModalOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        
        {/* Render view based on active tab */}
        {activeTab === 'products' && (
          <CatalogView
            products={products}
            onAddToCart={handleAddToCart}
            cartTotal={discountedTotal}
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
            onApplyCouponCode={handleApplyCoupon}
            onNavigateToDeals={() => setActiveTab('deals')}
          />
        )}

        {activeTab === 'deals' && (
          <DealsView
            ads={ads}
            onOpenPostAdModal={() => setPostAdModalOpen(true)}
            onApplyCouponCode={handleApplyCoupon}
            onNavigateToCatalog={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'requests' && (
          <WishlistView
            wishlistItems={wishlist}
            onToggleVote={handleToggleVote}
            onOpenRequestModal={() => setRequestModalOpen(true)}
            onNavigateToProduct={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'ledger' && (
          <LedgerView
            transactions={ledger}
            onOpenRecordModal={() => setRecordTxModalOpen(true)}
            onOpenContactAdminModal={() => setInfoModalType('support')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            products={products}
            wishlistItems={wishlist}
            onAddProduct={handleAddProduct}
            onUpdateWishlistStatus={handleUpdateWishlistStatus}
            onOpenRecordModal={() => setRecordTxModalOpen(true)}
            onOpenPostAdModal={() => setPostAdModalOpen(true)}
            onOpenRequestModal={() => setRequestModalOpen(true)}
          />
        )}
      </main>

      {/* Global Shopping Basket Slide-Over Drawer */}
      <ShoppingBasketDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onCheckoutCash={handleCheckoutCash}
        onCheckoutTab={handleCheckoutTab}
        appliedCoupon={appliedCoupon}
        discountPercent={discountPercent}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
      />

      {/* Modals */}
      <RequestProductModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSubmitRequest={handleCreateWishlistRequest}
      />

      <RecordTransactionModal
        isOpen={recordTxModalOpen}
        onClose={() => setRecordTxModalOpen(false)}
        onSubmitTransaction={handleCreateLedgerTransaction}
      />

      <PostAdvertModal
        isOpen={postAdModalOpen}
        onClose={() => setPostAdModalOpen(false)}
        onSubmitAdvert={handleCreateAdvert}
      />

      <UserProfileModal
        isOpen={userProfileModalOpen}
        onClose={() => setUserProfileModalOpen(false)}
        profile={userProfile}
      />

      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Footer */}
      <Footer onOpenModal={(type) => setInfoModalType(type)} />
    </div>
  );
}
