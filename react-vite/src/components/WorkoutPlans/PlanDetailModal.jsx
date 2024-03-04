import './WorkoutPlan.css';

const PlanDetailsModal = ({ plan, onClose }) => {
  if (!plan) return null;

  const currentDate = new Date();
  const upcomingWorkouts = plan.workouts
    .filter((workout) => new Date(workout.date) > currentDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const previousWorkouts = plan.workouts
    .filter((workout) => new Date(workout.date) <= currentDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <h2 className='heading'>
          {plan.name}
          <span id='unique-blinking-cursor' className='blinking-cursor'></span>
        </h2>
        <p>{plan.description}</p>

        {upcomingWorkouts.length > 0 ? (
          <div>
            <h3 className='subheading'>Upcoming Workouts</h3>
            <ul>
              {upcomingWorkouts.map((workout) => (
                <li key={workout.id}>
                  {workout.date}: {workout.notes}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No upcoming workouts.</p>
        )}

        {previousWorkouts.length > 0 ? (
          <div>
            <h3 className='subheading'>Completed Workouts</h3>
            <ul>
              {previousWorkouts.map((workout) => (
                <li key={workout.id}>
                  {workout.date}: {workout.notes}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No completed workouts.</p>
        )}

        <button className='btn-primary' onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PlanDetailsModal;
