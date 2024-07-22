"use client";
import { RootState } from "@store";
import { CartItem } from "@types";
import { useDispatch, useSelector } from "react-redux";
import ProductsTableItem from "./ProductsTableItem";
import MobileTableItem from "./MobileTableItem";
import { useEffect, useState } from "react";
import { update } from "@store/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function ProductsTable() {
  const cartItems: CartItem[] = useSelector((state: RootState) => {
    return state.cart.cartitems;
  });

  const [tableData, setTableData] = useState<CartItem[]>([]);
  const [tableAltered, setTableAltered] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTableData(cartItems);
  }, [cartItems]);
  return (
    <>
      {cartUpdated && (
        <div className="w-full flex gap-4 p-2 md:p-4 mb-8 bg-gray-50 border-t-2 border-site-orange">
          <span className="h-5 w-5 rounded-full text-sm bg-site-orange text-white flex items-center justify-center">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <p className="text-sm md:text-base">Cart updated.</p>
        </div>
      )}

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
              setTableAltered={setTableAltered}
              setTableData={setTableData}
              setCartUpdated={setCartUpdated}
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
              setTableAltered={setTableAltered}
              setTableData={setTableData}
              setCartUpdated={setCartUpdated}
            />
          ))}
        </tbody>
      </table>

      <div className="p-4 w-full border border-gray-300 border-t-0 flex justify-end">
        <button
          onClick={() => {
            setTableAltered(false);
            setCartUpdated(true);
            dispatch(update(tableData));
          }}
          disabled={tableAltered ? false : true}
          className={`px-4 py-2 text-white bg-site-orange rounded-md text-sm md:text-base ${
            !tableAltered && "opacity-50"
          }`}
        >
          UPADATE CART
        </button>
      </div>
    </>
  );
}

export default ProductsTable;
