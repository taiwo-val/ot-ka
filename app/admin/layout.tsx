import { ReactNode } from "react";
import LogoutButton from "@/components/LogoutButton";
import AdminNavLink from "@/components/AdminNavLink";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-6 border-r border-zinc-800">
        <h1 className="text-2xl font-bold mb-8">
          OT.KA Admin
        </h1>

<nav className="space-y-3">
  <AdminNavLink href="/admin">
    🏠 Dashboard
  </AdminNavLink>

  <AdminNavLink href="/admin/photos">
    📸 Photos
  </AdminNavLink>

  <AdminNavLink href="/admin/users">
    👥 Users
  </AdminNavLink>

  <AdminNavLink href="/admin/downloads">
    ⬇️ Downloads
  </AdminNavLink>
</nav>

<AdminNavLink href="/profile">
  👤 My Profile
</AdminNavLink>

        <div className="mt-10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}