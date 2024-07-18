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
}: ProductProps) {
  return (
    <article
      className={`w-[48%] sm:w-[32%] ${
        notShop && "md:w-[23.5%]"
      } flex flex-col items-center gap-2 mb-8`}
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
      <Link href={`/product/${_id}`} className="font-bold text-center h-10">
        {product_name}
      </Link>
      <RatingStars stars={rating} />
      {sale ? (
        <p className="font-bold">
          <span className="text-gray-300 line-through">
            ${price.toFixed(2)}
          </span>{" "}
          ${percentage(price, 15).toFixed(2)}
        </p>
      ) : (
        <p className="font-bold">${price.toFixed(2)}</p>
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
}

export default Product;
