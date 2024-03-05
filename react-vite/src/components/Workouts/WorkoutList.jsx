import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkouts } from '../../redux/workouts';
import { sessionUser } from '../../redux/session';
import WorkoutEditModal from './WorkoutEditModal';
import WorkoutFormModal from './WorkoutFormModal';
import { parseISODate } from '../../utils/dateFormatter';
import './WorkoutList.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(sessionUser);
  const userId = currentUser?.id;
  const allWorkouts = useSelector((state) => state.workouts.workouts);

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getWorkouts(userId));
    }
  }, [dispatch, userId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completedWorkouts = allWorkouts
    .filter((workout) => parseISODate(workout.date) < today)
    .sort((a, b) => parseISODate(b.date) - parseISODate(a.date));
  const plannedWorkouts = allWorkouts
    .filter((workout) => parseISODate(workout.date) >= today)
    .sort((a, b) => parseISODate(a.date) - parseISODate(b.date));

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setShowEditModal(true);
  };
  const refreshWorkouts = useCallback(() => {
    if (userId) {
      dispatch(getWorkouts(userId));
    }
  }, [dispatch, userId]);

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedWorkout(null);
    refreshWorkouts();
  };

  const handleWorkoutDeleted = () => {
    refreshWorkouts();
  };

  return (
    <div className='workout-list-container'>
      <div className='workout-list-top'>
        <h2>
          Workouts<span className='blinking-cursor'></span>
        </h2>
        <button
          className='add-workout-button'
          onClick={() => setShowAddModal(true)}
        >
          Add a Workout
        </button>
      </div>
      {/* Planned Workouts Section */}
      <div className='planned-workouts-section'>
        <h3>Planned Workouts</h3>
        {plannedWorkouts.length > 0 ? (
          <table className='workout-table'>
            <thead>
              <tr>
                <th className='date-header'>Date</th>
                <th className='action-header'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plannedWorkouts.map((workout) => (
                <tr key={workout.id} className='workout-item'>
                  <td>{parseISODate(workout.date).toLocaleDateString()}</td>
                  <td className='planned-workout-btns'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWorkoutClick(workout);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='start-workout-button'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering row click
                        setShowAddModal(true);
                        console.log(`Starting workout ID: ${workout.id}`);
                      }}
                    >
                      Start Workout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          plannedWorkouts.length === 0 && <p>No planned workouts found.</p>
        )}
      </div>

      {/* Completed Workouts Section */}
      <div className='completed-workouts-section'>
        <h3>Previous Workouts</h3>
        <table className='workout-table'>
          <thead>
            <tr>
              <th className='date-header'>Date</th>
              <th className='action-header'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedWorkouts.map((workout) => (
              <tr key={workout.id} className='workout-item'>
                <td>{parseISODate(workout.date).toLocaleDateString()}</td>
                <td className='previous-workout-btns'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWorkoutClick(workout);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {completedWorkouts.length === 0 && <p>No completed workouts found.</p>}
      </div>
      {showAddModal && (
        <WorkoutFormModal
          onClose={() => {
            setShowAddModal(false);
            refreshWorkouts();
          }}
          onWorkoutAdded={() => {
            setShowAddModal(false);
            refreshWorkouts();
          }}
        />
      )}
      {showEditModal && selectedWorkout && (
        <WorkoutEditModal
          workout={selectedWorkout}
          onClose={handleCloseModal}
          onWorkoutUpdated={refreshWorkouts}
          onWorkoutDeleted={handleWorkoutDeleted}
        />
      )}
    </div>
  );
};

export default WorkoutList;
