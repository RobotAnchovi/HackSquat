import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkout, deleteWorkout } from '../../redux/workouts';
import ConfirmDeleteFormModal from '../ConfirmDeleteFormModal';
import { formatDate } from '../../utils/dateFormatter';
import './WorkoutList.css';

const WorkoutEditModal = ({
  workout,
  onClose,
  onWorkoutUpdated,
  onWorkoutDeleted,
}) => {
  console.log('WORKOUTEDITFORMMODAL WORKOUT:', workout);
  const dispatch = useDispatch();
  const [date, setDate] = useState(workout ? workout.date : '');
  const [notes, setNotes] = useState(workout ? workout.notes : '');
  const [workoutPlanId, setWorkoutPlanId] = useState(
    workout ? workout.workout_plan_id : ''
  );
  const [duration, setDuration] = useState(workout ? workout.duration : '');
  const [intensity, setIntensity] = useState(workout ? workout.intensity : '');
  const [location, setLocation] = useState(workout ? workout.location : '');
  const [status, setStatus] = useState(workout ? workout.status : '');
  const [errors, setErrors] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (workout) {
      setDate(workout.date);
      setNotes(workout.notes);
      setWorkoutPlanId(workout.workout_plan_id);
      setDuration(workout.duration);
      setIntensity(workout.intensity);
      setLocation(workout.location);
      setStatus(workout.status);
    }
  }, [workout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = formatDate(date);
    const updatedWorkoutData = {
      date: formattedDate,
      notes,
      workout_plan_id: workoutPlanId,
      duration,
      intensity,
      location,
      status,
    };
    try {
      console.log('Submitting:', updatedWorkoutData);
      await dispatch(updateWorkout(workout.id, updatedWorkoutData));
      onWorkoutUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update workout', error);
      setErrors(
        error.response
          ? error.response.data.errors
          : ['Failed to update workout']
      );
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deleteWorkout(workout.id));
      onWorkoutDeleted(workout.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete workout', error);
      setErrors(
        error.response
          ? error.response.data.errors
          : ['Failed to delete workout']
      );
    }
  };

  // const handleCancelDelete = () => {
  //   setShowConfirmDelete(false);
  // };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='workout-edit-form'>
          <h2 className='heading'>
            Edit Workout<span className='blinking-cursor'></span>
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
            <option value=''>Select Status</option>
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
              Update Workout
            </button>
            <button
              type='button'
              onClick={() => setShowConfirmDelete(true)}
              className='btn-delete'
            >
              Delete Workout
            </button>
            <button type='button' onClick={onClose} className='btn-cancel'>
              Cancel
            </button>
          </div>
        </form>
        {showConfirmDelete && (
          <ConfirmDeleteFormModal
            text='Are you sure you want to delete this workout?'
            deleteCb={handleDeleteConfirmed}
            cancelDeleteCb={() => setShowConfirmDelete(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutEditModal;
