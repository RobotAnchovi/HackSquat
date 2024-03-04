import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkoutPlans } from '../../redux/workoutPlans';
import { sessionUser } from '../../redux/session';
import PlanDetailsModal from './PlanDetailModal';
import WorkoutPlanFormModal from './WorkoutPlanFormModal';
import WorkoutPlanEditModal from './WorkoutPlanEditModal';
import './WorkoutPlan.css';

const WorkoutPlans = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(sessionUser);
  const userId = currentUser?.id;
  const workoutPlans = useSelector((state) => state.workoutPlans.workoutPlans);
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
  const [showPlanDetailsModal, setShowPlanDetailsModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(getWorkoutPlans(userId));
    }
  }, [dispatch, userId]);

  const handleOpenPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setShowPlanDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowCreatePlanModal(false);
    setShowEditPlanModal(false);
    setShowPlanDetailsModal(false);
    setSelectedPlan(null);
    refreshWorkoutPlans();
  };

  const handleOpenCreatePlanModal = () => {
    setShowCreatePlanModal(true);
  };

  const handleOpenEditPlanModal = (plan) => {
    console.log('Selected plan for editing:', plan);
    setSelectedPlan(plan);
    setShowEditPlanModal(true);
  };

  const refreshWorkoutPlans = () => {
    dispatch(getWorkoutPlans(userId));
  };

  return (
    <div className='workout-plan-container'>
      <h2>
        Workout Plans<span className='blinking-cursor'></span>
      </h2>
      <div className='workout-plan-controls'>
        <button
          className='create-workout-plan-button'
          onClick={handleOpenCreatePlanModal}
        >
          Create New Plan
        </button>
        {showCreatePlanModal && (
          <WorkoutPlanFormModal
            onClose={handleCloseModal}
            onPlanCreated={refreshWorkoutPlans}
          />
        )}
      </div>
      {workoutPlans.length > 0 ? (
        <table className='workout-plan-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Update Plan</th>
            </tr>
          </thead>
          <tbody>
            {workoutPlans.map((plan) => (
              <tr key={plan.plan_id}>
                <td>
                  <div
                    className='clickable-plan-name'
                    onClick={() => handleOpenPlanDetails(plan)}
                  >
                    {plan.name}
                  </div>
                </td>
                <td>{plan.description}</td>
                <td>
                  <button
                    className='update-plan-button'
                    onClick={() => handleOpenEditPlanModal(plan)}
                  >
                    Update Plan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='no-workout-plan-results'>No workout plans found.</p>
      )}
      {showEditPlanModal && (
        <WorkoutPlanEditModal
          plan={selectedPlan}
          onClose={handleCloseModal}
          onPlanUpdated={refreshWorkoutPlans}
          onPlanDeleted={refreshWorkoutPlans}
        />
      )}
      {showPlanDetailsModal && (
        <PlanDetailsModal
          plan={selectedPlan}
          onClose={handleCloseModal}
          // Pass other props as needed
        />
      )}
    </div>
  );
};

export default WorkoutPlans;
