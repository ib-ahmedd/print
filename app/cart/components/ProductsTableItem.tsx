import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { remove } from "@store/cartSlice";
import { CartItem } from "@types";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SetQuantity from "./SetQuantity";

function ProductsTableItem({
  _id,
  product_image,
  product_name,
  price,
  quantity,
  setTableAltered,
  setTableData,
  setCartUpdated,
}: ProductsTableItemsProps) {
  const dispatch = useDispatch();

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
          id={_id}
          productQuantity={quantity}
          setTableData={setTableData}
          setTableAltered={setTableAltered}
          setCartUpdated={setCartUpdated}
        />
      </td>
      <td>${(price * quantity).toFixed(2)}</td>
    </tr>
  );
}

interface ProductsTableItemsProps extends CartItem {
  setTableAltered: Dispatch<SetStateAction<boolean>>;
  setCartUpdated: Dispatch<SetStateAction<boolean>>;
  setTableData: Dispatch<SetStateAction<CartItem[]>>;
}

export default ProductsTableItem;
