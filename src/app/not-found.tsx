import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-8xl font-bold text-[#c4f000]">404</p>

      <h1 className="text-2xl font-bold text-white">
        Page not found
      </h1>

      <p className="text-sm text-gray-400">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="btn mt-2 rounded-full border-0 bg-[#c4f000] px-6 text-black hover:bg-[#d4ff20]"
      >
        Go to workouts
      </Link>
    </section>
  );
}