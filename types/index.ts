export interface NavLinkProps {
  path: string;
  title: string;
  icon?: boolean;
}

export interface ProductsType {
  _id: string;
  product_name: string;
  product_image: string;
  price: number;
  category: string;
  free_shipping: boolean;
  rating: number;
  sold: number;
  sale: boolean;
  date_in_stock: string;
}

export interface CartItem {
  _id: string;
  user_id?: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}

export interface User {
  _id: string;
  user_name: string;
  email: string;
  mobile_no: string;
  country: string;
  state: string;
  city: string;
  address: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AlteredItems {
  _id: string;
  quantity: number;
}

export interface orders {
  _id?: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  delivered: boolean;
  reviewed: boolean;
}
