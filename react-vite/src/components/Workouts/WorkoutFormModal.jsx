import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../redux/workouts'; // Ensure this action is correctly set up in your Redux store
import './WorkoutList.css';

const WorkoutFormModal = ({ onClose, onWorkoutAdded }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Planned'); // Default to 'Planned'
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkoutData = {
      date,
      status,
      duration,
      intensity,
      location,
      notes,
    };
    try {
      const createdWorkout = await dispatch(addWorkout(newWorkoutData));
      onWorkoutAdded(createdWorkout);
      onClose();
    } catch (error) {
      console.error('Failed to add new workout', error);
      setErrors(
        error.response
          ? error.response.data.errors
          : ['Failed to add new workout']
      );
    }
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='workout-edit-form'>
          <h2 className='heading'>
            Add New Workout<span className='blinking-cursor'></span>
          </h2>
          {errors.length > 0 && (
            <div className='modal-errors'>
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          )}
          <input
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value='Planned'>Planned</option>
            <option value='Completed'>Completed</option>
            <option value='Skipped'>Skipped</option>
          </select>
          <input
            type='number'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder='Duration (minutes)'
          />
          <input
            type='number'
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            placeholder='Intensity (1-10)'
          />
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Location'
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder='Workout Notes (optional)'
          />
          <div className='modal-actions'>
            <button type='submit' className='btn-primary'>
              Add Workout
            </button>
            <button type='button' onClick={onClose} className='btn-cancel'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkoutFormModal;
