import Link from "next/link";
import { Oswald } from "next/font/google";
import Image from "next/image";
import logo from "../../../../public/assets/logo.png";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Footer() {
  return (
    <footer className="footer mt-auto flex flex-col items-center justify-between gap-4 border-t border-[#202329] px-5 py-6 sm:flex-row ">
      <div className="flex justify-between container mx-auto md:px-1 lg:px-30">
        <Link href="" className="flex items-center gap-2">
          <span
            className={`${oswald.className} text-lg font-bold tracking-wide text-white flex gap-2`}
          >
            <Image src={logo} alt="Fitlog logo" width={25} height={10} />
            FITLOG
          </span>
        </Link>

        <p className="text-center text-[10px] text-[#858b97]">
          © 2026 FitLog — Workout Library. Train hard, Log honest.
        </p>
      </div>
    </footer>
  );
}
