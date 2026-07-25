import { prisma } from "@/lib/prisma";

export default async function DownloadsPage() {
  const downloads = await prisma.download.findMany({
    include: {
      user: true,
      photo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Download History
      </h1>

      <div className="overflow-x-auto rounded-xl bg-zinc-900">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Photo</th>
              <th className="text-left p-4">Downloaded</th>
            </tr>
          </thead>

          <tbody>
            {downloads.map((download) => (
              <tr
                key={download.id}
                className="border-t border-zinc-800"
              >
                <td className="p-4">{download.user.name}</td>
                <td className="p-4">{download.photo.title}</td>
                <td className="p-4">
                  {new Date(download.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}