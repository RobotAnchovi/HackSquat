import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateWorkoutExercise,
  deleteWorkoutExercise,
} from '../../redux/workoutExercises';
import ConfirmDeleteFormModal from '../ConfirmDeleteFormModal';

const WorkoutExercisesEditModal = ({
  exercise,
  onClose,
  onExerciseUpdated,
}) => {
  const dispatch = useDispatch();
  const [setsTarget, setSetsTarget] = useState(
    exercise ? exercise.sets_target : ''
  );
  const [repsTarget, setRepsTarget] = useState(
    exercise ? exercise.reps_target : ''
  );
  const [weightTarget, setWeightTarget] = useState(
    exercise ? exercise.weight_target : ''
  );
  const [setsCompleted, setSetsCompleted] = useState(
    exercise ? exercise.sets_completed : ''
  );
  const [repsCompleted, setRepsCompleted] = useState(
    exercise ? exercise.reps_completed : ''
  );
  const [weightUsed, setWeightUsed] = useState(
    exercise ? exercise.weight_used : ''
  );
  const [errors, setErrors] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (exercise) {
      setSetsTarget(exercise.sets_target);
      setRepsTarget(exercise.reps_target);
      setWeightTarget(exercise.weight_target);
      setSetsCompleted(exercise.sets_completed);
      setRepsCompleted(exercise.reps_completed);
      setWeightUsed(exercise.weight_used);
    }
  }, [exercise]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExerciseData = {
      sets_target: setsTarget,
      reps_target: repsTarget,
      weight_target: weightTarget,
      sets_completed: setsCompleted,
      reps_completed: repsCompleted,
      weight_used: weightUsed,
    };
    try {
      await dispatch(updateWorkoutExercise(exercise.id, updatedExerciseData));
      onExerciseUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update workout exercise', error);
      setErrors(['Failed to update workout exercise']);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deleteWorkoutExercise(exercise.id));
      onClose();
    } catch (error) {
      console.error('Failed to delete workout exercise', error);
      setErrors(['Failed to delete workout exercise']);
    }
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='workout-exercise-edit-form'>
          <h2>Edit Exercise</h2>
          {errors.length > 0 && (
            <div className='modal-errors'>
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          )}
          {/* Input fields for sets, reps, and weight */}
          <input
            type='number'
            value={setsTarget}
            onChange={(e) => setSetsTarget(e.target.value)}
            placeholder='Target Sets'
          />
          <input
            type='number'
            value={repsTarget}
            onChange={(e) => setRepsTarget(e.target.value)}
            placeholder='Target Reps'
          />
          <input
            type='number'
            value={weightTarget}
            onChange={(e) => setWeightTarget(e.target.value)}
            placeholder='Target Weight (lbs)'
          />
          <input
            type='number'
            value={setsCompleted}
            onChange={(e) => setSetsCompleted(e.target.value)}
            placeholder='Sets Completed'
          />
          <input
            type='number'
            value={repsCompleted}
            onChange={(e) => setRepsCompleted(e.target.value)}
            placeholder='Reps Completed'
          />
          <input
            type='number'
            value={weightUsed}
            onChange={(e) => setWeightUsed(e.target.value)}
            placeholder='Weight Used (lbs)'
          />
          <div className='modal-actions'>
            <button type='submit'>Update Exercise</button>
            <button type='button' onClick={() => setShowConfirmDelete(true)}>
              Delete Exercise
            </button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        {showConfirmDelete && (
          <ConfirmDeleteFormModal
            text='Are you sure you want to delete this exercise?'
            deleteCb={handleDeleteConfirmed}
            cancelDeleteCb={() => setShowConfirmDelete(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutExercisesEditModal;
