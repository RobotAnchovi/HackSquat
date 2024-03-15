import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkoutExercise } from '../../redux/workoutExercises';

const WorkoutExercisesAddModal = ({ onClose, workoutId, onExerciseAdded }) => {
  const dispatch = useDispatch();
  const [exerciseId, setExerciseId] = useState('');
  const [setsTarget, setSetsTarget] = useState('');
  const [repsTarget, setRepsTarget] = useState('');
  const [weightTarget, setWeightTarget] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExerciseData = {
      workoutId,
      exerciseId,
      sets_target: setsTarget,
      reps_target: repsTarget,
      weight_target: weightTarget,
    };
    try {
      const createdExercise = await dispatch(
        addWorkoutExercise(newExerciseData)
      );
      if (onExerciseAdded) onExerciseAdded(createdExercise);
      onClose();
    } catch (error) {
      console.error('Failed to add new workout exercise', error);
      setErrors(['Failed to add new workout exercise']);
    }
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='workout-exercise-add-form'>
          <h2>Add New Exercise</h2>
          {errors.length > 0 && (
            <div className='modal-errors'>
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          )}
          {/* Exercise selector */}
          <select
            value={exerciseId}
            onChange={(e) => setExerciseId(e.target.value)}
            required
          >
            <option value=''>Select an Exercise</option>
            {/* Populate with your exercises */}
          </select>
          <input
            type='number'
            value={setsTarget}
            onChange={(e) => setSetsTarget(e.target.value)}
            placeholder='Target Sets'
            required
          />
          <input
            type='number'
            value={repsTarget}
            onChange={(e) => setRepsTarget(e.target.value)}
            placeholder='Target Reps'
            required
          />
          <input
            type='number'
            value={weightTarget}
            onChange={(e) => setWeightTarget(e.target.value)}
            placeholder='Target Weight (lbs)'
          />
          <div className='modal-actions'>
            <button type='submit'>Add Exercise</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutExercisesAddModal;
