import Image from "next/image";
import Link from "next/link";

const photos = [
  {
    id: 1,
    image: "/images/match1.jpg",
  },
  {
    id: 2,
    image: "/images/match2.jpg",
  },
  {
    id: 3,
    image: "/images/match3.jpg",
  },
];

export default function FeaturedPhotos() {
  return (
    <section className="bg-zinc-950 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Featured Photos
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition hover:scale-[1.02]"
            >
              <div className="relative flex h-80 items-center justify-center bg-black">
                <Image
  src={photo.image}
  alt="Featured football photo"
  fill
  className="object-contain"
/>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                
                </h3>

                <p className="mt-2 text-zinc-400">
                  OT.KA Football Photography
                </p>

                <Link
                  href="/gallery"
                  className="mt-5 block rounded-lg bg-green-600 py-3 text-center font-semibold transition hover:bg-green-700"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}