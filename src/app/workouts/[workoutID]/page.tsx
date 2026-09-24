import { IWorkout } from "@/Types/workouts.type";

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
  return <h2>{workout.name}</h2>;
};

export default WorkoutDetailsPage;