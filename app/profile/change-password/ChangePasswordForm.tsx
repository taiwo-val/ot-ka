"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/profile/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (data.success) {
      alert("Password updated successfully!");
      router.push("/profile");
    } else {
      alert(data.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl bg-zinc-900 p-8 rounded-xl space-y-6"
    >
      <div>
        <label className="block mb-2">
          Current Password
        </label>

        <input
          type="password"
          className="w-full rounded bg-zinc-800 p-3"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          New Password
        </label>

        <input
          type="password"
          className="w-full rounded bg-zinc-800 p-3"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          Confirm New Password
        </label>

        <input
          type="password"
          className="w-full rounded bg-zinc-800 p-3"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          required
        />
      </div>

      <button
        disabled={loading}
        className="bg-green-600 px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}