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
  userId?: string;
  _id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
}
