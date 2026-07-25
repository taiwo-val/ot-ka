"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`block rounded p-3 transition ${
        active
          ? "bg-green-600 text-white"
          : "hover:bg-zinc-800"
      }`}
    >
      {children}
    </Link>
  );
}