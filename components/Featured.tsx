import Image from "next/image";

const photos = [
  "/images/match1.jpg",
  "/images/match2.jpg",
  "/images/match3.jpg",
];

export default function FeaturedPhotos() {
  return (
    <section className="bg-zinc-950 px-6 py-20">
      <h2 className="mb-10 text-center text-4xl font-bold">
        Featured Photos
      </h2>

      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition hover:scale-105"
          >
            <div className="relative h-80">
              <Image
                src={photo}
                alt="Football Photo"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5">
              <h3 className="text-xl font-semibold">
                Match Day #{index + 1}
              </h3>

              <p className="mt-2 text-zinc-400">
                OT.KA Football Photography
              </p>

              <button className="mt-5 w-full rounded-lg bg-green-500 py-3 font-semibold hover:bg-green-600">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}