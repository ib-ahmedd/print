import { ProductsType } from "@types";
import SideBarProducts from "./SideBarProducts";
import { Dispatch, useEffect, useState } from "react";

function SideBar({
  categories,
  categoriesCount,
  loading,
  hotDeals,
  dispatch,
  selectedCategory,
}: SideBarProps) {
  let loadingArray = [1, 2, 3, 4];

  const [pageLoaded, setPageLoaded] = useState(false);
  const [priceRange, setPriceRange] = useState(40);

  useEffect(() => {
    if (!loading) {
      setPageLoaded(true);
    }
  }, [loading]);

  return (
    <aside className="w-full md:w-1/4  md:flex flex-col md:pr-4 lg:pr-12 md:border-r gap-8">
      <div className="flex flex-col gap-4">
        <h2>Filter by price</h2>
        <div className="flex flex-col gap-6">
          <input
            type="range"
            name="priceRange"
            min={16}
            max={40}
            step={2}
            value={priceRange}
            onChange={(e) => {
              setPriceRange(parseInt(e.target.value));
            }}
            className="accent-site-orange"
          />
          <div className="flex w-full justify-between text-sm font-bold">
            <p>$15</p>
            <p>${priceRange}</p>
          </div>
        </div>

        <div className="w-full flex justify-between text-sm">
          <button
            onClick={() => {
              setPriceRange(40);
              dispatch({ type: "RESET_PRICE_RANGE" });
            }}
            className="shrink-0 bg-site-orange text-white py-2 px-4 w-fit rounded-md"
          >
            RESET
          </button>
          <button
            onClick={() => {
              dispatch({ type: "SET_PRICE_RANGE", payload: priceRange });
            }}
            className="shrink-0 bg-site-orange text-white py-2 px-4 w-fit rounded-md"
          >
            APPLY
          </button>
        </div>
      </div>

      {/*-----------categories section------------- */}

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">Categories</h3>
        {pageLoaded && (
          <button
            onClick={() => {
              dispatch({ type: "SET_CATEGORY", payload: "default" });
            }}
            className={`flex justify-between ${
              selectedCategory === "default" && "font-bold"
            }`}
          >
            <p className="text-site-orange">Default</p>
          </button>
        )}
        {pageLoaded &&
          categories?.map((item) => {
            return (
              <button
                onClick={() => {
                  dispatch({ type: "SET_CATEGORY", payload: item });
                }}
                key={item}
                className={`flex justify-between ${
                  selectedCategory === item && "font-bold"
                }`}
              >
                <p className="text-site-orange">{item}s</p>
                <p
                  className={
                    selectedCategory === item ? "text-site-orange" : ""
                  }
                >
                  ({categoriesCount && categoriesCount[item]})
                </p>
              </button>
            );
          })}

        {!pageLoaded && (
          <div className="loading w-full flex flex-col gap-4">
            <div className="w-full h-6 rounded-md"></div>
            <div className="w-full h-6 rounded-md"></div>
            <div className="w-full h-6 rounded-md"></div>
          </div>
        )}
      </div>

      {/* ------------hottest deals section----------------- */}

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">Hottest Deals</h3>
        <div className="flex flex-wrap justify-between">
          {!pageLoaded &&
            loadingArray.map((item) => (
              <div
                key={item}
                className="w-[47%] flex flex-col gap-4 mb-4 loading"
              >
                <div className="w-full h-32"></div>
                <div className="w-full h-4"></div>
                <div className="w-16 h-4"></div>
              </div>
            ))}

          {pageLoaded &&
            hotDeals?.map((item) => (
              <SideBarProducts key={item._id} {...item} />
            ))}
        </div>
      </div>
    </aside>
  );
}
interface SideBarProps {
  categories: string[] | undefined;
  hotDeals: ProductsType[] | undefined;
  categoriesCount: any;
  loading: boolean;
  priceRange: number;
  dispatch: Dispatch<any>;
  selectedCategory: string;
}

export default SideBar;
