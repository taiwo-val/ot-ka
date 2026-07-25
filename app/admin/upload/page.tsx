"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UploadPage() {
  const [loading, setLoading] = useState(false);

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);

  try {
    const form = e.currentTarget;

    const imageInput = form.elements.namedItem(
      "image"
    ) as HTMLInputElement;

    if (!imageInput.files?.length) {
      alert("Please select an image.");
      return;
    }

    const image = imageInput.files[0];

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(fileName, image);

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data } = supabase.storage
  .from("photos")
  .getPublicUrl(fileName);

// Get all form values
const formData = new FormData(form);

const response = await fetch("/api/auth/photos", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: formData.get("title"),
    match: formData.get("match"),
    homeTeam: formData.get("homeTeam"),
    awayTeam: formData.get("awayTeam"),
    player: formData.get("player"),
    category: formData.get("category"),
    date: formData.get("date"),
    featured: formData.get("featured") === "on",

    image: data.publicUrl,
    storagePath: fileName,
  }),
});

console.log("Status:", response.status);
console.log("Content-Type:", response.headers.get("content-type"));

const text = await response.text();

console.log("API Response:", text);

let result;

try {
  result = JSON.parse(text);
} catch {
  alert("API did not return JSON.");
  console.log(text);
  return;
}

if (!result.success) {
  alert(result.message);
  return;
}

alert("✅ Photo uploaded and saved successfully!");

form.reset();

  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Upload Football Photo
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            name="title"
            type="text"
            placeholder="Photo Title"
            required
            className="w-full rounded-lg border p-3 bg-white text-black"
          />

          <input
            name="match"
            type="text"
            placeholder="Match Name"
            required
            className="w-full rounded-lg border p-3 bg-white text-black"
          />

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="homeTeam"
              type="text"
              placeholder="Home Team"
              required
              className="w-full rounded-lg border p-3 bg-white text-black"
            />

            <input
              name="awayTeam"
              type="text"
              placeholder="Away Team"
              required
              className="w-full rounded-lg border p-3 bg-white text-black"
            />

          </div>

          <input
            name="player"
            type="text"
            placeholder="Player (Optional)"
            className="w-full rounded-lg border p-3 bg-white text-black"
          />

          <input
            name="category"
            type="text"
            placeholder="Category"
            required
            className="w-full rounded-lg border p-3 bg-white text-black"
          />

          <input
            name="date"
            type="date"
            required
            className="w-full rounded-lg border p-3 bg-white text-black"
          />

          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="w-full"
          />

          <label className="flex items-center gap-3">
            <input
              name="featured"
              type="checkbox"
            />
            Featured Photo
          </label>

          <button
            disabled={loading}
            className="w-full bg-green-600 py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Photo"}
          </button>

        </form>

      </div>
    </main>
  );
}