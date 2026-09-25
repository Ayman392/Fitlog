import { IWorkout } from "@/Types/workouts.type";
import Image from "next/image";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
});

interface IWorkoutDetailsPageProps {
  params: Promise<{
    workoutID: string;
  }>;
}

const getWorkouts = async () => {
  const data = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!data.ok) {
    throw new Error("Failed to load workouts");
  }

  const workouts: IWorkout[] = await data.json();
  return workouts;
};
const WorkoutDetailsPage = async ({
  params,
}: IWorkoutDetailsPageProps) => {
  const { workoutID } = await params;
  const workouts = await getWorkouts();
  const workout = workouts.find((item) => String(item.id)=== workoutID);
  if(!workout){
    return <h2>not found</h2>
  }
  return (
  <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-8 md:grid-cols-2 md:gap-10">
    {/* Left: workout image */}
    <Image
      src={workout.image}
      alt={workout.name}
      width={600}
      height={750}
      className="`aspect-4/5` w-full rounded-xl object-cover"
    />

    {/* Right: workout details */}
    <div>
      <h1
        className={`${oswald.className} text-3xl leading-tight font-bold text-white uppercase`}
      >
        {workout.name}
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {workout.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {workout.muscleGroups.map((muscle) => (
          <span
            key={muscle}
            className="badge badge-sm rounded-full border-0 bg-[#c4f000] px-3 text-xs text-black"
          >
            {muscle}
          </span>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#24272e] bg-[#151820]">
        <table className="table table-sm w-full">
          <caption className="sr-only">
            Workout specifications
          </caption>

          <tbody>
            {[
              { label: "Equipment", value: workout.equipment },
              { label: "Difficulty", value: workout.difficulty },
              { label: "Sets", value: workout.sets },
              { label: "Reps", value: workout.reps },
              { label: "Duration", value: `${workout.duration} min` },
              { label: "Calories", value: `${workout.caloriesBurned} kcal` },
              { label: "Rating", value: workout.rating },
            ].map(({ label, value }) => (
              <tr
                key={label}
                className="border-b border-[#20242c] last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-4 py-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase"
                >
                  {label}
                </th>

                <td className="px-4 py-3 text-right text-xs text-gray-200">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-3 text-sm font-bold tracking-wide text-white">
        INSTRUCTIONS
      </h2>

      <ol className="mt-3 list-decimal space-y-1 pl-4 text-xs leading-relaxed text-gray-300 marker:text-gray-500">
        {workout.instructions.map((instruction, index) => (
          <li key={index} className="pl-1">
            {instruction}
          </li>
        ))}
      </ol>

      <div className="mt-3 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn rounded-lg border-0 bg-[#c4f000] text-xs font-semibold text-black shadow-none hover:bg-[#d4ff20]"
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
            <rect x="4" y="5" width="16" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M4 11h16M12 14v4M10 16h4" />
          </svg>
          Add to today&apos;s plan
        </button>

        <button
          type="button"
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
      </div>
    </div>
  </section>
);
};

export default WorkoutDetailsPage;