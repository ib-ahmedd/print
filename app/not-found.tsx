import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <main className="w-full h-[80vh] flex items-center justify-center">
      <section className="flex flex-col items-center gap-4">
        <h1 className="text-7xl md:text-9xl">404</h1>
        <p>Page not found.</p>
        <Link
          href="/"
          className="w-fit py-3 px-10 bg-site-orange text-white text-sm md:text-base rounded-md"
        >
          GO HOME
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
