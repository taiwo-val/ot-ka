import Link from "next/link";

const matches = [
  {
    id: 1,
    title: "League Final 2026",
    date: "12 June 2026",
    photos: 126,
  },
  {
    id: 2,
    title: "Friendly Match",
    date: "28 May 2026",
    photos: 84,
  },
  {
    id: 3,
    title: "Training Session",
    date: "10 May 2026",
    photos: 56,
  },
];

export default function MatchesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-5xl font-bold">
          Matches Covered
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Browse football events photographed by OT.KA.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div
              key={match.id}
              className="rounded-2xl bg-zinc-900 p-6 transition hover:-translate-y-2 hover:border hover:border-green-500"
            >
              <h2 className="text-2xl font-bold">
                {match.title}
              </h2>

              <p className="mt-3 text-zinc-400">
                {match.date}
              </p>

              <p className="mt-2 text-green-500">
                {match.photos} Photos
              </p>

              <Link
                href="/gallery"
                className="mt-6 inline-block rounded-lg bg-green-500 px-5 py-3 font-semibold hover:bg-green-600"
              >
                View Photos
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}