"use client";
import { RootState } from "@store";
import { AlteredItems, CartItem } from "@types";
import { useDispatch, useSelector } from "react-redux";
import ProductsTableItem from "./ProductsTableItem";
import MobileTableItem from "./MobileTableItem";
import { useEffect, useState } from "react";
import {
  cartAltered,
  cartLoading,
  cartUpdated,
  mergeCartItems,
  updateNoLog,
} from "@store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function ProductsTable() {
  const cartItems: CartItem[] = useSelector((state: RootState) => {
    return state.cart.items;
  });

  const [tableData, setTableData] = useState<CartItem[]>([]);
  const [alteredItems, setAlteredItems] = useState<AlteredItems[]>([]);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const accessToken = useSelector(
    (state: RootState) => state.global.accessToken
  );
  const tableAltered = useSelector(
    (state: RootState) => state.cart.cartAltered
  );
  const tableUpdated = useSelector(
    (state: RootState) => state.cart.cartUpdated
  );
  const loading = useSelector((state: RootState) => state.cart.loading);

  const routerState = useSelector(
    (state: RootState) => state.global.routerState
  );

  const addedItem = useSelector((state: RootState) => state.cart.buyAgainItem);

  function handleCartUpdate() {
    try {
      if (isLoggedIn) {
        dispatch(cartLoading(true));
        let updatedItems = 0;
        alteredItems.forEach(async (item) => {
          await axios.patch("http://localhost:4000/api/update-cart", item, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          updatedItems = updatedItems + 1;
          if (updatedItems === alteredItems.length) {
            dispatch(mergeCartItems(alteredItems));
            dispatch(cartLoading(false));
            setAlteredItems([]);
          }
        });
      } else {
        dispatch(updateNoLog(tableData));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTableData(cartItems);
  }, [cartItems]);
  useEffect(() => {
    if (alteredItems.length === 0) {
      dispatch(cartAltered(false));
    } else {
      dispatch(cartAltered(true));
      dispatch(cartUpdated(false));
    }
  }, [alteredItems]);
  return (
    <>
      <div className="w-full overflow-y-hidden">
        <div
          className={`w-full flex gap-4 p-2 md:p-4 mb-2 md:mb-4 bg-gray-50 border-t-2 border-site-orange transition duration-150 ${
            tableUpdated || routerState !== ""
              ? "translate-y-0"
              : "-translate-y-full"
          }`}
        >
          <span className="h-5 w-5 rounded-full text-sm bg-site-orange text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <p className="text-sm md:text-base">
            {routerState === "buy-again"
              ? `${addedItem.quantity} x ${addedItem.product_name} added to cart`
              : "Cart updated."}
          </p>
        </div>
      </div>

      <table className="w-full hidden md:table">
        <thead>
          <tr className="text-left border border-gray-300 px-8 h-12 bg-gray-50">
            <th></th>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <ProductsTableItem
              key={item._id}
              {...item}
              setTableData={setTableData}
              alteredItems={alteredItems}
              setAlteredItems={setAlteredItems}
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>

      {/* -----------------mobile table----------------------------------- */}

      <table className="w-full table md:hidden mobile_table">
        <tbody>
          {tableData.map((item) => (
            <MobileTableItem
              key={item._id}
              {...item}
              setTableData={setTableData}
              alteredItems={alteredItems}
              setAlteredItems={setAlteredItems}
            />
          ))}
        </tbody>
      </table>

      <div className="p-4 w-full border border-gray-300 border-t-0 flex justify-end">
        {loading ? (
          <button
            onClick={handleCartUpdate}
            disabled
            className={`px-4 py-2 text-white bg-site-orange rounded-md text-sm md:text-base opacity-50`}
          >
            UPDATING...
          </button>
        ) : (
          <button
            onClick={handleCartUpdate}
            disabled={tableAltered ? false : true}
            className={`px-4 py-2 text-white bg-site-orange rounded-md text-sm md:text-base ${
              !tableAltered && "opacity-50"
            }`}
          >
            UPADATE CART
          </button>
        )}
      </div>
    </>
  );
}

export default ProductsTable;
