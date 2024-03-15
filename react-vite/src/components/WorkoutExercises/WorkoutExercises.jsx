import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWorkoutExercises,
  deleteWorkoutExercise,
} from '../../redux/workoutExercises';
import WorkoutExercisesEditModal from './WorkoutExercisesEdit';
import WorkoutExercisesAddModal from './WorkoutExercisesAdd';

const WorkoutExercises = ({ workoutId }) => {
  const dispatch = useDispatch();
  const workoutExercises = useSelector(
    (state) => state.workoutExercises.workoutExercises
  );

  useEffect(() => {
    if (workoutId) {
      dispatch(getWorkoutExercises(workoutId));
    }
  }, [dispatch, workoutId]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleEditClick = (exercise) => {
    setSelectedExercise(exercise);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedExercise(null);
    refreshWorkoutExercises();
  };

  const handleDeleteExercise = async (exerciseId) => {
    await dispatch(deleteWorkoutExercise(exerciseId));
    refreshWorkoutExercises();
  };

  const refreshWorkoutExercises = () => {
    if (workoutId) {
      dispatch(getWorkoutExercises(workoutId));
    }
  };

  return (
    <div className='workout-exercises-container'>
      <div className='workout-exercises-top'>
        <h2>Workout Exercises</h2>
        <button
          className='add-exercise-button'
          onClick={() => setShowAddModal(true)}
        >
          Add Exercise
        </button>
      </div>
      <ul className='exercise-list'>
        {workoutExercises.map((exercise) => (
          <li key={exercise.id} className='exercise-item'>
            {exercise.name} - Sets: {exercise.sets_completed}/
            {exercise.sets_target}, Reps: {exercise.reps_completed}/
            {exercise.reps_target}
            <div className='exercise-actions'>
              <button onClick={() => handleEditClick(exercise)}>Edit</button>
              <button onClick={() => handleDeleteExercise(exercise.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showAddModal && (
        <WorkoutExercisesAddModal
          onClose={() => {
            setShowAddModal(false);
            refreshWorkoutExercises();
          }}
          workoutId={workoutId}
        />
      )}
      {showEditModal && selectedExercise && (
        <WorkoutExercisesEditModal
          exercise={selectedExercise}
          onClose={handleCloseEditModal}
          workoutId={workoutId}
        />
      )}
    </div>
  );
};

export default WorkoutExercises;
