import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteItem, removeNoLog } from "@store/cartSlice";
import { AlteredItems, CartItem } from "@types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SetQuantity from "./SetQuantity";
import { AppDispatch, RootState } from "@store";

function MobileTableItem({
  _id,
  product_image,
  product_name,
  price,
  quantity,
  setTableData,
  alteredItems,
  setAlteredItems,
}: MobileTableItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );

  return (
    <>
      <tr>
        <td>
          <span className="flex justify-end p-2">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  dispatch(deleteItem({ itemId: _id, accessToken }));
                } else {
                  dispatch(removeNoLog(_id));
                }
              }}
              className="w-5 h-5 rounded-full flex items-center justify-center border border-gray-400 text-gray-400 text-sm"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <span className="flex justify-center py-2">
            <img src={product_image} alt={product_name} className="w-[4em]" />
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h4>Product:</h4>
            <p>{product_name}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h4>Price:</h4>
            <p>${price.toFixed(2)}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h4>Quantity:</h4>
            <SetQuantity
              id={_id}
              productQuantity={quantity}
              setTableData={setTableData}
              alteredItems={alteredItems}
              setAlteredItems={setAlteredItems}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h4>Subtotal:</h4>
            <p>${(price * quantity).toFixed(2)}</p>
          </div>
        </td>
      </tr>
    </>
  );
}

interface MobileTableItemProps extends CartItem {
  setTableData: Dispatch<SetStateAction<CartItem[]>>;
  alteredItems: AlteredItems[];
  setAlteredItems: Dispatch<SetStateAction<AlteredItems[]>>;
}

export default MobileTableItem;
