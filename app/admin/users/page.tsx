import { prisma } from "@/lib/prisma";
import RoleSelect from "@/components/RoleSelect";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
  <>
      <h1 className="text-3xl font-bold mb-6">
        Registered Users
      </h1>

      <div className="overflow-x-auto rounded-xl bg-zinc-900">
        <table className="w-full">
          <thead className="bg-zinc-800">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-zinc-800"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
  <RoleSelect
    id={user.id}
    role={user.role}
  />
</td>
                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}