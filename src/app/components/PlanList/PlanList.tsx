"use client";

import { Oswald } from "next/font/google";
import { useContext, useState } from "react";
import { WorkoutContext } from "@/app/context/WorkoutContext";
import Link from "next/link";
import Image from "next/image";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

export default function PlanList() {
  const context = useContext(WorkoutContext);
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");

  if (!context) {
    throw new Error("PlanList must be inside WorkoutProvider");
  }

  const {
    plan,
    saved,
    removeFromPlan,
    completedIds,
    markAsDone,
    removeFromSaved,
  } = context;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const displayedWorkouts = [...(activeTab === "plan" ? plan : saved)].sort(
    (a, b) => {
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.duration - b.duration;
    },
  );

  return (
    <div className="container mx-auto max-w-7xl px-7 md:px-30 lg:px-0 py-8">
      {/* Page title */}
      <h1
        className={`${oswald.className} text-3xl font-bold text-white uppercase`}
      >
        My Plan
      </h1>

      <p className="mt-2 text-sm text-gray-400">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Summary of today's plan */}
      <div className="stats stats-vertical my-6 w-full border border-[#24272e] bg-[#13161c] shadow-none sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title text-xs text-gray-400">Exercises</div>
          <div className={`${oswald.className} stat-value text-[#c4f000]`}>
            {plan.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs text-gray-400">Minutes</div>
          <div className={`${oswald.className} stat-value text-white`}>
            {totalMinutes}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-xs text-gray-400">Calories</div>
          <div className={`${oswald.className} stat-value text-white`}>
            {totalCalories}
          </div>
        </div>
      </div>

      {/* Switch between Plan and Saved */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-[#252a34] bg-[#151920] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            aria-pressed={activeTab === "plan"}
            className={`rounded-md px-7 py-2 text-xs transition-colors ${
              activeTab === "plan"
                ? "bg-[#222730] font-semibold text-white ring-1 ring-[#303641]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            aria-pressed={activeTab === "saved"}
            className={`rounded-md px-10 py-2 text-xs transition-colors ${
              activeTab === "saved"
                ? "bg-[#222730] font-semibold text-white ring-1 ring-[#303641]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <label className="flex items-center gap-3 text-xs text-gray-400">
          Sort By
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="select select-sm w-28 rounded-lg border-[#252a34] bg-[#13161c] text-xs text-gray-200"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {/* Selected list */}
      {displayedWorkouts.length === 0 ? (
        <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-[#252a34] bg-[#0f1115] px-6 py-12 text-center">
          <h2
            className={`${oswald.className} text-xl font-bold tracking-wide text-white uppercase`}
          >
            Nothing here yet
          </h2>

          <p className="mt-2 text-xs text-gray-400">
            Browse the library and add a lift to get today moving.
          </p>

          <Link
            href="/"
            className="btn btn-sm mt-6 rounded-full border-0 bg-[#c4f000] px-6 text-xs font-semibold text-black hover:bg-[#d4ff20]"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {displayedWorkouts.map((workout) => (
            <li
              key={workout.id}
              className="card flex-col gap-4 border border-[#24272e] bg-[#15171c] p-4 sm:flex-row sm:items-center"
            >
              <Image
                src={workout.image}
                alt={workout.name}
                width={96}
                height={96}
                className="size-24 shrink-0 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3
                  className={`${oswald.className} font-bold text-white uppercase`}
                >
                  {workout.name}
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {workout.duration} min · {workout.caloriesBurned} kcal
                  {" · "}Rating: {workout.rating}
                </p>
              </div>

              <Link
                href={`/workouts/${workout.id}`}
                className="btn btn-outline rounded-2xl px-5 btn-sm text-gray-200"
              >
                View Details
              </Link>
              {activeTab === "plan" && (
                <button
                  type="button"
                  onClick={() => markAsDone(workout.id)}
                  disabled={completedIds.includes(workout.id)}
                  className="btn btn-sm rounded-2xl px-5 border-0 bg-[#c4f000] text-black disabled:bg-[#222b16] disabled:text-[#c4f000]"
                >
                  {completedIds.includes(workout.id)
                    ? "✓ Done"
                    : "Mark as Done"}
                </button>
              )}
              <button
                type="button"
                onClick={() =>
                  activeTab === "plan"
                    ? removeFromPlan(workout.id)
                    : removeFromSaved(workout.id)
                }
                aria-label={`Remove ${workout.name} from ${
                  activeTab === "plan" ? "your plan" : "saved workouts"
                }`}
                className="btn btn-ghost btn-square btn-sm text-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
