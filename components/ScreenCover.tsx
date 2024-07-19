"use client";

import { RootState } from "@store";
import { toggleNavCart } from "@store/globalSlice";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ScreenCover() {
  const displayed = useSelector((state: RootState) => state.global.navCartOpen);
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
      dispatch(toggleNavCart());
    }
  }, [pathname]);
  return (
    <div
      onClick={() => {
        dispatch(toggleNavCart());
      }}
      className={`fixed h-screen w-full bg-black opacity-40 z-30 top-0 left-0 ${
        displayed ? "block" : "hidden"
      }`}
    />
  );
}

export default ScreenCover;
