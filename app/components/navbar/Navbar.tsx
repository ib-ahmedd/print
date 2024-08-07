"use client";
import { navLinksArray } from "@app/constants";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBars,
  faCartShopping,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAccountSideBar,
  handleAppLoaded,
  handleLogin,
  toggleNavCart,
} from "@store/globalSlice";
import { RootState } from "@store";
import { itemsCount, subtotal } from "@utils/subtotal";

function Navbar() {
  const [accountLinksOpen, setAccountLinksOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [gradientBg, setGradientBg] = useState(true);
  const pathname = usePathname();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    setNavOpen(false);
    dispatch(handleAccountSideBar(false));
    setAccountLinksOpen(false);
    if (pathname === "/contact" || pathname === "/" || pathname === "/about") {
      setGradientBg(true);
    } else {
      setGradientBg(false);
    }

    if (pathname === "/login") {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  }, [pathname]);
  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");
    if (userInfo) {
      dispatch(handleLogin(JSON.parse(userInfo)));
    }
  }, []);
  useEffect(() => {
    dispatch(handleAppLoaded());
  }, []);
  return (
    <nav
      className={`relative flex flex-col w-full border-b md:border-none bg-white ${
        gradientBg && "md:bg-gradient-to-r from-[#FFFFFF00] to-[#EBEDEFDE]"
      }`}
    >
      <div
        className={`w-full justify-center items-center py-4 ${
          navHidden ? "flex" : "hidden"
        }`}
      >
        <Link href="/" className="relative w-24 md:w-32 h-8 md:h-14">
          <Image
            src="/images/logo/logo.svg"
            alt="print logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
      <div
        className={`flex justify-between py-3 md:py-6 w-full bg-white md:bg-transparent z-30 ${
          navHidden && "hidden"
        }`}
      >
        <Link href="/" className="relative w-24 md:w-32 h-8 md:h-14">
          <Image
            src="/images/logo/logo.svg"
            alt="print logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-12 text-sm">
          <div className="hidden md:flex items-center gap-8">
            {navLinksArray.map((item) => (
              <NavLink key={item.title} {...item} />
            ))}
            <div className="relative">
              <div
                className={`z-20 text-site-blue flex items-center gap-2 cursor-pointer ${
                  pathname.includes("/account") ||
                  pathname === "/cart" ||
                  pathname === "/login"
                    ? "text-site-orange"
                    : "text-site-blue hover:text-navlink-hover"
                }`}
                onClick={() => {
                  setAccountLinksOpen((prev) => !prev);
                }}
              >
                <span>ACCOUNT</span>
                <div className="h-4 w-4">
                  <FontAwesomeIcon
                    icon={accountLinksOpen ? faAngleUp : faAngleDown}
                  />
                </div>
              </div>

              <div
                className={`absolute top-10 -left-5 w-52 ${
                  !accountLinksOpen && "overflow-hidden"
                }`}
              >
                <div
                  className={`flex flex-col bg-white transition duration-100 ${
                    accountLinksOpen
                      ? "translate-y-0 shadow-lg"
                      : "-translate-y-full"
                  }`}
                >
                  <Link
                    href={isLoggedIn ? "/account/overview" : "/login"}
                    className={`p-4 ${
                      pathname.includes("/account")
                        ? "text-site-orange"
                        : "text-site-blue hover:text-navlink-hover"
                    }`}
                  >
                    MY ACCOUNT
                  </Link>
                  <Link
                    href="/cart"
                    className={`p-4 ${
                      pathname === "/cart"
                        ? "text-site-orange"
                        : "text-site-blue hover:text-navlink-hover"
                    }`}
                  >
                    CART
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              dispatch(toggleNavCart());
            }}
            className="text-base md:text-lg text-site-orange-hover flex gap-3 font-medium"
          >
            ${subtotal(cartItems).toFixed(2)}
            <span className="relative">
              <FontAwesomeIcon icon={faCartShopping} />
              <p className="absolute -top-3 -right-3 bg-site-orange text-sm text-site-blue font-semibold px-2 rounded-full shadow-2xl border-2 border-white">
                {itemsCount(cartItems)}
              </p>
            </span>
          </button>
          <button
            onClick={() => {
              setNavOpen((prev) => !prev);
            }}
            className="md:hidden bg-site-orange text-white w-6 h-6 text-sm md:text-lg rounded-sm"
          >
            <FontAwesomeIcon icon={navOpen ? faClose : faBars} />
          </button>
        </div>
      </div>

      {/* --------------------------------------mobile navbar------------------------------------------- */
      /* ---------------------------------------mobile navbar------------------------------------------- */
      /* ---------------------------------------mobile navbar------------------------------------------- */}
      {!navHidden && (
        <div
          className={`md:hidden absolute top-14 left-0 w-full overflow-y-hidden bg-red-500 transition duration-150 z-20 ${
            navOpen ? "translate-y-0 shadow-md" : "-translate-y-full"
          }`}
        >
          <div className={`flex flex-col w-full bg-white text-sm border-t `}>
            <span className="flex flex-col z-10">
              {navLinksArray.map((item) => (
                <NavLink key={item.title} {...item} />
              ))}
              <NavLink title="MY ACCOUNT" path="/account/overview" />
              <NavLink title="CART" path="/cart" />
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
