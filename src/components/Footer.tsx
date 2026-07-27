import React from 'react';
import { Store, QrCode, Share2, Mail } from 'lucide-react';

interface FooterProps {
  onOpenModal?: (type: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal }) => {
  return (
    <footer className="bg-[#283044] text-[#eef0ff] dark:bg-[#090d16] w-full py-10 px-4 md:px-8 mt-16 transition-colors">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand info */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="text-white font-extrabold text-xl flex items-center gap-2">
            <Store className="w-5 h-5 text-[#68dba9]" />
            Fresh & Home Central
          </div>
          <p className="text-[#bccac0] dark:text-slate-400 text-xs max-w-sm">
            © 2024 Fresh & Home Central - Your Local Foodstuff & Supplies Hub. Sourced daily from local organic farmers.
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <button 
            onClick={() => onOpenModal?.('locations')} 
            className="text-[#bccac0] hover:text-white transition-colors hover:underline"
          >
            Store Locations
          </button>
          <button 
            onClick={() => onOpenModal?.('delivery')} 
            className="text-[#bccac0] hover:text-white transition-colors hover:underline"
          >
            Delivery Info
          </button>
          <button 
            onClick={() => onOpenModal?.('privacy')} 
            className="text-[#bccac0] hover:text-white transition-colors hover:underline"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => onOpenModal?.('terms')} 
            className="text-[#bccac0] hover:text-white transition-colors hover:underline"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => onOpenModal?.('support')} 
            className="text-[#bccac0] hover:text-white transition-colors hover:underline"
          >
            Contact Support
          </button>
        </nav>

        {/* Social / Contact Icons */}
        <div className="flex items-center gap-4 text-[#bccac0]">
          <button onClick={() => onOpenModal?.('qr')} className="hover:text-[#68dba9] transition-colors p-1" title="Store App QR Code">
            <QrCode className="w-5 h-5" />
          </button>
          <button onClick={() => onOpenModal?.('share')} className="hover:text-[#68dba9] transition-colors p-1" title="Share Community Wishlist">
            <Share2 className="w-5 h-5" />
          </button>
          <button onClick={() => onOpenModal?.('support')} className="hover:text-[#68dba9] transition-colors p-1" title="Email Admin Support">
            <Mail className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
