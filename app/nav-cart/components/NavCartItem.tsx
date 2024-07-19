import { remove } from "@store/cartSlice";
import { CartItem } from "@types";
import Link from "next/link";
import { useDispatch } from "react-redux";

function NavCartItem({
  _id,
  product_image,
  product_name,
  price,
  quantity,
}: CartItem) {
  const dispatch = useDispatch();
  return (
    <article className="flex gap-2 h-fit py-3 border-b shrink-0">
      <img src={product_image} alt={product_name} className="w-[12%]" />

      <div className="flex flex-col flex-1">
        <Link href={`/product/${_id}`}>{product_name}</Link>
        <p>
          {quantity} × ${price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => {
          dispatch(remove(_id));
        }}
        className="w-5 h-5 flex items-center justify-center border border-gray-500 rounded-full text-gray-500 text-xl"
      >
        ×
      </button>
    </article>
  );
}

export default NavCartItem;
