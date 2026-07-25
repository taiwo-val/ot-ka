"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-3xl font-extrabold tracking-widest">
          OT.KA
        </Link>

        <div className="hidden gap-8 md:flex">
          <Link href="/" className="hover:text-green-500 transition">
            Home
          </Link>

          <Link href="/gallery" className="hover:text-green-500 transition">
            Gallery
          </Link>

          <Link href="/matches">
          Matches
          </Link>

          <Link href="/players">
          Players
          </Link>


          <Link href="/services" className="hover:text-green-500 transition">
            Services
          </Link>

          <Link href="/contact" className="hover:text-green-500 transition">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}