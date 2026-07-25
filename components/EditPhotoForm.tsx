"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Photo = {
  id: string;
  title: string;
  match: string;
  homeTeam: string;
  awayTeam: string;
  player: string | null;
  category: string;
  featured: boolean;
};

export default function EditPhotoForm({
  photo,
}: {
  photo: Photo;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(photo.title);
  const [match, setMatch] = useState(photo.match);
  const [homeTeam, setHomeTeam] = useState(photo.homeTeam);
  const [awayTeam, setAwayTeam] = useState(photo.awayTeam);
  const [player, setPlayer] = useState(photo.player ?? "");
  const [category, setCategory] = useState(photo.category);
  const [featured, setFeatured] = useState(photo.featured);
  const [loading, setLoading] = useState(false);

   async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  console.log("Save button clicked!");

  setLoading(true);

  try {
    const response = await fetch(`/api/photos/${photo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        match,
        homeTeam,
        awayTeam,
        player,
        category,
        featured,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("Photo updated successfully!");
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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Title"
      />

      <input
        value={match}
        onChange={(e) => setMatch(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Match"
      />

      <input
        value={homeTeam}
        onChange={(e) => setHomeTeam(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Home Team"
      />

      <input
        value={awayTeam}
        onChange={(e) => setAwayTeam(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Away Team"
      />

      <input
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Player"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded bg-zinc-900 p-3"
        placeholder="Category"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Featured
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded bg-green-600 px-6 py-3 hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}