"use client";
import { NavLinkProps } from "@types";
import Link from "next/link";
import useActive from "./hooks/useActive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function NavLink({ path, title, icon }: NavLinkProps) {
  const active = useActive(path);
  return (
    <Link
      href={path}
      className={`border-b md:border-none py-3 md:py-0 bg-white md:bg-transparent px-4 md:px-0 ${
        active ? "text-site-orange" : "text-site-blue hover:text-navlink-hover"
      }`}
    >
      {icon && (
        <span className="mr-2">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      )}
      {title}
    </Link>
  );
}

export default NavLink;
