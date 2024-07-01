"use client";
import { navLinksArray } from "@constants";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Navbar() {
  const [accountLinksOpen, setAccountLinksOpen] = useState(false);
  return (
    <nav className="flex justify-between py-6">
      <Link href="/" className="relative w-32 h-14">
        <Image
          src="/images/logo/logo.svg"
          alt="print logo"
          fill
          className="object-contain"
        />
      </Link>

      <div className="flex items-center gap-8 text-sm">
        {navLinksArray.map((item) => (
          <NavLink key={item.title} {...item} />
        ))}
        <div className="relative">
          <div
            className="text-site-blue hover:text-site-orange flex items-center gap-2 cursor-pointer"
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
                href="/account"
                className="p-4 hover:text-site-orange-hover"
              >
                MY ACCOUNT
              </Link>
              <Link href="/cart" className="p-4 hover:text-site-orange-hover">
                CART
              </Link>
            </div>
          </div>
        </div>
        <button className="text-lg text-site-orange-hover flex gap-3 font-medium">
          $0.00
          <span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
