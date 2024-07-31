import Link from "next/link";
import RatingStars from "./RatingStars";
import Sale from "./Sale";
import { percentage } from "@utils/percentage";
function Product({
  _id,
  notShop,
  category,
  product_name,
  product_image,
  rating,
  price,
  sale,
  border,
}: ProductProps) {
  return (
    <article
      className={`w-[49%] sm:w-[32%] ${
        notShop && "md:w-[24%]"
      } flex flex-col items-center gap-2 mb-2 ${
        border && "border rounded-md p-2"
      }`}
    >
      <Link className="relative" href={`/product/${_id}`}>
        <img
          src={product_image}
          alt={product_name}
          className="hover:scale-105 hover:shadow-md transition duration-150"
        />

        {sale && <Sale style={2} />}
      </Link>
      <p className="text-sm text-gray-400">{category}</p>
      <Link
        href={`/product/${_id}`}
        className="font-bold text-center text-sm md:text-base"
      >
        {product_name}
      </Link>
      <RatingStars stars={rating} />
      {sale ? (
        <p className="font-bold text-sm md:text-base">
          <span className="text-gray-300 line-through">
            ${price.toFixed(2)}
          </span>{" "}
          ${percentage(price, 15).toFixed(2)}
        </p>
      ) : (
        <p className="font-bold text-sm md:text-base">${price.toFixed(2)}</p>
      )}
    </article>
  );
}

interface ProductProps {
  _id: string;
  notShop?: boolean;
  category: string;
  product_name: string;
  product_image: string;
  price: number;
  rating: number;
  sale: boolean;
  border?: boolean;
}

export default Product;
