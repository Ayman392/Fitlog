"use client";

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IWorkout } from "@/Types/workouts.type";

interface WorkoutContextValue {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  saveWorkout: (workout: IWorkout) => void;
  removeFromPlan: (id: IWorkout["id"]) => void;
  completedIds: IWorkout["id"][];
  markAsDone: (id: IWorkout["id"]) => void;
  removeFromSaved: (id: IWorkout["id"]) => void;
}

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export default function WorkoutProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [completedIds, setCompletedIds] = useState<IWorkout["id"][]>([]);
  const [toastMessage, setToastMessage] = useState("");

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
    const alreadySaved = saved.some((item) => item.id === workout.id);

    if (alreadySaved) {
      setToastMessage("Already saved for later");
      return;
    }

    setSaved((previous) =>
      previous.some((item) => item.id === workout.id)
        ? previous
        : [...previous, workout],
    );

    setToastMessage("Saved for later");
  };

  const removeFromPlan = (id: IWorkout["id"]) => {
    setPlan((previous) => previous.filter((workout) => workout.id !== id));
  };

  const markAsDone = (id: IWorkout["id"]) => {
    setCompletedIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
  };
  const removeFromSaved = (id: IWorkout["id"]) => {
    setSaved((previous) => previous.filter((workout) => workout.id !== id));
  };

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);
  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        saveWorkout,
        removeFromPlan,
        completedIds,
        markAsDone,
        removeFromSaved,
      }}
    >
      {children}
     {toastMessage && (
  <div className="toast toast-end toast-top z-50">
    <div
      key={toastMessage}
      role="status"
      className="alert toast-enter border border-[#c4f000] bg-[#15171c] text-white shadow-lg"
    >
      <span className="text-[#c4f000]" aria-hidden="true">
        ✓
      </span>
      <span>{toastMessage}</span>
    </div>
  </div>
)}
    </WorkoutContext.Provider>
  );
}
