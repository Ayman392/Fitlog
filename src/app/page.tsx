import { Suspense } from "react";
import Hero from "./components/Hero/hero";
import WorkoutLibrary from "./components/WorkoutLibrary/workoutLibrary";

export default function Home() {
  return (
    <section className="container mx-auto px-4 md:px-1 lg:px-30">
      <Hero/>
      <Suspense fallback={
        <div role="status" className="flex items-center justify-center gap-3 py-10 text-gray-400">
      <span
        className="loading loading-spinner loading-md"
        aria-hidden="true"
      />
      <p>Loading workouts…</p>
    </div>
      }>
          <WorkoutLibrary/>
      </Suspense>
    </section>
  );
}
