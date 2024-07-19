import { Dispatch, SetStateAction } from "react";

function SetQuantity({
  setProductQuantity,
  productQuantity,
}: SetQuantityProps) {
  return (
    <article className="flex items-center">
      <button
        onClick={() => {
          if (productQuantity > 1)
            return setProductQuantity((prev) => prev - 1);
        }}
        className="border border-gray-300 w-10 h-10 flex items-center justify-center"
      >
        -
      </button>
      <p className="border border-gray-300 w-10 h-10 flex items-center justify-center">
        {productQuantity}
      </p>
      <button
        onClick={() => {
          if (productQuantity < 10)
            return setProductQuantity((prev) => prev + 1);
        }}
        className="border border-gray-300 w-10 h-10 flex items-center justify-center"
      >
        +
      </button>
    </article>
  );
}

interface SetQuantityProps {
  setProductQuantity: Dispatch<SetStateAction<number>>;
  productQuantity: number;
}

export default SetQuantity;
