import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProfileForm from "./EditProfileForm";

export default async function EditProfilePage() {
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
    <>
      <h1 className="text-4xl font-bold mb-8">
        Edit Profile
      </h1>

      <EditProfileForm user={user} />
    </>
  );
}