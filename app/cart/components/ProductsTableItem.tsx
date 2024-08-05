import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteItem, removeNoLog } from "@store/cartSlice";
import { AlteredItems, CartItem } from "@types";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetQuantity from "./SetQuantity";
import { AppDispatch, RootState } from "@store";
import { setRouterState } from "@store/globalSlice";

function ProductsTableItem({
  _id,
  product_id,
  product_image,
  product_name,
  price,
  quantity,
  setTableData,
  alteredItems,
  setAlteredItems,
}: ProductsTableItemsProps) {
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <tr className="border border-gray-300 p-4">
      <td className="pl-8">
        <button
          onClick={() => {
            if (isLoggedIn) {
              dispatch(setRouterState(""));
              dispatch(deleteItem({ itemId: _id ? _id : "", accessToken }));
            } else {
              dispatch(setRouterState(""));
              dispatch(removeNoLog(_id ? _id : ""));
            }
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
        <Link href={`/product/${product_id}`} className="text-site-orange">
          {product_name}
        </Link>
      </td>
      <td>
        <p>${price.toFixed(2)}</p>
      </td>
      <td>
        <SetQuantity
          id={_id ? _id : ""}
          productQuantity={quantity}
          setTableData={setTableData}
          alteredItems={alteredItems}
          setAlteredItems={setAlteredItems}
        />
      </td>
      <td>${(price * quantity).toFixed(2)}</td>
    </tr>
  );
}

interface ProductsTableItemsProps extends CartItem {
  alteredItems: AlteredItems[];
  setTableData: Dispatch<SetStateAction<CartItem[]>>;
  setAlteredItems: Dispatch<SetStateAction<AlteredItems[]>>;
}

export default ProductsTableItem;
