"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="OT.KA Logo"
            width={45}
            height={45}
            priority
          />

          <span className="text-2xl font-bold tracking-widest">
            OT.KA
          </span>
        </Link>

        {/* Main Menu */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="hover:text-green-500 transition">
            Home
          </Link>

          <Link href="/gallery" className="hover:text-green-500 transition">
            Gallery
          </Link>

          <Link href="/matches" className="hover:text-green-500 transition">
            Matches
          </Link>

          <Link href="/players" className="hover:text-green-500 transition">
            Players
          </Link>

          <Link href="/services" className="hover:text-green-500 transition">
            Services
          </Link>

          <Link href="/contact" className="hover:text-green-500 transition">
            Contact
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/login"
                className="rounded-lg border border-green-600 px-5 py-2 transition hover:bg-green-600"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-green-600 px-5 py-2 transition hover:bg-green-700"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/favorites"
                className="hover:text-green-500 transition"
              >
                ❤️ Favorites
              </Link>

              <Link
                href="/profile"
                className="hover:text-green-500 transition"
              >
                Profile
              </Link>

              {(session.user as any).role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="rounded-lg bg-green-600 px-4 py-2 font-semibold"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}