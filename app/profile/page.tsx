import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ProfilePage() {
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

  return (
    <main className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-zinc-900 rounded-xl p-8 space-y-6">
        <div>
          <p className="text-gray-400">Name</p>
          <p className="text-xl">{user.name}</p>
        </div>

        <div>
          <p className="text-gray-400">Email</p>
          <p className="text-xl">{user.email}</p>
        </div>

        <div>
          <p className="text-gray-400">Role</p>
          <p className="text-xl">{user.role}</p>
        </div>

        <div>
          <p className="text-gray-400">Joined</p>
          <p className="text-xl">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href="/profile/edit"
          className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          ✏️ Edit Profile
        </Link>

        <Link
          href="/profile/change-password"
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          🔒 Change Password
        </Link>
      </div>
    </main>
  );
}