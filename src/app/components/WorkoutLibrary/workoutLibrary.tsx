import { Oswald } from "next/font/google";
import workouts from "@/app/data/workouts.json";
import Image from "next/image";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

function StatIcon({ type }: { type: "clock" | "fire" | "star" }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill={type === "fire" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "clock" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      )}
      {type === "fire" && (
        <path d="M13 3c1 5-4 6-4 10-2-1-2-3-2-4-3 3-4 6-2 9a8 8 0 0 0 14-2c0-5-3-9-6-13Z" />
      )}
      {type === "star" && (
        <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z" />
      )}
    </svg>
  );
}

export default function WorkoutLibrary() {
  return (
    <section className="py-6">
      <h2
        className={`${oswald.className} text-2xl md:text-4xl leading-tight font-bold uppercase text-white`}
      >
        The Library
      </h2>

      <p className="mt-1 md:text-lg text-[#9298a3]">
        Twelve lifts covering every major muscle group.
      </p>

      <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-5">
        {workouts.map((workout) => (
          <article
            key={workout.id}
            className="card gap-0 overflow-hidden rounded-xl border border-[#24272e] bg-[#15171c] shadow-none"
          >
            <figure className="h-50 w-full">
              <Image
                src={workout.image}
                alt={workout.name}
                width={500}
                height={244}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </figure>

            <div className="card-body gap-0 p-3.75">
              <div className="flex flex-wrap gap-1">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="badge h-3.5 min-h-0 rounded-full border-0 bg-[#c4f000] px-1.75 text-[8px] font-bold text-black uppercase"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <h3
                className={`${oswald.className} mt-2 text-[12px] leading-4 font-bold tracking-wide text-white uppercase`}
              >
                {workout.name}
              </h3>

              <p className="mt-1 text-[8px] leading-3 text-[#9298a3]">
                {workout.equipment}
              </p>

              <div className="mt-2.5 flex items-center gap-3 border-t border-[#24272e] pt-2 text-[8px] text-[#9298a3]">
                <span className="flex items-center gap-1">
                  <StatIcon type="clock" />
                  {workout.duration} min
                </span>

                <span className="flex items-center gap-1">
                  <StatIcon type="fire" />
                  {workout.caloriesBurned} kcal
                </span>

                <span className="flex items-center gap-1">
                  <StatIcon type="star" />
                  {workout.rating}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}