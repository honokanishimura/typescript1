
export interface Item { 
    id: number;
    name: string;
    title: string;
    description: string;
    price: number;
    category: string;
    material: string;
    color: string;
    image: string;
    rating: number;  
    badge: 'NEW' | 'SALE'; 
}

export type CartItem = Partial<Item> & {
  id: number;
  quantity: number;
  addedBy: string;
};


// ユーザーが入力する購入情報
export type UserInfo = {
  name: string;
  phone: string;
  address: string;
  country: string;
  cardNumber: string;
};
