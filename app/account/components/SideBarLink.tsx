"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { SideBarLinkType } from "../types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SideBarLink({ path, title, icon }: SideBarLinkType) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (pathname === "/account" + path) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  return (
    <Link
      href={"/account" + path}
      className={`w-full flex gap-4 p-2 slg:p-4 text-sm slg:text-base border-b slg:border-none  bg-white hover:bg-gray-50 rounded-md  ${
        active ? "shadow-none text-site-orange" : "slg:shadow-md"
      }`}
    >
      <span className="text-lg slg:text-xl">
        <FontAwesomeIcon icon={icon} />
      </span>
      {title}
    </Link>
  );
}

export default SideBarLink;
