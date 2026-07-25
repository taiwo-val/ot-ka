"use client";

import { useState } from "react";

export default function RoleSelect({
  id,
  role,
}: {
  id: string;
  role: string;
}) {
  const [selectedRole, setSelectedRole] = useState(role);
  const [loading, setLoading] = useState(false);

  async function handleChange(
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newRole = e.target.value;

    setSelectedRole(newRole);
    setLoading(true);

    const response = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: newRole,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (!data.success) {
      alert("Failed to update role.");
      setSelectedRole(role);
      return;
    }

    alert("Role updated successfully!");
  }

  return (
    <select
      value={selectedRole}
      onChange={handleChange}
      disabled={loading}
      className="bg-zinc-800 text-white rounded px-2 py-1"
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
}