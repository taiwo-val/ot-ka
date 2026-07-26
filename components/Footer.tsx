import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="OT.KA Logo"
                width={70}
                height={70}
              />

              <div>
                <h2 className="text-2xl font-bold">
                  OT.KA
                </h2>

                <p className="text-sm text-zinc-400">
                  Capture. Inspire. Share.
                </p>
              </div>
            </div>

            <p className="mt-5 text-zinc-400 leading-7">
              OT.KA is your home for football photography.
              Browse, download and relive every football
              moment captured on and off the pitch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link href="/">
                Home
              </Link>

              <Link href="/gallery">
                Gallery
              </Link>

              <Link href="/matches">
                Matches
              </Link>

              <Link href="/players">
                Players
              </Link>

              <Link href="/services">
                Services
              </Link>

              <Link href="/contact">
                Contact
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <p className="text-zinc-400">
              Email:
            </p>

            <p className="mb-4">
              support@otka.com
            </p>

            <p className="text-zinc-400">
              Follow OT.KA for the latest football moments.
            </p>
          </div>

        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-zinc-500">

          © {new Date().getFullYear()} OT.KA.
          All Rights Reserved.

        </div>
      </div>
    </footer>
  );
}