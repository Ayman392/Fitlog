"use client";

import { useContext } from "react";
import { WorkoutContext } from "@/app/context/WorkoutContext";
import type { IWorkout } from "@/Types/workouts.type";

export default function WorkoutActions({ workout }: { workout: IWorkout }) {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("WorkoutActions must be inside WorkoutProvider");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => context.addToPlan(workout)}
        className="btn rounded-lg border-0 bg-[#c4f000] text-xs font-semibold text-black shadow-none hover:bg-[#d4ff20]"
      >
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => context.saveWorkout(workout)}
        className="btn btn-outline rounded-lg border-[#343b48] text-xs font-normal text-gray-200 hover:border-gray-500 hover:bg-white/5"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16l-6-4-6 4Z" />
        </svg>
        Save for later
      </button>
    </>
  );
}
