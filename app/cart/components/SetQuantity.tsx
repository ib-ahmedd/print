import { CartItem } from "@types";
import { Dispatch, SetStateAction } from "react";

function SetQuantity({
  setTableData,
  productQuantity,
  id,
  setTableAltered,
}: SetQuantityProps) {
  return (
    <article className="flex items-center">
      <button
        onClick={() => {
          setTableData((prev) => {
            return prev.map((item) => {
              if (item._id === id && item.quantity > 1) {
                item = { ...item, quantity: item.quantity - 1 };
                setTableAltered(true);
              }
              return item;
            });
          });
        }}
        className="border border-gray-300 w-7 md:w-10 h-7 md:h-10 flex items-center justify-center"
      >
        -
      </button>
      <p className="border border-gray-300 w-7 md:w-10 h-7 md:h-10 flex items-center justify-center">
        {productQuantity}
      </p>
      <button
        onClick={() => {
          setTableData((prev) => {
            return prev.map((item) => {
              if (item._id === id) {
                item = { ...item, quantity: item.quantity + 1 };
                setTableAltered(true);
              }
              return item;
            });
          });
        }}
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
  setTableAltered: Dispatch<SetStateAction<boolean>>;
  productQuantity: number;
}

export default SetQuantity;
