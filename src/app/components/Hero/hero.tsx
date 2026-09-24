import Image from "next/image";
import Link from "next/link";
import { Oswald } from "next/font/google";
import heroImg from "../../../../public/assets/banner.png"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Hero() {
  return (
    <section className="hero overflow-hidden rounded-2xl mt-10 border border-[#24272e] bg-[#15171c] px-4 md:px-1">
      <div className="hero-content w-full max-w-none flex-col gap-8 px-6 py-10 md:flex-row md:justify-between md:px-12 md:py-12">
        <div className="w-full md:max-w-[62%]">
          <p className="mb-5 text-[10px] font-bold tracking-widest text-[#c4f000]">
            WORKOUT LIBRARY
          </p>

          <h1
            className={`${oswald.className} text-4xl leading-[1.05] font-bold tracking-tight text-white lg:text-5xl`}
          >
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#9ca3af]">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s
            work add up.
          </p>

          <Link
            href="/workouts"
            className="btn mt-6 h-10 min-h-0 rounded-md border-0 bg-[#c4f000] px-6 text-xs font-bold text-black shadow-none hover:bg-[#d4ff20]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="relative h-64 w-full shrink-0 md:h-72 md:w-[30%]">
          <Image
            src={heroImg}
            alt="Anatomical illustration of a seated biceps curl"
            fill
            sizes="(max-width: 767px) 80vw, 30vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}