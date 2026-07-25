import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import SearchPhotos from "@/components/SearchPhotos";
import PhotoPreview from "@/components/PhotoPreview";

export default async function AdminPhotosPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
  }>;
}) {
  const { search } = await searchParams;

 const photos = await prisma.photo.findMany({
  where: search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            match: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            player: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : undefined,

  orderBy: {
    createdAt: "desc",
  },
});

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Manage Photos
      </h1>
      <SearchPhotos />

      <div className="overflow-x-auto rounded-lg border border-zinc-700">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Photo</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Match</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Featured</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {photos.map((photo) => (
              <tr
                key={photo.id}
                className="border-t border-zinc-700"
              >
                <td className="p-4">
                  <PhotoPreview
  image={photo.image}
  title={photo.title}
/>
                </td>

                <td className="p-4">{photo.title}</td>

                <td className="p-4">{photo.match}</td>

                <td className="p-4">{photo.category}</td>

                <td className="p-4">
                  {photo.featured ? "✅" : "❌"}
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/photos/${photo.id}/edit`}
                      className="rounded bg-blue-600 px-3 py-2 hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                <DeleteButton id={photo.id} />
                  </div>

                  <p className="mt-2 text-xs text-zinc-400">
                    ID: {photo.id}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}