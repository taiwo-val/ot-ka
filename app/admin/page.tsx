import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";
import RecentActivity from "@/components/RecentActivity";
import AdminChart from "@/components/AdminChart";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const photoCount = await prisma.photo.count();

  const userCount = await prisma.user.count();

  const favoriteCount = await prisma.favorite.count();

  const downloadCount = await prisma.photo.aggregate({
    _sum: {
      downloadCount: true,
    },
  });

  const recentPhotos = await prisma.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const topPhotos = await prisma.photo.findMany({
    orderBy: {
      downloadCount: "desc",
    },
    take: 5,
  });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayDownloads = await prisma.download.count({
    where: {
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const todayFavorites = await prisma.favorite.count({
    where: {
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const todayUsers = await prisma.user.count({
    where: {
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const todayPhotos = await prisma.photo.count({
    where: {
      createdAt: {
        gte: todayStart,
      },
    },
  });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            OT.KA Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-400">
            Welcome, {session.user.name}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {today}
          </p>
        </div>

        <LogoutButton />
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Link href="/admin/photos">
          <div className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800">
            <h2 className="text-xl font-semibold">
              📸 Photos
            </h2>

            <p className="mt-2 text-gray-400">
              {photoCount} Photos Uploaded
            </p>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800">
            <h2 className="text-xl font-semibold">
              👥 Users
            </h2>

            <p className="mt-2 text-gray-400">
              {userCount} Registered Users
            </p>
          </div>
        </Link>

        <Link href="/admin/downloads">
          <div className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800">
            <h2 className="text-xl font-semibold">
              ⬇️ Downloads
            </h2>

            <p className="mt-2 text-gray-400">
              {downloadCount._sum.downloadCount ?? 0} Downloads
            </p>
          </div>
        </Link>

        <Link href="/favorites">
          <div className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800">
            <h2 className="text-xl font-semibold">
              ❤️ Favorites
            </h2>

            <p className="mt-2 text-gray-400">
              {favoriteCount} Favorite Photos
            </p>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          ⚡ Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/upload"
            className="rounded-xl bg-green-600 p-5 text-center font-semibold transition hover:bg-green-700"
          >
            📤 Upload Photo
          </Link>

          <Link
            href="/admin/photos"
            className="rounded-xl bg-zinc-900 p-5 text-center font-semibold transition hover:bg-zinc-800"
          >
            📸 Manage Photos
          </Link>

          <Link
            href="/admin/users"
            className="rounded-xl bg-zinc-900 p-5 text-center font-semibold transition hover:bg-zinc-800"
          >
            👥 Manage Users
          </Link>
        </div>
      </div>

      {/* Today's Analytics */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          📊 Today's Analytics
        </h2>

        <div className="grid gap-6 md:grid-cols-4">

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Downloads Today
            </p>

            <h3 className="mt-2 text-4xl font-bold text-green-500">
              {todayDownloads}
            </h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Favorites Today
            </p>

            <h3 className="mt-2 text-4xl font-bold text-pink-500">
              {todayFavorites}
            </h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              New Users Today
            </p>

            <h3 className="mt-2 text-4xl font-bold text-blue-500">
              {todayUsers}
            </h3>
          </div>

          <div className="rounded-xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Photos Uploaded Today
            </p>

            <h3 className="mt-2 text-4xl font-bold text-yellow-500">
              {todayPhotos}
            </h3>
          </div>

        </div>
      </div>

      {/* Recent Photos */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          Recent Photos
        </h2>

        <div className="overflow-hidden rounded-xl bg-zinc-900">
          {recentPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center justify-between border-b border-zinc-800 p-4"
            >
              <div>
                <p className="font-semibold">
                  {photo.title}
                </p>

                <p className="text-sm text-gray-400">
                  {photo.match}
                </p>
              </div>

              <span className="text-green-500">
                {photo.downloadCount} Downloads
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Downloaded Photos */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-bold">
          🏆 Top Downloaded Photos
        </h2>

        <div className="overflow-hidden rounded-xl bg-zinc-900">
          {topPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex items-center justify-between border-b border-zinc-800 p-4"
            >
              <div>
                <p className="font-semibold">
                  {photo.title}
                </p>

                <p className="text-sm text-gray-400">
                  {photo.match}
                </p>
              </div>

              <span className="font-semibold text-green-500">
                {photo.downloadCount} Downloads
              </span>
            </div>
          ))}
        </div>
      </div>

      <RecentActivity />
      <AdminChart
  downloads={downloadCount._sum.downloadCount ?? 0}
  favorites={favoriteCount}
  users={userCount}
  photos={photoCount}
/>

    </>
  );
}