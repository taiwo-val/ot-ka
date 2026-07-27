import Image from "next/image";
import Link from "next/link";

export default function FeaturedMatch() {
  return (
    <section className="bg-zinc-950 px-6 py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-zinc-900 lg:grid lg:grid-cols-2">

        <div className="relative flex h-96 items-center justify-center bg-black lg:h-full">
          <Image
            src="/images/featured-match.jpg"
            alt="Featured Match"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col justify-center p-10">
          <p className="font-semibold uppercase tracking-[0.3em] text-green-500">
            Featured Match
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            EKSU League Final
          </h2>

          <p className="mt-6 leading-8 text-zinc-400">
            An unforgettable final packed with goals, emotion and incredible
            celebrations. Explore the complete gallery from this amazing match.
          </p>

          <div className="mt-8 space-y-2">
            <p>📅 12 June 2026</p>
            <p>📍 EKSU Stadium</p>
            <p>📷 186 Photos</p>
          </div>

          <Link
            href="/gallery"
            className="mt-10 inline-block w-fit rounded-lg bg-green-500 px-8 py-4 font-semibold transition hover:bg-green-600"
          >
            View Match
          </Link>
        </div>

      </div>
    </section>
  );
}