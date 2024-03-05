import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkouts } from '../../redux/workouts';
import { sessionUser } from '../../redux/session';
import './WorkoutList.css';

const WorkoutList = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(sessionUser);
  const userId = currentUser?.id;
  const allWorkouts = useSelector((state) => state.workouts.workouts);

  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(getWorkouts(userId));
    }
  }, [dispatch, userId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() + 1); //^ Set to tomorrow to include today's workouts

  const completedWorkouts = allWorkouts
    .filter((workout) => new Date(workout.date) < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const plannedWorkouts = allWorkouts
    .filter((workout) => new Date(workout.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleWorkoutClick = (workout) => {
    setSelectedWorkout(workout);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedWorkout(null);
  };

  return (
    <div className='workout-list-container'>
      <h2>
        Workouts<span className='blinking-cursor'></span>
      </h2>

      {/* Planned Workouts Section */}
      <div className='planned-workouts-section'>
        <h3>Planned Workouts</h3>
        {plannedWorkouts.length > 0 ? (
          <table className='workout-table'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plannedWorkouts.map((workout) => (
                <tr key={workout.id} className='workout-item'>
                  <td>{new Date(workout.date).toLocaleDateString()}</td>
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
                        // Logic to start the workout goes here
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
        <h3>Completed Workouts</h3>
        <table className='workout-table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {completedWorkouts.map((workout) => (
              <tr key={workout.id} className='workout-item'>
                <td>{new Date(workout.date).toLocaleDateString()}</td>
                <td>
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

      {/* Edit Modal */}
      {showEditModal && selectedWorkout && (
        <WorkoutEditModal
          workout={selectedWorkout}
          onClose={handleCloseModal}
          // Pass any additional props needed for the modal
        />
      )}
    </div>
  );
};

export default WorkoutList;
