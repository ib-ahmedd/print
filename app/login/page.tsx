"use client";
import { useState } from "react";
import { CompleteRegister, LoginForm, SignUpForm } from "./components";
import OTP from "./components/OTP";

function Login() {
  const [inView, setInView] = useState<
    "login" | "register" | "OTP" | "complete"
  >("login");
  const [pendingUser, setPendingUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [authToken, setAuthToken] = useState("");
  return (
    <main className="w-full flex">
      <section className="h-[50em] flex-col items-center py-8">
        <div className="w-full md:max-w-[30em] relative overflow-x-hidden h-8">
          <div
            className={`absolute top-0 left-0 w-full flex justify-center shrink-0 transition duration-150 ${
              inView === "complete"
                ? "translate-x-0 opacity-1"
                : "-translate-x-full"
            }`}
          >
            <h2 className="w-fit text-base md:text-lg font-normal border-b-2 border-site-orange">
              Complete Registeration
            </h2>
          </div>

          <div
            className={`absolute top-0 left-0 w-full flex justify-center shrink-0 transition duration-150 ${
              inView === "OTP" && "translate-x-0 opacity-100"
            } ${inView === "complete" && "translate-x-full opacity-0"} ${
              inView === "register" || inView === "login"
                ? "-translate-x-full opacity-0"
                : ""
            }`}
          >
            <h2 className="w-fit text-base md:text-lg font-normal border-b-2 border-site-orange">
              Verify Email
            </h2>
          </div>

          <div
            className={`absolute top-0 left-0 w-full shrink-0 flex justify-center gap-8 text-base md:text-lg transition duration-150 ${
              inView === "login" || inView === "register"
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <button
              onClick={() => {
                setInView("register");
              }}
              className={`${
                inView === "register" && "border-b-2 border-site-orange"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => {
                setInView("login");
              }}
              className={`${
                inView === "login" && "border-b-2 border-site-orange"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full md:max-w-[30em] m-auto flex overflow-x-hidden">
          <CompleteRegister
            inView={inView}
            pendingUser={pendingUser}
            authToken={authToken}
          />
          <OTP
            email={pendingUser.email}
            inView={inView}
            setInView={setInView}
            setAuthToken={setAuthToken}
          />
          <SignUpForm
            inView={inView}
            setPendingUser={setPendingUser}
            setInview={setInView}
          />
          <LoginForm inView={inView} />
        </div>
      </section>
    </main>
  );
}

export default Login;
