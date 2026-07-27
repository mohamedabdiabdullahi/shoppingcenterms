export type ActiveTab = 'products' | 'deals' | 'requests' | 'ledger' | 'admin';

export interface ProductItem {
  id: string;
  name: string;
  category: 'Foodstuff' | 'Home Goods' | 'Cleaning' | 'Dairy' | 'Proteins' | 'Pantry';
  price: number;
  unit: string;
  description: string;
  image: string;
  badges: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  requestedBy: string;
  timeAgo: string;
  votes: number;
  status: 'Ordered - Arriving Soon' | 'In Sourcing' | 'Under Review' | 'In Stock!';
  estimatedDelivery?: string;
  votedByUser?: boolean;
  category?: string;
}

export interface LedgerTransaction {
  id: string;
  date: string;
  customerName: string;
  breakdown: string;
  type: 'Store Credit +' | 'Cash Payment -';
  amount: number; // in Naira or USD
  currency: '₦' | '$';
  status: 'Completed' | 'Pending' | 'Disputed';
}

export interface Advertisement {
  id: string;
  title: string;
  category: string;
  badge: string;
  badgeColor: 'secondary' | 'tertiary' | 'primary';
  timeframe: string;
  description: string;
  discountCode: string;
  discountAmount?: string;
  image: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  currentTabDebt: number; // ₦ or $
  rewardPoints: number;
  isStoreAdmin: boolean;
}
