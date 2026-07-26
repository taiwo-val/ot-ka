"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Invalid email or password.");
      return;
    }

    toast.success("Welcome back!");

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-8 shadow-xl"
      >
        <h1 className="mb-2 text-center text-4xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-zinc-400">
          Login to your OT.KA account
        </p>

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-zinc-800 p-3 outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg bg-zinc-800 p-3 pr-16 outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-green-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          <p className="text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-green-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}