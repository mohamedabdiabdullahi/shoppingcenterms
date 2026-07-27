import { ProductItem, WishlistItem, LedgerTransaction, Advertisement, UserProfile } from '../types';

export const initialProducts: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Seasonal Organic Vegetable Box',
    category: 'Foodstuff',
    price: 18.50,
    unit: '5kg box',
    description: 'Hand-picked selection from local growers. 5kg assorted fresh produce.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc1pfKVivWZMfKstZ0HO5avvZbNRPzUYBi_kf16NKUx-eMuLZec_zNHL81D_ZVe1q1sMhdLtzYweJ3jzVNiSlASQjjw4pdJbi_J7rFySX90RujVUIU6aWX4ONePH4aqoT0_TG9PV0x7_ZKXwJiRkl35-fldvgr0zT4AcS7bzAjoS5RACB3phQdJ7D1TBdPB_7ZEycV_HCZM-wpt8cTH8zJcDhHr-PSfTTtsST2YksKv15z9ecbO37pP1Tulid3Gx_UV8f7Jtq_KqZ_',
    badges: ['Flash Deal', 'Organic'],
    inStock: true,
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Crisp Spinach',
    category: 'Foodstuff',
    price: 2.50,
    unit: 'bunch',
    description: 'Local farm-to-table greens, washed and ready to enjoy in salads or smoothies.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLgtKRU_IR1vFimV4GQ0lC9Hi5asgJR0cfMMkY5czMtjlzyF5IeDXLzSRqk_zIx7lI2qK1tW8EoI1Hifx3nrhel5zt607jmTfGvc-xUxPrpfYa3ngKU_AxngqBYXta0CVCgeSrF7F96crrQFS_qsR-YmlcqHRYGlxHdEM5X5t1UkoeW-B821kwWnao2CoyPckfJkzcmzmc3kULnain-Lb-G-GderoYA6Ar3YNO-howpgDJpJAkfkwptHhNPsF7ZI9xEwRStXuvoYFc',
    badges: ['Fresh Daily', 'Organic'],
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Red Vine Tomatoes',
    category: 'Foodstuff',
    price: 3.50,
    unit: '500g Pack',
    description: 'Sweet and juicy greenhouse-grown tomatoes perfect for sauces and salads.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2LQnBAUHEWNCUxrml4w4LdDfVZYqg6BCgQVHFTABFSXPa_750Xyqe4LiVLXt-9vgYE-StZoyMCFgovRhGv7PSsXXYKZriKFMzReJ4aK5r9-tVdYClVlMjkruNVCkTPCI8ZP4Xiw3q5bJdtsRre0bqSnFyo3xGRAd0Bsf_voNcwbgt74wveY92A9YTft1gnK7qlBgzqdmxZUaMm0UR35ZQbtExLr6HNhGR3eKDkkcc388mDfQFeIZqTZGvc4PatZPKbMTT3o2eC4Ve',
    badges: ['Top Pick', 'Foodstuff'],
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Organic Wildflower Honey',
    category: 'Pantry',
    price: 12.00,
    unit: '250g Jar',
    description: 'Pure raw wildflower honey sourced directly from local ethical apiaries.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkVXz1r1loIbiaBULb9H10C5B2ydLjNHfp7puXGZIf6Jhw5X1XkQOsLM2aA-wuxOr4RiPuLRg4tz8ouZ7eGDxmm7CYQhFWD-6TVS9JPrIljLyIt3SupWN_Hy8enz2l6fcYvJqkwZJnh9Gz4HsWi9XxSF97EwPdCvTwtrkSasu2Ip9TWotwwpcXANuc0oJoNlwOxUpFRuH5hwmBF2yIvyiWR0WcLp_zRIEhWS8uCBKQaN69mSk2Nh-EdvQJxVkMSCfdy2pvh0wASIiR',
    badges: ['New Arrival', 'Pantry'],
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Premium Arabica Beans',
    category: 'Pantry',
    price: 8.75,
    unit: '200g - Dark Roast',
    description: 'Freshly roasted whole arabica beans with chocolate and caramel undertones.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNQu6oUYIsZAc9Qqeucae2kvvaAuJefQa9I2HPbmswDsOc0_ngvUCk5sRBtC-eZ2AWCYwRNPUAP7LuVbqipH8k6EoLthLw5rSNSZciKgnYXG_TEg2FOsq04pPq6DlbEy9YORm9wQ9j_iKkTXcqAHqnGjwUG8hZd1PU9kgAdwYchJBp6ERpwNb-QT_eu7x-RmbEjypPFTQlGHkGPz510tleSxxXa8BH9ROt_qtIl1LzLmXD6ZKqJ8uyyCmZ7Ybn0JQWtgXPf70biJoX',
    badges: ['Top Seller'],
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Eco-Multi Spray Cleaner',
    category: 'Cleaning',
    price: 8.99,
    unit: '500ml Spray',
    description: 'All-natural citrus-based cleaner for all household surfaces. Zero harsh chemicals.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT-9Pt7WBOtwbPPeotNeb5v7cFX3fUqBsrmalBtXC6LzT_4e7ckSrg-WpRmWCXwE2bDjb9Qe1FQEE1J_u0x1q2OT-i_1JKWOMQip9ijTZyhTv0C-J1U58lvZViTPNknFTEwprhRAxEIpCx7TKZFxHYLzFKoNVmazfWHZu4El-pXEOxV9D9W0q4E9zG7SVlvGNSW4ri5ell4sdsR1Cfj-SMBMh7x-QfPHgjOIAD5xyt_3b1tWdkzdjY7HelvuNcCNwbm6gZl33LEfaA',
    badges: ['Eco Friendly', 'Cleaning'],
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Egyptian Cotton Towel Set',
    category: 'Home Goods',
    price: 24.50,
    unit: 'Set of 3',
    description: 'Ultra-absorbent 100% Egyptian cotton towels. Set includes hand, bath, and face towels.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbjuPyvHU51BQpfegT8TZb0k_cJaA86nFu7F1DK78EVQLJT5-mffjhlWlQnASwrP3y2Ukp9hcQase6jM5ZbsWOEUXm02HfBwfCpe_tIEiZ1Lvlw4x_Y562wYLiJmum6IUjIEwyoDL9GSz2tnK_5r6wVjlxZqTkn14-Q6PGc9pdO15BNGw3XXtCYtJ0raNtoKcC4gDANQD4b7lE_oBaEmUdlWqnW97NzroM8yoUU0HiKto8BYGBO3NJ0uxmPaMwMLANjvUzTnnNIXNV',
    badges: ['Essential', 'Home Goods'],
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Fresh Farm Whole Milk',
    category: 'Dairy',
    price: 4.50,
    unit: '1L Bottle',
    description: 'Cold-pressed pasteurized whole milk delivered daily from neighboring organic dairy farms.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqcC5u7pInol15qjsgs3hkAL0b0BJHQJmu72W-T-k_sTirhzt8ovC9-csxoBID5UcbX0gK_t4XWfIff47z9ZlFkx7u4g3JqLlcVY3_j-uHR54PSjwha5_Ya-2coakXfC6U7-72HFuuVcaKN6kLzU_YuDtW1MJxf8NO0sBTtuZPCyMtTCjz3xjIsjbQZtSFbNHhhR532TzLmZY1HRJEmEzkDwLunvwJLkPTkhTqaI5JrrFGYQ2-jjaEK-s8hykMY3EUyDYoNBUrd_mG',
    badges: ['Farm Fresh', 'Dairy'],
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'Artisan Wood-Fired Sourdough',
    category: 'Foodstuff',
    price: 6.25,
    unit: '500g Loaf',
    description: 'Naturally fermented 36-hour sourdough baked in wood-fired ovens every morning.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIeDE5Ln0UxwzFTxw0mfaLfAuqulyPiaUItOgGkPYcK4dtyeGOXD9ZBkgDrJh1KWvdGArWev307c4dZNHISRgW_ktK6WT57t20MT_AaS2mDE1FIjsSChElST8417gk265Y9sHcAnxtBHtSalU180OsRsq--UaAxfarhpZZSTTapXUfUlFK2Tcosc78UKj3sUAbkEVBMxFjfDjXZe5HKyoGka0Cb6v50sRlVTOFEhInXalEEC8ONi3_DmLeF9K3FgS5bziZC8LmlKa3',
    badges: ['Bakery Fresh'],
    inStock: true
  }
];

export const initialWishlistItems: WishlistItem[] = [
  {
    id: 'wish-1',
    title: 'Artisanal Sourdough Bread',
    requestedBy: 'Mark S.',
    timeAgo: '4 hours ago',
    votes: 124,
    status: 'Ordered - Arriving Soon',
    estimatedDelivery: 'Estimated Friday',
    votedByUser: false
  },
  {
    id: 'wish-2',
    title: 'Gluten-Free Flour',
    requestedBy: 'Jane D.',
    timeAgo: '2 days ago',
    votes: 82,
    status: 'In Sourcing',
    votedByUser: false
  },
  {
    id: 'wish-3',
    title: 'Organic Coconut Water (Bulk)',
    requestedBy: 'Alex Rivera',
    timeAgo: '5 days ago',
    votes: 56,
    status: 'Under Review',
    votedByUser: false
  },
  {
    id: 'wish-4',
    title: 'Imported Olive Oil (Cold Pressed)',
    requestedBy: 'Mrs. Higgins',
    timeAgo: '1 week ago',
    votes: 98,
    status: 'In Stock!',
    votedByUser: true
  },
  {
    id: 'wish-5',
    title: 'Hand-made Shea Butter Soap',
    requestedBy: 'Sam T.',
    timeAgo: '2 days ago',
    votes: 31,
    status: 'Under Review',
    votedByUser: false
  }
];

export const initialLedgerTransactions: LedgerTransaction[] = [
  {
    id: 'tx-1',
    date: 'Oct 24, 2024',
    customerName: 'John Smith',
    breakdown: 'Monthly Grocery Bundle (Rice, Oil, Flour)',
    type: 'Store Credit +',
    amount: 24500,
    currency: '₦',
    status: 'Completed'
  },
  {
    id: 'tx-2',
    date: 'Oct 23, 2024',
    customerName: 'Amara Okafor',
    breakdown: 'Payment for September Outstanding',
    type: 'Cash Payment -',
    amount: 15000,
    currency: '₦',
    status: 'Completed'
  },
  {
    id: 'tx-3',
    date: 'Oct 22, 2024',
    customerName: 'David Chen',
    breakdown: 'Bulk Cleaning Supplies for Office',
    type: 'Store Credit +',
    amount: 42800,
    currency: '₦',
    status: 'Completed'
  },
  {
    id: 'tx-4',
    date: 'Oct 21, 2024',
    customerName: 'Fatima Bello',
    breakdown: 'Fresh Produce Weekly Tab',
    type: 'Cash Payment -',
    amount: 5200,
    currency: '₦',
    status: 'Completed'
  },
  {
    id: 'tx-5',
    date: 'Oct 20, 2024',
    customerName: 'Samuel Wright',
    breakdown: 'Special Item Request: Imported Spices',
    type: 'Store Credit +',
    amount: 8900,
    currency: '₦',
    status: 'Completed'
  }
];

export const initialAdvertisements: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'Artisanal Organic Honey Just In!',
    category: 'New Arrivals',
    badge: 'NEW ARRIVAL',
    badgeColor: 'secondary',
    timeframe: 'Oct 1 - Oct 7',
    description: 'Straight from local apiaries, our raw honey is unpasteurized and full of natural nutrients. Perfect for morning tea or baking.',
    discountCode: 'HONEY10',
    discountAmount: '10% OFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcyFZdPPMyHwPEk6B4yN_e_ncttH3nlrFZ0JdnD8M8jjqhpyM6fucHK23xesjRrgjhVYhH85-sCd58jNw-zKZz-kj_nBk7p2_mW1dkG1P2gzoSe1irMKtEMFTIFJ1wZon8EHjQSUxaOJXSkZiz4QykYzYhiNI_6RKcvtW00lBwSgAU0EkqfG2cJqPUEn1kj71WLTFnkKAH1tmUjHWiIkYGJQCFpIp0xcgUEpB2jFsmTVNYZ_c8t30tSaIk5ehOX1kAMqsbZVsdYQV8'
  },
  {
    id: 'ad-2',
    title: 'Tropical Fruit Fiesta - 30% Off',
    category: 'Flash Sales',
    badge: 'FLASH SALE',
    badgeColor: 'tertiary',
    timeframe: 'Ends in 12 Hours',
    description: 'Enjoy the freshest exotic fruits this weekend. All tropical items are discounted for a limited time while stocks last!',
    discountCode: 'FRESH30',
    discountAmount: '30% OFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_35jUd-Dbsl82qvF-N0Igsu5RCAtTVu41DMgql3Udl9H9-fW8mPqVOI-jSm32pXWW7lEMTdP16_koqogmUbxhssRKWhv2cnG-n51LtOFljJgBoQXhmQjN1uktG5snBhhMmlfiz_UXWvfg9iZwctIZI08YpCm-snx2K_7LaOR3QnPQMNbLIX3MkI7G4vT00C6cZf42tW9iNXqFb-uPfF5zNE22T7p3pndG9yM3ql8qnb30lJ91sOZ4AzcogR4NU3mx4t3X-6MZRGUa'
  },
  {
    id: 'ad-3',
    title: 'Pantry Essentials Bulk Pack',
    category: 'Bulk Deals',
    badge: 'BULK SAVINGS',
    badgeColor: 'primary',
    timeframe: 'Monthly Stock-Up',
    description: 'Stock up on rice, oil, and lentils. Buy over 10kg and get a free home delivery service plus an additional voucher.',
    discountCode: 'BULKBUY',
    discountAmount: 'Free Delivery + Voucher',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZk5js7LoMUNnajZs-vbK0kLZ00otHAjZTVoEYcC6eRrgUJNdrmGnUsMa74SafFAxdw4IGSsbyIr8d1tUxU7B1C-eEjniZWT_rT0PMyA7iy5h7uyUBWXSNOx1ejp1joppGNly-JGW1GEi2uJ8WFSFCg2b1eVam5VvGv4cfdfasI59lZtCKaMQCS6PKrY_1qrhmMlj6Bww1TST-xvAQuAbjZv5uF9UC6WFNbq92EicLOwnqxIbS6aH2QvoIoWYkaVFbzP3pKMekL3Fm'
  },
  {
    id: 'ad-4',
    title: 'Eco-Friendly Cleaning Kit',
    category: 'Home Essentials',
    badge: 'HOME CARE',
    badgeColor: 'secondary',
    timeframe: 'Sep 28 - Oct 15',
    description: 'New range of biodegradable cleaning supplies arrived today. Better for your home, better for the planet.',
    discountCode: 'GREENHOME',
    discountAmount: '15% OFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUY0SwERZWMPxH5YDs6m9VG5nQzZNkZX2M7iQ24dEur8N7a9Q4uoWjQpY1TfzKZvgsnZd0RcSxm4qokXQ5Cr23wvIa27g70l8mJ_yCKi5lFHhzzl1wahF6OSy6FTO0elpSdDZ7GLK6_tatBcOONJFLgkUxwEb5mPkQ2ET7c6VME2oF_MHy5D_mGgN_iv4nBj4ebr43SP1-wGRQcD-WHIJywHR6EvWeB-DMiuruqcTWzybbXchCvUec3WrXuDQ6evlVO_tYUwNsoq4l'
  },
  {
    id: 'ad-5',
    title: 'Farm Fresh Dairy Basket',
    category: 'New Arrivals',
    badge: 'DAIRY SPECIAL',
    badgeColor: 'primary',
    timeframe: 'Weekend Special',
    description: 'Get 1L of organic milk free with every purchase of our signature aged cheddar cheese this weekend only.',
    discountCode: 'MILKDAY',
    discountAmount: 'Free 1L Milk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9v8U3h73CQgYqEEUHvaDtWlkH-68hWRtVfifxjmh0Dx6raWnqWfxtEMMtH4ojkRe_7H6EDgD7gO3odWyLUAy1FLcbmv8Y5xIlUFIk1dj8vhDF_aD1GMUGJ54rJ_eHMANbXgEwfXj3pZk5HFuqVu7z__2cl7SvyFt2OqI5Yr0m5R_3SiAPh1ZILg7ltbJJ2vEf8z526fNQ4NyIh8-au5c6omgAa_gz0HN6kjeG157CKGzDFztEJI7rMvcamd-q3a8oba4smpcD8dym'
  },
  {
    id: 'ad-6',
    title: 'Cold Pressed Juice Trio',
    category: 'Flash Sales',
    badge: 'JUICE BAR',
    badgeColor: 'secondary',
    timeframe: 'New Menu Item',
    description: 'Three new flavors: Morning Zest, Green Power, and Ruby Beet. Try the sampler pack at a special introductory price.',
    discountCode: 'SIPFRESH',
    discountAmount: '20% OFF',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5qMLN7hE41HCAb3a8Oc1suq9Xl46WeBNSib4A0AQVX8RX1y5lgHZljrvV9ewpCR1uwhfeOKppc9wgY7WIh8tqEQoSQ1iNOuapPs117Y6LWaFzgMzMtPmN_Hh3-hjPo0-Kr0tjgTN2UMyl3nS4egy7wqmupwOwpPHMRpqpXMzslvZbuXOqOuuabnhdjTnLFnUsNiyiE1_5oET7NjiwPhcjSr7m6fAtCLjf-LNRSLhfDj82LRLl3BxPPV2w_VwffILTtbRwIyDWj5mf'
  }
];

export const initialUserProfile: UserProfile = {
  name: 'Mrs. Higgins',
  email: 'mrs.higgins@community.org',
  phone: '+234 802 345 6789',
  currentTabDebt: 8900,
  rewardPoints: 340,
  isStoreAdmin: false
};
