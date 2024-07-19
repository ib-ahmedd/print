"use client";
import { RootState } from "@store";
import { CartItem } from "@types";
import { useDispatch, useSelector } from "react-redux";
import ProductsTableItem from "./ProductsTableItem";
import MobileTableItem from "./MobileTableItem";
import { useEffect, useState } from "react";
import { update } from "@store/cartSlice";

function ProductsTable() {
  const cartItems: CartItem[] = useSelector((state: RootState) => {
    return state.cart.cartitems;
  });

  const [tableData, setTableData] = useState<CartItem[]>([]);
  const [tableAltered, setTableAltered] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTableData(cartItems);
  }, [cartItems]);
  return (
    <>
      <table className="hidden md:table">
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
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>

      {/* -----------------mobile table----------------------------------- */}

      <table className="table md:hidden mobile_table">
        <tbody>
          {tableData.map((item) => (
            <MobileTableItem
              key={item._id}
              {...item}
              setTableAltered={setTableAltered}
              setTableData={setTableData}
            />
          ))}
        </tbody>
      </table>

      <div className="p-4 w-full border border-gray-300 border-t-0 flex justify-end">
        <button
          onClick={() => {
            setTableAltered(false);
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
