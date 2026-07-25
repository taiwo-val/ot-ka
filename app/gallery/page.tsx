import { prisma } from "@/lib/prisma";
import GalleryClient from "@/components/GalleryClient";

export default async function GalleryPage() {
  const photos = await prisma.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      image: true,
      category: true,
    },
  });

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-center text-5xl font-bold">
          Football Gallery
        </h1>

        <p className="mt-4 mb-12 text-center text-zinc-400">
          Relive the biggest football moments through the lens of OT.KA.
        </p>

        <GalleryClient photos={photos} />
      </div>
    </main>
  );
}