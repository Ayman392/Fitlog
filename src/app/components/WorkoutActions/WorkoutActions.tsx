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
    <button
      type="button"
      onClick={() => context.addToPlan(workout)}
      className="btn border-0 bg-[#c4f000] text-black"
    >
      Add to today&apos;s plan
    </button>
  );
}
