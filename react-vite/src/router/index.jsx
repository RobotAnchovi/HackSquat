import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import ExerciseList from '../components/Exercises/ExerciseList';
import WorkoutPlans from '../components/WorkoutPlans';
import FailedLift from '../components/FailedLift';
import WorkoutList from '../components/Workouts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'exercises',
        element: <ExerciseList />,
      },
      {
        path: 'workout-plans',
        element: <WorkoutPlans />,
      },
      {
        path: 'workouts',
        element: <WorkoutList />,
      },
      {
        path: 'failed-lift',
        element: <FailedLift />,
      },
      {
        path: '*',
        element: <FailedLift />,
      },
    ],
  },
]);
