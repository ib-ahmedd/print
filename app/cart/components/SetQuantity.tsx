import { RootState } from "@store";
import { setRouterState } from "@store/globalSlice";
import { AlteredItems, CartItem } from "@types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function SetQuantity({
  alteredItems,
  setAlteredItems,
  setTableData,
  productQuantity,
  id,
}: SetQuantityProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartLoading = useSelector((state: RootState) => state.cart.loading);

  const itemInCart = cartItems.find((item) => item._id === id);

  function handleAlteredItem(func: "add" | "subtract") {
    const itemExists = alteredItems.find((item) => item._id === id);
    if (itemExists) {
      setAlteredItems((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            item.quantity =
              func === "add" ? productQuantity + 1 : productQuantity - 1;
            return item;
          } else {
            return item;
          }
        })
      );
    } else {
      setAlteredItems((prev) => [
        ...prev,
        {
          _id: id,
          quantity: func === "add" ? productQuantity + 1 : productQuantity - 1,
        },
      ]);
    }
  }

  useEffect(() => {
    if (itemInCart?.quantity === productQuantity) {
      setAlteredItems &&
        setAlteredItems((prev) => prev.filter((item) => item._id !== id));
    }
  }, [itemInCart, productQuantity]);
  return (
    <article className={`flex items-center ${cartLoading && "opacity-50"}`}>
      <button
        onClick={() => {
          dispatch(setRouterState(""));
          setTableData((prev) => {
            return prev.map((item) => {
              if (item._id === id && item.quantity > 1) {
                handleAlteredItem("subtract");
                item = { ...item, quantity: item.quantity - 1 };
              }
              return item;
            });
          });
        }}
        disabled={cartLoading}
        className="border border-gray-300 w-7 md:w-10 h-7 md:h-10 flex items-center justify-center"
      >
        -
      </button>
      <p className="border border-gray-300 w-7 md:w-10 h-7 md:h-10 flex items-center justify-center">
        {productQuantity}
      </p>
      <button
        onClick={() => {
          dispatch(setRouterState(""));
          setTableData((prev) => {
            return prev.map((item) => {
              if (item._id === id) {
                item = { ...item, quantity: item.quantity + 1 };
                handleAlteredItem("add");
              }
              return item;
            });
          });
        }}
        disabled={cartLoading}
        className="border border-gray-300 w-7 md:w-10 h-7 md:h-10 flex items-center justify-center"
      >
        +
      </button>
    </article>
  );
}

interface SetQuantityProps {
  id: string;
  setTableData: Dispatch<SetStateAction<CartItem[]>>;
  setAlteredItems: Dispatch<SetStateAction<AlteredItems[]>>;
  alteredItems: AlteredItems[];
  productQuantity: number;
}

export default SetQuantity;
