import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addWorkoutPlan } from '../../redux/workoutPlans';

const WorkoutPlanFormModal = ({ onClose, onPlanCreated }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPlan = { name, description };
      await dispatch(addWorkoutPlan(newPlan));
      onPlanCreated();
      onClose();
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='workout-plan-form'>
          <h2 className='heading'>
            Create New Workout Plan
            <span
              id='unique-blinking-cursor'
              className='blinking-cursor'
            ></span>
          </h2>
          {errors.length > 0 && (
            <div className='modal-errors'>
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          )}
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Plan Name'
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Plan Description (optional)'
          />
          {/* Placeholder for future "Add Exercises" functionality */}
          <div>{/* Future "Add Exercises" component goes here */}</div>
          <button type='submit' className='btn-primary'>
            Create Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutPlanFormModal;
