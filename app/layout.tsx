import React from "react";
import "./globals.css";
import Head from "next/head";
import { Footer, Navbar } from "./components";
import ReduxProvider from "@store/ReduxProvider";
import NavCart from "./nav-cart/NavCart";
import ScreenCover from "@components/ScreenCover";
import { LayoutProps } from "@types";
import "dotenv/config";

export const metadata = {
  title: "Home - Custom Printing",
  description: "We print what you want",
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className="w-full overflow-x-hidden scroll-smooth">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="text-site-blue">
        <ReduxProvider>
          <Navbar />
          <NavCart />
          <ScreenCover />
          {children}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
