"use client";

import { RootState } from "@store";
import { useSelector } from "react-redux";

function Account() {
  const user = useSelector((state: RootState) => state.global.user);
  return (
    <main>
      <h1>{user.user_name}</h1>
    </main>
  );
}

export default Account;
