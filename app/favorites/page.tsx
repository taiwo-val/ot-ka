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
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-400">
          You haven't added any favorites yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <Link
              key={favorite.id}
              href={`/photos/${favorite.photo.id}`}
            >
              <div className="bg-zinc-900 rounded-xl overflow-hidden hover:bg-zinc-800 transition">
                <Image
                  src={favorite.photo.image}
                  alt={favorite.photo.title}
                  width={600}
                  height={400}
                  className="h-60 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="font-bold">
                    {favorite.photo.title}
                  </h2>

                  <p className="text-zinc-400">
                    {favorite.photo.category}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}