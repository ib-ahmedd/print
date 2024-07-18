import Sale from "@components/Sale";
import { percentage } from "@utils/percentage";
import Link from "next/link";

function SideBarProducts({
  _id,
  product_image,
  product_name,
  price,
}: SideBarProductsProps) {
  const salePrice = price - percentage(price);
  return (
    <article className="w-[32%] md:w-[47%] flex flex-col mb-4">
      <Link href={`product/${_id}`} className="mb-4 relative">
        <img
          src={product_image}
          alt={product_name}
          className="hover:scale-105 transition-transform duration-150"
        />
        <Sale style={1} />
      </Link>
      <Link href="" className="text-site-orange">
        {product_name}
      </Link>
      <div className="w-full flex gap-2">
        <p className="text-gray-400 line-through">${price.toFixed(2)}</p>
        <p>${salePrice.toFixed(2)}</p>
      </div>
    </article>
  );
}

interface SideBarProductsProps {
  _id: string;
  product_image: string;
  product_name: string;
  price: number;
}

export default SideBarProducts;
