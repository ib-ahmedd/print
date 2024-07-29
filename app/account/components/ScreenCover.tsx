"use client";

import { RootState } from "@store";
import { handleAccountSideBar } from "@store/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ScreenCover() {
  const displayed = useSelector(
    (state: RootState) => state.global.accountSideBarOpen
  );
  const dispatch = useDispatch();

  const pathname = usePathname();
  useEffect(() => {
    if (displayed) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [displayed]);

  useEffect(() => {
    if (displayed) {
      dispatch(handleAccountSideBar(false));
    }
  }, [pathname]);
  return (
    <div
      onClick={() => {
        dispatch(handleAccountSideBar(false));
      }}
      className={`fixed h-screen w-full bg-black opacity-60 z-30 top-0 right-0 ${
        displayed ? "block slg:hidden" : "hidden"
      }`}
    />
  );
}

export default ScreenCover;
