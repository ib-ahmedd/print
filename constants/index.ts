import { ProductsType, User } from "@types";

export const demoProductObject: ProductsType = {
  _id: "66959f416fe77293dd2a502f",
  product_name: "Black Printed Coffee Mug",
  product_image: "http://localhost:4000/images/black_printed_coffee_mug.jpg",
  price: 15.5,
  category: "Mugs",
  rating: 3,
  free_shipping: true,
  date_in_stock: "",
  sale: true,
  sold: 10,
};

export const fallBackProduct: ProductsType = {
  _id: "",
  category: "",
  date_in_stock: "",
  free_shipping: false,
  price: 0,
  product_image: "",
  product_name: "",
  rating: 0,
  sale: false,
  sold: 0,
};

export const fallBackUser: User = {
  _id: "",
  user_name: "",
  email: "",
  mobile_no: "",
  country: "",
  state: "",
  city: "",
  address: "",
};
