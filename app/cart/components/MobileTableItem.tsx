import SetQuantity from "@components/SetQuantity";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { remove } from "@store/cartSlice";
import { CartItem } from "@types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function MobileTableItem({
  _id,
  product_image,
  product_name,
  price,
  quantity,
  setTableAltered,
}: MobileTableItemProps) {
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
    <>
      <tr>
        <td>
          <span className="flex justify-end p-2">
            <button
              onClick={() => {
                dispatch(remove(_id));
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
              productQuantity={productQuantity}
              setProductQuantity={setProductQuantity}
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h4>Subtotal:</h4>
            <p>${(price * productQuantity).toFixed(2)}</p>
          </div>
        </td>
      </tr>
    </>
  );
}

interface MobileTableItemProps extends CartItem {
  setTableAltered: Dispatch<SetStateAction<boolean>>;
}

export default MobileTableItem;
