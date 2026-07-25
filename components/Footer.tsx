import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold">
              OT.<span className="text-green-500">KA</span>
            </h2>

            <p className="mt-4 text-zinc-400">
              Capturing every moment of the beautiful game through
              professional football photography.
            </p>
          </div>

          {/* Quick Links */}
          <div>
  <h3 className="text-xl font-semibold">Get in Touch</h3>

  <div className="mt-4 space-y-4 text-zinc-400">

    <div className="flex items-center gap-3">
      <Mail size={18} className="text-green-500" />
      <span>taiwovalentine@gmail.com</span>
    </div>

    <div className="flex items-center gap-3">
      <Phone size={18} className="text-green-500" />
      <span>+234 8102623213</span>
    </div>

    <div className="flex items-center gap-3">
      <MapPin size={18} className="text-green-500" />
      <span>Nigeria osun state</span>
    </div>

  </div>
</div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 text-center text-zinc-500">
          © {new Date().getFullYear()} OT.KA Football Photography.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}