import React from 'react';
import { ActiveTab } from '../types';
import { 
  Store, 
  Tag, 
  HeartHandshake, 
  BookOpenCheck, 
  ShieldAlert, 
  ShoppingBasket, 
  User, 
  Sun, 
  Moon, 
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenProfile,
  darkMode,
  setDarkMode,
  isAdminView,
  setIsAdminView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'products', label: 'Store Products', icon: <Store className="w-4 h-4" /> },
    { id: 'deals', label: 'New Deals & Ads', icon: <Tag className="w-4 h-4" /> },
    { id: 'requests', label: 'Item Requests', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'ledger', label: 'Credit/Debt Book', icon: <BookOpenCheck className="w-4 h-4" /> },
    { id: 'admin', label: 'Admin Control', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf8ff]/95 dark:bg-[#0f172a]/95 backdrop-blur-md border-b border-[#bccac0]/40 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('products')} 
          className="cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006948] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">storefront</span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl md:text-2xl text-[#006948] dark:text-[#68dba9] tracking-tight leading-none">
              Fresh & Home Central
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6d7a72] dark:text-slate-400 hidden sm:inline">
              Local Foodstuff & Supplies
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 text-sm font-semibold py-1.5 transition-all relative ${
                  isActive
                    ? 'text-[#006948] dark:text-[#68dba9]'
                    : 'text-[#3d4a42] dark:text-slate-300 hover:text-[#006948] dark:hover:text-[#68dba9]'
                }`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006948] dark:bg-[#68dba9] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Admin / Customer View Switcher */}
          <button
            onClick={() => setIsAdminView(!isAdminView)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              isAdminView
                ? 'bg-[#ba0035]/10 text-[#ba0035] border-[#ba0035]/30 dark:bg-rose-950/40 dark:text-rose-300'
                : 'bg-[#006948]/10 text-[#006948] border-[#006948]/20 dark:bg-emerald-950/40 dark:text-emerald-300'
            }`}
            title="Toggle between Customer and Store Manager View"
          >
            <span className="w-2 h-2 rounded-full animate-pulse bg-current" />
            {isAdminView ? 'Admin Mode' : 'Customer View'}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-[#3d4a42] dark:text-slate-300 hover:bg-[#006948]/10 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Toggle Dark/Light Mode"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="p-2 text-[#3d4a42] dark:text-slate-300 hover:bg-[#006948]/10 dark:hover:bg-slate-800 rounded-lg transition-colors relative"
            aria-label="View Cart"
          >
            <ShoppingBasket className="w-5 h-5 text-[#006948] dark:text-[#68dba9]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ba0035] text-white text-[11px] font-bold flex items-center justify-center rounded-full shadow-xs animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Profile Button */}
          <button
            onClick={onOpenProfile}
            className="p-2 text-[#3d4a42] dark:text-slate-300 hover:bg-[#006948]/10 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="User Account"
          >
            <User className="w-5 h-5 text-[#006948] dark:text-[#68dba9]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#3d4a42] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1e293b] border-b border-[#bccac0]/40 dark:border-slate-800 px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-[#006948] text-white'
                  : 'text-[#131b2e] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center px-1">
            <span className="text-xs text-slate-500 dark:text-slate-400">View Mode</span>
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            >
              {isAdminView ? 'Admin Mode' : 'Customer View'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
