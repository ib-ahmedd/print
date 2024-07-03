import { NavLinkProps } from "@types";

export const navLinksArray: NavLinkProps[] = [
  { title: "HOME", path: "/" },
  { title: "ALL PRODUCTS", path: "/products" },
  { title: "ABOUT", path: "/about" },
  { title: "CONTACT", path: "/contact" },
];

export const designsArray = [
  {
    image: "/images/home/designs/img-1.jpg",
    title: "Most Loved Designs",
    desc: "Customize Your T-Shirts",
  },
  {
    image: "/images/home/designs/img-2.jpg",
    title: "Design of the Week",
    desc: "Rubber Print Your T-Shirt",
    reverse: true,
  },
  {
    image: "/images/home/designs/img-3.jpg",
    title: "New T-shirt Edition",
    desc: "Customize Plain Colors",
  },
];
