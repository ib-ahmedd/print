"use client";
import ScreenCover from "./ScreenCover";
import { sidebarLinksArray } from "../constants";
import SideBarLink from "./SideBarLink";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { handleAccountSideBar } from "@store/globalSlice";
import { useEffect } from "react";

function SideBar() {
  const sideBarOpen = useSelector(
    (state: RootState) => state.global.accountSideBarOpen
  );
  const dispatch = useDispatch();
  return (
    <aside
      className={`w-full sm:w-1/2 md:w-2/5 slg:w-1/4 fixed left-0 top-0 slg:static bg-white slg:bg-transparent h-screen slg:h-fit flex flex-col justify-between slg:justify-start px-2 slg:px-0 py-4 slg:py-0 gap-4 shadow-xl slg:shadow-none transition duration-150 z-40 ${
        sideBarOpen ? "translate-x-0" : "-translate-x-[105%] slg:translate-x-0"
      }`}
    >
      <div className="w-full flex flex-col items-end gap-4">
        <button
          onClick={() => {
            dispatch(handleAccountSideBar(false));
          }}
          className="text-xl"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
        {sidebarLinksArray.map((item) => (
          <SideBarLink key={item.title} {...item} />
        ))}
      </div>
      <button className="w-full px-8 py-2 md:py-4 text-sm slg:text-base text-white rounded-md bg-site-orange shadow-md">
        LOG OUT
      </button>
    </aside>
  );
}

export default SideBar;
