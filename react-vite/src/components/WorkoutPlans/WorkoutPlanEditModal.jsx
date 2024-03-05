import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateWorkoutPlan, deleteWorkoutPlan } from '../../redux/workoutPlans';
import ConfirmDeleteFormModal from '../ConfirmDeleteFormModal';
import { useSelector } from 'react-redux';

const WorkoutPlanEditModal = ({
  plan,
  onClose,
  onPlanUpdated,
  onPlanDeleted,
}) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState(plan ? plan.name : '');
  const [description, setDescription] = useState(plan ? plan.description : '');
  const [errors, setErrors] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setDescription(plan.description);
    }
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlanData = {
      name,
      description,
    };
    const userId = currentUser?.id;
    try {
      if (!userId || !plan?.plan_id) {
        throw new Error('Invalid user or plan ID');
      }
      await dispatch(updateWorkoutPlan(userId, plan.plan_id, updatedPlanData));
      onPlanUpdated();
      onClose();
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const userId = currentUser?.id;
      await dispatch(deleteWorkoutPlan(userId, plan.plan_id));
      onPlanDeleted(plan.plan_id);
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
            Edit Workout Plan<span className='blinking-cursor'></span>
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
          <button type='submit' className='btn-primary'>
            Update Plan
          </button>
          <button
            type='button'
            onClick={handleShowConfirmDelete}
            className='btn-delete'
          >
            Delete Plan
          </button>
        </form>
        {showConfirmDelete && (
          <ConfirmDeleteFormModal
            text='Are you sure you want to delete this workout plan?'
            deleteCb={handleDeleteConfirmed}
            cancelDeleteCb={() => setShowConfirmDelete(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkoutPlanEditModal;
