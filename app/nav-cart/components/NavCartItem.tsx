import { AppDispatch } from "@store";
import { deleteItem, removeNoLog } from "@store/cartSlice";
import { CartItem } from "@types";
import Link from "next/link";
import { useDispatch } from "react-redux";

function NavCartItem({
  _id,
  product_id,
  product_image,
  product_name,
  price,
  quantity,
  accessToken,
  isLoggedIn,
}: NavCartItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <article className="flex gap-2 h-fit py-3 border-b shrink-0">
      <img
        src={product_image}
        alt={product_name}
        className="w-[3em] shrink-0"
      />

      <div className="flex flex-col flex-1">
        <Link href={`/product/${product_id}`} className="text-sm md:text-base">
          {product_name}
        </Link>
        <p className="text-sm md:text-base">
          {quantity} × ${price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => {
          if (isLoggedIn) {
            dispatch(deleteItem({ itemId: _id ? _id : "", accessToken }));
          } else {
            dispatch(removeNoLog(_id ? _id : ""));
          }
        }}
        className="w-5 h-5 flex items-center justify-center border border-gray-500 rounded-full text-gray-500 text-xl"
      >
        ×
      </button>
    </article>
  );
}

interface NavCartItemProps extends CartItem {
  accessToken: string;
  isLoggedIn: boolean;
}

export default NavCartItem;
