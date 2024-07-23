"use client";

import { RootState } from "@store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Account() {
  const user = useSelector((state: RootState) => state.global.user);
  const isLoggedIn = useSelector((state: RootState) => state.global.isLoggedIn);
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);
  return (
    <main>
      <h1>{user.user_name}</h1>
    </main>
  );
}

export default Account;
