import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  const photoCount = await prisma.photo.count();

  const userCount = await prisma.user.count();

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


  return (
  <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            OT.KA Admin Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome, {session.user?.name}
          </p>
        </div>

        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/admin/photos">
          <div className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition">
            <h2 className="text-xl font-semibold">Photos</h2>
            <p className="text-gray-400 mt-2">
              {photoCount} Photos Uploaded
            </p>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-gray-400 mt-2">
              {userCount} Registered Users
            </p>
          </div>
        </Link>

        <Link href="/admin/downloads">
          <div className="bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800 transition">
            <h2 className="text-xl font-semibold">Downloads</h2>
            <p className="text-gray-400 mt-2">
              {downloadCount._sum.downloadCount ?? 0} Downloads
            </p>
          </div>
        </Link>
      </div>

 <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Recent Photos
        </h2>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          {recentPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex justify-between items-center border-b border-zinc-800 p-4"
            >
              <div>
                <p className="font-semibold">{photo.title}</p>
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

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          🏆 Top Downloaded Photos
        </h2>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          {topPhotos.map((photo) => (
            <div
              key={photo.id}
              className="flex justify-between items-center border-b border-zinc-800 p-4"
            >
              <div>
                <p className="font-semibold">{photo.title}</p>
                <p className="text-sm text-gray-400">
                  {photo.match}
                </p>
              </div>

              <span className="text-green-500 font-semibold">
                {photo.downloadCount} Downloads
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}