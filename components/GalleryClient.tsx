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
      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-4">
        {["All", "Match Day", "Training", "Players", "Fans"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-lg px-5 py-2 font-semibold transition ${
              filter === item
                ? "bg-green-600"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search photos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-green-500"
        />
      </div>

      {/* Photos */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPhotos.map((photo, i) => (
          <div
            key={photo.id}
            className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className="relative flex h-72 items-center justify-center bg-black cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-contain transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {photo.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {photo.category}
                  </p>
                </div>

                <FavoriteButton photoId={photo.id} />
              </div>

              <Link
                href={`/photos/${photo.id}`}
                className="mt-5 block rounded-lg bg-green-600 py-3 text-center font-semibold transition hover:bg-green-700"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
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