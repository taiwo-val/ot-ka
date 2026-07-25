"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({
  id,
}: {
  id: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) return;

    setLoading(true);

    const response = await fetch(`/api/auth/photos/${id}`, {
      method: "DELETE",
    });

    console.log("Status:", response.status);

const text = await response.text();
console.log("Response:", text);

let result;

try {
  result = JSON.parse(text);
} catch {
  alert("API did not return JSON.");
  return;
}

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("✅ Photo deleted successfully!");

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-3 py-2 hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}