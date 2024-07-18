"use client";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "@store";
import { toggleNavCart } from "@store/globalSlice";
import { useDispatch, useSelector } from "react-redux";

function NavCart() {
  const cartOpen = useSelector((state: RootState) => state.global.navCartOpen);
  const dispatch = useDispatch();
  return (
    <aside
      className={`w-1/3 fixed h-screen right-0 top-0 z-40 bg-white flex flex-col justify-between transition-transform duration-150 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between px-4 py-4 border-b">
        <h3>Shopping cart</h3>
        <button
          onClick={() => {
            dispatch(toggleNavCart());
          }}
          className="text-xl"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="w-full flex justify-center items-center flex-1">
        <p>No products in cart.</p>
      </div>
      <div className="py-4 px-4">
        <button className="bg-site-orange text-white w-full py-2 rounded-md">
          CONTINUE SHOPPING
        </button>
      </div>
    </aside>
  );
}

export default NavCart;
