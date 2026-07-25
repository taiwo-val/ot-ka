import Image from "next/image";
import Link from "next/link";

const players = [
  {
    id: 1,
    name: "John Doe",
    team: "OT.KA FC",
    number: 10,
    image: "/images/player1.jpg",
  },
  {
    id: 2,
    name: "Michael James",
    team: "OT.KA FC",
    number: 7,
    image: "/images/player2.jpg",
  },
  {
    id: 3,
    name: "David Smith",
    team: "OT.KA FC",
    number: 9,
    image: "/images/player3.jpg",
  },
];

export default function PlayersPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-center text-5xl font-bold">
          Featured Players
        </h1>

        <p className="mt-4 text-center text-zinc-400">
          Meet some of the players captured through the OT.KA lens.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {players.map((player) => (
            <div
              key={player.id}
              className="overflow-hidden rounded-2xl bg-zinc-900 transition hover:-translate-y-2"
            >
              <div className="relative h-80">
                <Image
                  src={player.image}
                  alt={player.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {player.name}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {player.team}
                </p>

                <p className="mt-2 text-green-500">
                  Jersey #{player.number}
                </p>

                <Link
                  href="/gallery"
                  className="mt-6 inline-block rounded-lg bg-green-500 px-5 py-3 font-semibold hover:bg-green-600"
                >
                  View Photos
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}