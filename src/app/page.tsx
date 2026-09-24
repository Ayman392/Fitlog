import Hero from "./components/Hero/hero";
import WorkoutLibrary from "./components/WorkoutLibrary/workoutLibrary";

export default function Home() {
  return (
    <section className="container mx-auto px-4 md:px-1 lg:px-30">
      <Hero/>
      <WorkoutLibrary/>
    </section>
  );
}
