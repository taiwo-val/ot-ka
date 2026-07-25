"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileForm({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
  };
}) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      alert("Profile updated successfully!");
      router.push("/profile");
      router.refresh();
    } else {
      alert(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-zinc-900 p-8 rounded-xl space-y-6"
    >
      <div>
        <label className="block mb-2">Name</label>

        <input
          className="w-full rounded bg-zinc-800 p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2">Email</label>

        <input
          className="w-full rounded bg-zinc-800 p-3"
          value={user.email}
          disabled
        />
      </div>

      <button
        disabled={loading}
        className="bg-green-600 px-6 py-3 rounded hover:bg-green-700"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}