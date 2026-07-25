import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import DownloadButton from "@/components/DownloadButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PhotoPage({ params }: Props) {
  const { id } = await params;

  const photo = await prisma.photo.findUnique({
    where: {
      id,
    },
  });

  if (!photo) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <Image
          src={photo.image}
          alt={photo.title}
          width={1200}
          height={800}
          className="w-full rounded-2xl object-cover"
        />

        <div className="mt-10">
          <h1 className="text-4xl font-bold">
            {photo.title}
          </h1>

          <div className="mt-6 space-y-3 text-zinc-300">
            <p>
              <strong>Match:</strong> {photo.match}
            </p>

            <p>
              <strong>Home Team:</strong> {photo.homeTeam}
            </p>

            <p>
              <strong>Away Team:</strong> {photo.awayTeam}
            </p>

            <p>
              <strong>Player:</strong> {photo.player || "N/A"}
            </p>

            <p>
              <strong>Category:</strong> {photo.category}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {photo.date.toLocaleDateString()}
            </p>

            <p>
              <strong>Downloads:</strong>{" "}
              {photo.downloadCount}
            </p>
          </div>

          <div className="mt-8">
            <DownloadButton id={photo.id} />
          </div>
        </div>
      </div>
    </main>
  );
}