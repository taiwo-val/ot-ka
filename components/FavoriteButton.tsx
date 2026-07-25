"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function FavoriteButton({
  photoId,
}: {
  photoId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);

  async function handleFavorite() {
    setLoading(true);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photoId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFavorited(data.favorited);

        if (data.favorited) {
  toast.success("Added to favorites ❤️");
} else {
  toast("Removed from favorites 🤍");
}
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      className="text-2xl transition hover:scale-110 disabled:opacity-50"
    >
      {favorited ? "❤️" : "🤍"}
    </button>
  );
}