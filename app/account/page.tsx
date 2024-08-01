"use client";

import { RootState } from "@store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Account() {
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      router.replace("/account/overview");
    }
  }, [isLoggedIn]);
  return (
    <main>
      <h2>Redirecting...</h2>
    </main>
  );
}

export default Account;
