import Link from "next/link";

function SideBarProducts({
  product_image,
  product_name,
  price,
}: SideBarProductsProps) {
  const discount = (15 / 100) * price;
  const salePrice = price - discount;
  return (
    <article className="w-[32%] md:w-[47%] flex flex-col mb-4">
      <Link href="" className="mb-4 relative">
        <img
          src={product_image}
          alt={product_name}
          className="hover:scale-105 transition-transform duration-150"
        />
        <p className="absolute -top-2 -right-2 w-8 h-8 z-10 flex items-center justify-center rounded-full bg-white border border-site-orange text-sm">
          Sale
        </p>
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
  product_image: string;
  product_name: string;
  price: number;
}

export default SideBarProducts;
