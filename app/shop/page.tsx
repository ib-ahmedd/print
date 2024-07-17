"use client";
import { useEffect, useReducer, useState } from "react";
import { ShopSection, SideBar } from "./components";
import useGetProducts from "./hooks/useGetProducts";
import { reducer } from "./reducer";

function ProductPage() {
  const reducerState = {
    page: 1,
    sortOption: "Default sorting",
    priceRange: 40,
    selectedCategory: "default",
  };

  const [state, dispatch] = useReducer(reducer, reducerState);

  const { pageData, loading } = useGetProducts(state);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, [state]);
  return (
    <main className="hero_section px-4 xl:px-20 py-12 flex flex-col-reverse md:flex-row">
      <SideBar
        categories={pageData?.productsCategories}
        categoriesCount={pageData?.categoriesCount}
        loading={loading}
        hotDeals={pageData?.hotDeals}
        priceRange={state.priceRange}
        dispatch={dispatch}
        selectedCategory={state.selectedCategory}
      />
      <ShopSection
        products={pageData?.products}
        loading={loading}
        productsCount={pageData?.productsCount}
        page={state.page}
        sortOption={state.sortOption}
        dispatch={dispatch}
      />
    </main>
  );
}

export default ProductPage;
