import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useActive(path: string) {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (pathname === path) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);
  return active;
}

export default useActive;
