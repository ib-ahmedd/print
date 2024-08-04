"use client";
import { useEffect, useState } from "react";
import {
  CompleteRegister,
  LoginForm,
  ResetOTP,
  ResetPassword,
  SignUpForm,
} from "./components";
import OTP from "./components/OTP";
import { Inview } from "./types";
import ForgotEmailForm from "./components/ForgotEmailForm";
import { useDispatch } from "react-redux";
import { resetRouterState } from "@store/globalSlice";

function Login() {
  const [inView, setInView] = useState<Inview>("login");
  const [pendingUser, setPendingUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [passwordResetEmail, setPasswordResetEmail] = useState("");
  const [authToken, setAuthToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetRouterState());
    };
  }, []);
  return (
    <main className="w-full flex">
      <section className="h-[40em] flex-col items-center pt-8">
        <div className="w-full md:max-w-[30em] relative overflow-x-hidden h-8 mt-0">
          <div
            className={`absolute top-0 left-0 w-full flex justify-center shrink-0 transition duration-150 ${
              inView === "complete"
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
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
              inView !== ("OTP" && "complete") && "-translate-x-full opacity-0"
            }`}
          >
            <h2 className="w-fit text-base md:text-lg font-normal border-b-2 border-site-orange">
              Verify Email
            </h2>
          </div>

          <div
            className={`absolute top-0 left-0 w-full shrink-0 flex justify-center gap-8 text-base md:text-lg transition duration-150 ${
              (inView === "login" || inView === "register") &&
              "translate-x-0 opacity-100"
            } ${inView === "OTP" && "translate-x-full opacity-0"} ${
              inView !== "OTP" &&
              inView !== "register" &&
              inView !== "login" &&
              "-translate-x-full"
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

          <div
            className={`absolute top-0 left-0 w-full flex justify-center shrink-0 transition duration-150 ${
              inView === "forgot-email" ||
              inView === "reset-OTP" ||
              inView === "reset-password"
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            <h2 className="w-fit text-base md:text-lg font-normal border-b-2 border-site-orange">
              Reset password
            </h2>
          </div>
        </div>

        <div className="flex-1 relative w-full md:max-w-[30em] m-auto flex items-center overflow-x-hidden">
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
          <LoginForm inView={inView} setInView={setInView} />
          <ForgotEmailForm
            inView={inView}
            setInView={setInView}
            setPasswordResetEmail={setPasswordResetEmail}
          />
          <ResetOTP
            email={passwordResetEmail}
            inView={inView}
            setInView={setInView}
            setAuthToken={setAuthToken}
          />
          <ResetPassword
            email={passwordResetEmail}
            authToken={authToken}
            inView={inView}
            setInView={setInView}
          />
        </div>
      </section>
    </main>
  );
}

export default Login;
