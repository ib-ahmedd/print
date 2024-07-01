"use client";
import { NavLinkProps } from "@types";
import Link from "next/link";
import useActive from "./hooks/useActive";

function NavLink({ path, title }: NavLinkProps) {
  const active = useActive(path);
  return (
    <Link
      href={path}
      className={`${
        active ? "text-site-orange" : "text-site-blue"
      } hover:text-site-orange-hover`}
    >
      {title}
    </Link>
  );
}

export default NavLink;
