import Link from "next/link";

const latestMatches = [
  {
    title: "League Final 2026",
    date: "12 June 2026",
  },
  {
    title: "Friendly Match",
    date: "28 May 2026",
  },
  {
    title: "Training Session",
    date: "10 May 2026",
  },
];

export default function LatestMatches() {
  return (
    <section className="bg-zinc-950 py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-center">
          Latest Matches
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latestMatches.map((match) => (
            <div
              key={match.title}
              className="rounded-2xl bg-zinc-900 p-6"
            >
              <h3 className="text-xl font-bold">
                {match.title}
              </h3>

              <p className="mt-3 text-zinc-400">
                {match.date}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/matches"
            className="rounded-lg bg-green-500 px-6 py-3 font-semibold hover:bg-green-600"
          >
            View All Matches
          </Link>
        </div>
      </div>
    </section>
  );
}