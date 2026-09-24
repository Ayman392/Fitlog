"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/workouts", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-8 py-2 text-md font-medium transition-colors ${
                isActive
                  ? "bg-[#1b2510] text-[#c4f000] hover:bg-[#1b2510]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </>
  );
}