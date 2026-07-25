import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import EditPhotoForm from "@/components/EditPhotoForm";
import DeletePhotoButton from "@/components/DeletePhotoButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPhotoPage({ params }: Props) {
  const { id } = await params;

  const photo = await prisma.photo.findUnique({
    where: { id },
  });

  if (!photo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black p-8 text-white">
        <Link
        href="/admin/photos"
  className="mb-6 inline-block rounded bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
>
  ← Back to Admin Dashboard
</Link>
      <h1 className="mb-8 text-3xl font-bold">
        Edit Photo
      </h1>

      <EditPhotoForm photo={photo} />
      <div className="mt-6">
  <DeletePhotoButton id={photo.id} />
</div>

    </main>
  );
}