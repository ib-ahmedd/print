import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function CartEmpty() {
  return (
    <section className="flex-col py-20">
      <div className="w-full flex gap-2 p-2 md:p-4 mb-8 bg-gray-50 border-t-2 border-site-orange">
        <span className="text-2xl text-site-orange flex items-center justify-center">
          <FontAwesomeIcon icon={faSquare} />
        </span>
        <p className="text-sm md:text-base">Your cart is empty</p>
      </div>

      <Link
        href="/shop"
        className="bg-site-orange py-3 px-10 text-white w-fit rounded-md"
      >
        RETURN TO SHOP
      </Link>
    </section>
  );
}

export default CartEmpty;
