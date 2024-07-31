"use client";

import Link from "next/link";
import { EmptyPage, PageContainer } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import Product from "@components/Product";
import { useEffect } from "react";
import { getRecent } from "@store/globalSlice";

function page() {
  const recentlyViewed = useSelector(
    (state: RootState) => state.global.recentlyViewed
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecent());
  }, []);
  return (
    <PageContainer heading="Recently viewed">
      {recentlyViewed.length === 0 && (
        <EmptyPage text="You haven't viewed any products recently." />
      )}
      <div className="flex p-2 gap-[1%] flex-wrap">
        {recentlyViewed.length > 0 &&
          recentlyViewed.map((item) => (
            <Product key={item._id} {...item} notShop border />
          ))}
      </div>
    </PageContainer>
  );
}

export default page;
