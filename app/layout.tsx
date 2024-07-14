import React from "react";
import "./globals.css";
import Head from "next/head";
import { Footer, Navbar } from "./components";

export const metadata = {
  title: "Home - Custom Printing",
  description: "We print what you want",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="w-full overflow-x-hidden scroll-smooth">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className="text-site-blue">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;

interface RootLayoutProps {
  children: React.ReactNode;
}
