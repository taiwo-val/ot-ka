"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import FavoriteButton from "./FavoriteButton";

type Photo = {
  id: string;
  title: string;
  image: string;
  category: string;
};

export default function GalleryClient({
  photos,
}: {
  photos: Photo[];
}) {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredPhotos = photos.filter((photo) => {
    const matchesCategory =
      filter === "All" || photo.category === filter;

    const matchesSearch = photo.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {["All", "Match Day", "Training", "Players", "Fans"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-lg px-5 py-2 font-semibold ${
              filter === item
                ? "bg-green-500"
                : "bg-zinc-800"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search photos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo, i) => (
          <div key={photo.id}>
            <Link href={`/photos/${photo.id}`}>
              <Image
                src={photo.image}
                alt={photo.title}
                width={800}
                height={600}
                onClick={() => setIndex(i)}
                className="h-64 w-full rounded-xl object-cover"
              />
            </Link>
<div className="mt-3 flex items-center justify-between">
  <div>
    <h3 className="font-semibold">
      {photo.title}
    </h3>

    <p className="text-zinc-400">
      {photo.category}
    </p>
  </div>

  <FavoriteButton photoId={photo.id} />
</div>
          </div>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={filteredPhotos.map((photo) => ({
          src: photo.image,
        }))}
      />
    </>
  );
}