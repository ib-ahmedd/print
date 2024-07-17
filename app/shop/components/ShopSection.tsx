import { ProductsType } from "@types";
import { loadingShopProductsArray, sortOptionsArray } from "../constants";
import Product from "@components/Product";
import ProductSkeleton from "@components/ProductSkeleton";
import PageBtns from "./PageBtns";
import { Dispatch } from "react";

function ShopSection({
  products,
  loading,
  productsCount,
  page,
  sortOption,
  dispatch,
}: ShopSectionProps) {
  const countStart = page === 1 ? 0 : (page - 1) * 9;
  const countEnd = page * 9;
  return (
    <section className="flex-1 flex-col px-0 md:px-4 lg:px-12 mb-12">
      <h3 className="text-gray-500">Home / Shop</h3>
      <h1 className="text-site-orange font-semibold">Shop</h1>
      <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-4 md:mt-12">
        {!loading ? (
          productsCount && productsCount > 9 ? (
            <p>
              Showing {countStart + 1}-
              {countEnd > productsCount ? productsCount : countEnd} of{" "}
              {productsCount} results
            </p>
          ) : (
            <p>Showing all {productsCount} results</p>
          )
        ) : (
          <div className="loading">
            <div className="h-4 w-60"></div>
          </div>
        )}
        <select
          className="w-fit bg-transparent hover:cursor-pointer"
          name="sortOption"
          value={sortOption}
          disabled={loading}
          onChange={(e) => {
            dispatch({ type: "SET_SORT_OPTION", payload: e.target.value });
          }}
        >
          {sortOptionsArray.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-[2%] mt-8">
        {!loading &&
          products?.map((item) => <Product key={item._id} {...item} />)}
        {loading &&
          loadingShopProductsArray.map((item) => (
            <ProductSkeleton key={item} />
          ))}
      </div>

      <PageBtns productsCount={productsCount} page={page} dispatch={dispatch} />
    </section>
  );
}

interface ShopSectionProps {
  loading: boolean;
  products: ProductsType[] | undefined;
  productsCount: number | undefined;
  page: number;
  sortOption: string;
  dispatch: Dispatch<any>;
}

export default ShopSection;
