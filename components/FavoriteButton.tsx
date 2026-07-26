"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FavoriteButton({
  photoId,
}: {
  photoId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    async function loadFavorite() {
      try {
        const response = await fetch("/api/favorites");
        const data = await response.json();

        if (data.success) {
          const exists = data.photos.some(
            (photo: { id: string }) => photo.id === photoId
          );

          setFavorited(exists);
        }
      } catch {
        // Ignore errors when loading initial favorite state
      }
    }

    loadFavorite();
  }, [photoId]);

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

      if (!response.ok) {
        toast.error(data.message || "Something went wrong.");
        return;
      }

      setFavorited(data.favorited);

      setAnimate(true);
      setTimeout(() => setAnimate(false), 250);

      if (data.favorited) {
        toast.success("Added to favorites ❤️");
      } else {
        toast.success("Removed from favorites 🤍");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleFavorite}
      disabled={loading}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`text-3xl transition-all duration-200 hover:scale-125 ${
        animate ? "scale-150" : ""
      } ${loading ? "opacity-50" : ""}`}
    >
      {favorited ? "❤️" : "🤍"}
    </button>
  );
}