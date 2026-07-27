import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import GalleryPreview from "@/components/GalleryPreview";
import FeaturedPhotos from "@/components/FeaturedPhotos";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Footer from "@/components/Footer";
import LatestMatches from "@/components/LatestMatches";
import PhotoOfTheWeek from "@/components/PhotoOfTheWeek";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="Football Hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 text-lg font-semibold tracking-[0.3em] text-green-500">
            OT.KA
          </p>

          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            Capturing Every Moment
            <br />
            of the Beautiful Game
          </h1>

          <p className="mt-4 text-xl font-semibold text-white">
            Professional Football Photography
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">
            From match-winning goals to unforgettable celebrations, OT.KA
            captures every emotion with stunning football photography.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/gallery"
              className="rounded-lg bg-green-500 px-8 py-4 text-lg font-semibold transition hover:bg-green-600"
            >
              Explore Gallery
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white px-8 py-4 text-lg font-semibold transition hover:bg-white hover:text-black"
            >
              Book a Session
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="text-3xl text-white">↓</span>
        </div>
      </section>

      {/* Homepage Sections */}
    

<FeaturedPhotos />
<GalleryPreview />
<PhotoOfTheWeek />
<Services />
<Stats />
<LatestMatches />
<Footer />

    </main>
  );
}