import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: user.id,
    },
    include: {
      photo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold">
          ❤️ My Favorites
        </h1>

        <p className="mb-8 text-zinc-400">
          {favorites.length} favorite
          {favorites.length === 1 ? "" : "s"}
        </p>

        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-20 text-center">
            <div className="mb-4 text-6xl">💔</div>

            <h2 className="mb-2 text-2xl font-bold">
              No Favorites Yet
            </h2>

            <p className="mb-6 text-zinc-400">
              Start exploring the gallery and save your favorite football moments.
            </p>

            <Link
              href="/gallery"
              className="rounded-lg bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <Link
                key={favorite.id}
                href={`/photos/${favorite.photo.id}`}
              >
                <div className="overflow-hidden rounded-2xl bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20">
                  <Image
                    src={favorite.photo.image}
                    alt={favorite.photo.title}
                    width={700}
                    height={500}
                    className="h-64 w-full object-cover transition duration-300 hover:scale-105"
                  />

                  <div className="p-5">
                    <h2 className="mb-2 text-xl font-bold">
                      {favorite.photo.title}
                    </h2>

                    <p className="mb-3 text-zinc-400">
                      {favorite.photo.category}
                    </p>

                    <span className="inline-block rounded-full bg-green-600 px-3 py-1 text-sm">
                      ❤️ Favorite
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}