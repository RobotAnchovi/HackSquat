import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import ExerciseList from '../components/Exercises/ExerciseList';

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
        path: '*',
        element: <HomePage />, // Consider a dedicated 404 component for better UX
      },
    ],
  },
]);
