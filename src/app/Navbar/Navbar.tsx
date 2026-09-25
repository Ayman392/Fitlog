import { Oswald } from "next/font/google";
import Link from "next/link";
import React from "react";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import NavLinks from "@/app/components/Navlinks/NavLinks";
import PlanCounters from "../components/PlanCounters/PlanCounters";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

const Navbar = () => {
  const link = (
    <>
      <NavLinks />
    </>
  );
  return (
    <div className="shadow-sm">
      <div className="navbar container mx-auto lg:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link className={`${oswald.className} flex gap-2 text-xl`} href="/">
            <Image src={logo} alt="Fitlog logo" /> FITLOG
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{link}</ul>
        </div>
        <div className="navbar-end gap-4 sm:gap-8">
          <PlanCounters />
        </div>
      </div>
      <hr className="text-gray-700" />
    </div>
  );
};

export default Navbar;
