"use client";

import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { IWorkout } from "@/Types/workouts.type";

interface WorkoutContextValue {
  plan: IWorkout[];
  saved: IWorkout[];
  isLoaded: boolean;
  addToPlan: (workout: IWorkout) => void;
  saveWorkout: (workout: IWorkout) => void;
  removeFromPlan: (id: IWorkout["id"]) => void;
  completedIds: IWorkout["id"][];
  markAsDone: (id: IWorkout["id"]) => void;
  removeFromSaved: (id: IWorkout["id"]) => void;
}

const RELOAD_COUNT_KEY = "fitlog-reload-count";
const RELOAD_TIME_KEY = "fitlog-reload-time";
const RELOAD_WINDOW_MS = 5000; // reloads within 5s of each other count as "continuous"
const RELOAD_THRESHOLD = 3;

function resetOnTripleReload() {
  if (typeof window === "undefined") return;

  const [entry] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  const isReload = entry?.type === "reload";

  if (!isReload) {
    // normal navigation (clicked a link, typed a URL, etc.) breaks the streak
    sessionStorage.removeItem(RELOAD_COUNT_KEY);
    sessionStorage.removeItem(RELOAD_TIME_KEY);
    return;
  }

  const now = Date.now();
  const lastTime = Number(sessionStorage.getItem(RELOAD_TIME_KEY) || 0);
  const prevCount = Number(sessionStorage.getItem(RELOAD_COUNT_KEY) || 0);

  // if too much time passed since the last reload, it's not "continuous" — restart the count
  const withinWindow = now - lastTime < RELOAD_WINDOW_MS;
  const newCount = withinWindow ? prevCount + 1 : 1;

  sessionStorage.setItem(RELOAD_TIME_KEY, String(now));
  sessionStorage.setItem(RELOAD_COUNT_KEY, String(newCount));

  if (newCount >= RELOAD_THRESHOLD) {
    localStorage.removeItem("fitlog-data");
    sessionStorage.removeItem(RELOAD_COUNT_KEY);
    sessionStorage.removeItem(RELOAD_TIME_KEY);
  }
}

resetOnTripleReload();

export const WorkoutContext = createContext<WorkoutContextValue | null>(null);

export default function WorkoutProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [completedIds, setCompletedIds] = useState<IWorkout["id"][]>([]);
  const [toastMessage, setToastMessage] = useState("");
  

/* Restore browser-only storage after hydration; one extra render is intentional. */
/* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
  try {
    const stored = localStorage.getItem("fitlog-data");

    if (stored) {
      const data = JSON.parse(stored);

      if (Array.isArray(data.plan)) {
        setPlan(data.plan);
      }

      if (Array.isArray(data.saved)) {
        setSaved(data.saved);
      }

      if (Array.isArray(data.completedIds)) {
        setCompletedIds(data.completedIds);
      }
    }
  } catch {
    console.warn("Could not load saved FitLog data.");
  } finally {
    setIsLoaded(true);
  }
}, []);
/* eslint-enable react-hooks/set-state-in-effect */
useEffect(() => {
  if (!isLoaded) return;

  try {
    localStorage.setItem(
      "fitlog-data",
      JSON.stringify({
        plan,
        saved,
        completedIds,
      })
    );
  } catch {
    console.warn("Could not save FitLog data.");
  }
}, [plan, saved, completedIds, isLoaded]);
  
  
  
  const addToPlan = (workout: IWorkout) => {
  const alreadyAdded = plan.some(
    (item) => item.id === workout.id
  );

  if (alreadyAdded) {
    setToastMessage("Already in today's plan");
    return;
  }

  if (plan.length >= 5) {
    setToastMessage("Cap of five lifts for today. Finish them, then load more.");
    return;
  }

  setPlan((previous) =>
    previous.length >= 5 ||
    previous.some((item) => item.id === workout.id)
      ? previous
      : [...previous, workout]
  );

  setToastMessage("Added to today's plan");
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
  setPlan((previous) =>
    previous.filter((workout) => workout.id !== id)
  );

  setCompletedIds((previous) =>
    previous.filter((completedId) => completedId !== id)
  );

  setToastMessage("Removed from today's plan");
};
  const markAsDone = (id: IWorkout["id"]) => {
    setCompletedIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
    setToastMessage("Workout completed");
  };
  const removeFromSaved = (id: IWorkout["id"]) => {
    setSaved((previous) => previous.filter((workout) => workout.id !== id));
    setToastMessage("Removed from saved workouts");
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
        isLoaded,
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
