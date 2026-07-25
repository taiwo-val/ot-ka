import Image from "next/image";
import Link from "next/link";

export default function PhotoOfTheWeek() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src="/images/photo-week.jpg"
            alt="Photo of the Week"
            width={900}
            height={700}
            className="rounded-3xl object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div>
          <p className="text-green-500 font-semibold uppercase tracking-[0.3em]">
            Photo of the Week
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            The Winning Moment
          </h2>

          <p className="mt-6 text-lg text-zinc-400 leading-8">
            A superb performance against the rivary team. 
            Moments like these define football and tell unforgettable stories.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="/images/photo-week.jpg"
              download
              className="rounded-lg bg-green-500 px-8 py-4 font-semibold hover:bg-green-600"
            >
              Download
            </a>

            <Link
              href="/gallery"
              className="rounded-lg border border-zinc-700 px-8 py-4 hover:border-green-500"
            >
              View Gallery
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}