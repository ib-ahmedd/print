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
      <img src={product_image} alt={product_name} />
      <p className="text-sm text-gray-400">{category}</p>
      <h3 className="text-site-blue font-bold text-center">{product_name}</h3>
      <RatingStars stars={rating} />
      <p className="text-site-blue font-bold">${price.toFixed(2)}</p>
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
