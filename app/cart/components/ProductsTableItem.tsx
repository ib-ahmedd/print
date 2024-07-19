import SetQuantity from "@components/SetQuantity";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { remove } from "@store/cartSlice";
import { CartItem } from "@types";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function ProductsTableItem({
  _id,
  product_image,
  product_name,
  price,
  quantity,
  setTableAltered,
}: ProductsTableItemsProps) {
  const [productQuantity, setProductQuantity] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productQuantity !== quantity) {
      setTableAltered(true);
    } else {
      setTableAltered(false);
    }
  }, [productQuantity, quantity]);
  return (
    <tr className="border border-gray-300 p-4">
      <td className="pl-8">
        <button
          onClick={() => {
            dispatch(remove(_id));
          }}
          className="w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 text-gray-400"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </td>
      <td>
        <img src={product_image} alt={product_name} className="w-[4em] my-4" />
      </td>
      <td>
        <Link href={`/product/${_id}`} className="text-site-orange">
          {product_name}
        </Link>
      </td>
      <td>
        <p>${price.toFixed(2)}</p>
      </td>
      <td>
        <SetQuantity
          productQuantity={productQuantity}
          setProductQuantity={setProductQuantity}
        />
      </td>
      <td>${(price * productQuantity).toFixed(2)}</td>
    </tr>
  );
}

interface ProductsTableItemsProps extends CartItem {
  setTableAltered: Dispatch<SetStateAction<boolean>>;
}

export default ProductsTableItem;
