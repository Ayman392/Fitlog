"use client";

import { useContext } from "react";
import Link from "next/link";
import { WorkoutContext } from "@/app/context/WorkoutContext";

export default function PlanCounters() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("PlanCounters must be inside WorkoutProvider");
  }

  const { plan, saved } = context;

  return (
    <div className="flex items-center gap-4 sm:gap-8">
      <Link
        href="/my-plan"
        className="flex items-center gap-2 text-sm text-gray-200"
      >
        Plan
        <span className="badge size-7 rounded-full border-0 bg-[#c4f000] p-0 text-sm font-semibold text-black">
          {plan.length}
        </span>
      </Link>

      <Link
        href="/my-plan"
        className="flex items-center gap-2 text-sm text-gray-400"
      >
        Saved
        <span className="badge badge-outline size-7 rounded-full border-2 border-[#303540] p-0 text-sm text-gray-300">
          {saved.length}
        </span>
      </Link>
    </div>
  );
}