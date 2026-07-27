import Image from "next/image";
import Link from "next/link";

const gallery = [
  "/images/match1.jpg",
  "/images/match2.jpg",
  "/images/match3.jpg",
  "/images/hero.jpg",
];

export default function GalleryPreview() {
  return (
    <section className="bg-black px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl font-bold">
          Gallery Preview
        </h2>

        <p className="mt-4 text-center text-zinc-400">
          A selection of moments captured on and off the pitch.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900"
            >
              <Image
                src={photo}
                alt={`Gallery ${index + 1}`}
                fill
                className="object-contain transition duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded-lg bg-green-500 px-8 py-4 font-semibold transition hover:bg-green-600"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}