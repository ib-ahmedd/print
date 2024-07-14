import Link from "next/link";
import RatingStars from "./RatingStars";
function Product({
  category,
  product_name,
  product_image,
  rating,
  price,
}: ProductProps) {
  return (
    <article className="w-full sm:w-[32%] md:w-[23.5%] flex flex-col items-center gap-2 mb-8">
      <Link href="">
        <img
          src={product_image}
          alt={product_name}
          className="hover:scale-105 hover:shadow-md transition duration-150"
        />
      </Link>
      <p className="text-sm text-gray-400">{category}</p>
      <Link href="" className="font-bold text-center">
        {product_name}
      </Link>
      <RatingStars stars={rating} />
      <p className="font-bold">${price.toFixed(2)}</p>
    </article>
  );
}

interface ProductProps {
  category: string;
  product_name: string;
  product_image: string;
  price: number;
  rating: number;
}

export default Product;
