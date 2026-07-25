"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: photo.title,
    match: photo.match,
    homeTeam: photo.homeTeam,
    awayTeam: photo.awayTeam,
    player: photo.player ?? "",
    category: photo.category,
    featured: photo.featured,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch(`/api/auth/photos/${photo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    console.log("Status:", response.status);

const result = await response.json();
console.log("Result:", result);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert("✅ Photo updated!");

    router.push("/admin/photos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <input
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <input
        value={form.match}
        onChange={(e) =>
          setForm({ ...form, match: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <input
        value={form.homeTeam}
        onChange={(e) =>
          setForm({ ...form, homeTeam: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <input
        value={form.awayTeam}
        onChange={(e) =>
          setForm({ ...form, awayTeam: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <input
        value={form.player}
        onChange={(e) =>
          setForm({ ...form, player: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <input
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="w-full rounded bg-white p-3 text-black"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm({
              ...form,
              featured: e.target.checked,
            })
          }
        />

        Featured Photo
      </label>

      <button
        disabled={loading}
        className="w-full rounded bg-green-600 py-3 font-bold"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

    </form>
  );
}