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
  date_in_stock: string;
}
