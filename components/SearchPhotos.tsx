"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchPhotos() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  function handleSearch(value: string) {
    setSearch(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`/admin/photos?${params.toString()}`);
  }

  return (
  <div className="mb-6">
    <input
      type="text"
      placeholder="🔍 Search photos..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full max-w-md rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-green-500"
    />
  </div>
);
}