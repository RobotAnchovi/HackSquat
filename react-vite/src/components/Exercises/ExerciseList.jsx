import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadExercises } from '../../redux/exercises';
import { Redirect } from 'react-router-dom';
import { userIsValid } from '../../utils/user';
import Loading from '../Loading';

const ExerciseList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const exercises = useSelector((state) => state.exercises.exercises);
  const isLoaded = useSelector((state) => state.exercises.isLoaded);

  useEffect(() => {
    if (userIsValid(currentUser)) {
      dispatch(loadExercises());
    }
  }, [dispatch, currentUser]);

  if (!userIsValid(currentUser)) return <Redirect to='/login' />;
  if (!isLoaded) return <Loading />;

  return (
    <div className='exercise-list'>
      {exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>{exercise.name}</li>
          ))}
        </ul>
      ) : (
        <p>No exercises found. Maybe add some?</p>
      )}
    </div>
  );
};

export default ExerciseList;
