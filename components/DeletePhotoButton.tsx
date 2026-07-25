"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePhotoButton({
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

    try {
      const response = await fetch(`/api/photos/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      alert("Photo deleted successfully!");
      router.push("/admin/photos");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-red-600 px-6 py-3 font-semibold hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Photo"}
    </button>
  );
}