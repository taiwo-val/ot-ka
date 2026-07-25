import Image from "next/image";
import Link from "next/link";

export default function FeaturedMatch() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="mx-auto max-w-7xl rounded-3xl bg-zinc-900 overflow-hidden lg:grid lg:grid-cols-2">

        <div className="relative h-96 lg:h-full">
          <Image
            src="/images/featured-match.jpg"
            alt="Featured Match"
            fill
            className="object-cover"
          />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <p className="text-green-500 uppercase tracking-[0.3em] font-semibold">
            Featured Match
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            EKSU League Final
          </h2>

          <p className="mt-6 text-zinc-400 leading-8">
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
            className="mt-10 inline-block w-fit rounded-lg bg-green-500 px-8 py-4 font-semibold hover:bg-green-600"
          >
            View Match
          </Link>
        </div>

      </div>
    </section>
  );
}