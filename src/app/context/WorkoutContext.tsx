"use client";

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import type { IWorkout } from "@/Types/workouts.type";

interface WorkoutContextValue {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  saveWorkout: (workout: IWorkout) => void;
}

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export default function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);

  const addToPlan = (workout: IWorkout) => {
    setPlan((previous) => {
      const alreadyAdded = previous.some((item) => item.id === workout.id);

      if (alreadyAdded) {
        return previous;
      }

      return [...previous, workout];
    });
  };

  const saveWorkout = (workout: IWorkout) => {
    setSaved((previous) => {
      const alreadySaved = previous.some((item) => item.id === workout.id);

      if (alreadySaved) {
        return previous;
      }

      return [...previous, workout];
    });
  };

  return (
    <WorkoutContext.Provider value={{ plan, saved, addToPlan, saveWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}
