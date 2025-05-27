// Item type used in the shop
export interface Item { 
  id: number;               // unique ID
  name: string;             // short internal name
  title: string;            // display name for UI
  description: string;      // product detail
  price: number;            // price in USD
  category: string;         // e.g. "sofa", "table"
  material: string;         // e.g. "wood", "metal"
  color: string;            // product color
  image: string;            // image URL path
  rating: number;           // star rating (0–5)
  badge: 'NEW' | 'SALE';    // label for UI tag
}

// CartItem is for the shopping cart
export type CartItem = Partial<Item> & {
  id: number;               // must have ID for tracking
  quantity: number;         // how many user wants
  addedBy: string;          // who added this item (user ID or name)
};

// UserInfo used when user enters order form
export type UserInfo = {
  name: string;             // full name
  phone: string;            // contact phone
  address: string;          // shipping address
  country: string;          // shipping country
  cardNumber: string;       // credit card (fake for demo)
};
