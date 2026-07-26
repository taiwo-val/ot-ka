import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function RecentActivity() {
  const recentUsers = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const recentDownloads = await prisma.download.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      photo: true,
      user: true,
    },
  });

  const recentFavorites = await prisma.favorite.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    include: {
      photo: true,
      user: true,
    },
  });

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-3">

      {/* Users */}
      <div className="rounded-xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          👤 New Users
        </h2>

        {recentUsers.map((user) => (
          <div
            key={user.id}
            className="border-b border-zinc-800 py-3"
          >
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="text-sm text-zinc-400">
              {user.email}
            </p>
          </div>
        ))}
      </div>

      {/* Downloads */}
      <div className="rounded-xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          ⬇️ Recent Downloads
        </h2>

        {recentDownloads.map((download) => (
          <div
            key={download.id}
            className="border-b border-zinc-800 py-3"
          >
            <p className="font-semibold">
              {download.photo.title}
            </p>

            <p className="text-sm text-zinc-400">
              {download.user.name}
            </p>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div className="rounded-xl bg-zinc-900 p-6">
        <h2 className="mb-4 text-xl font-bold">
          ❤️ Recent Favorites
        </h2>

        {recentFavorites.map((favorite) => (
          <Link
            key={favorite.id}
            href={`/photos/${favorite.photo.id}`}
            className="block border-b border-zinc-800 py-3"
          >
            <p className="font-semibold">
              {favorite.photo.title}
            </p>

            <p className="text-sm text-zinc-400">
              {favorite.user.name}
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}