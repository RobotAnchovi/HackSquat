import { csrfFetch } from './csrf';
//! THESE ROUTES HAVE BEEN VERIFIED
//*====> Actions <====
const GET_WORKOUTS = 'workouts/GET';
const GET_WORKOUT = 'workouts/GET_ONE';
const ADD_WORKOUT = 'workouts/ADD';
const DELETE_WORKOUT = 'workouts/DELETE';
const UPDATE_WORKOUT = 'workouts/UPDATE';

//*====> Action Creators <====
const getWorkoutsAction = (workouts) => ({
  type: GET_WORKOUTS,
  payload: workouts,
});

const getWorkoutAction = (workout) => ({
  type: GET_WORKOUT,
  payload: workout,
});

const addWorkoutAction = (workout) => ({
  type: ADD_WORKOUT,
  payload: workout,
});

const deleteWorkoutAction = (workout) => ({
  type: DELETE_WORKOUT,
  payload: workout,
});

const updateWorkoutAction = (workout) => ({
  type: UPDATE_WORKOUT,
  payload: workout,
});

//*====> Thunks <====
//^ Get all workouts for a user
export const getWorkouts = (userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/workouts/user/${userId}`);
  if (response.ok) {
    const workouts = await response.json();
    dispatch(getWorkoutsAction(workouts));
  } else {
    const error = await response.json();
    throw new Error(`Error loading workouts: ${error.message}`);
  }
};

//^ Get a single workout
export const getWorkout = (workoutId) => async (dispatch) => {
  const response = await csrfFetch(`/api/workouts/${workoutId}`);
  if (response.ok) {
    const workout = await response.json();
    dispatch(getWorkoutAction(workout));
  } else {
    const error = await response.json();
    throw new Error(`Error loading workout: ${error.message}`);
  }
};

export const addWorkout = (workoutData) => async (dispatch) => {
  const response = await csrfFetch('/api/workouts/', {
    method: 'POST',
    body: JSON.stringify(workoutData),
  });
  if (response.ok) {
    const workout = await response.json();
    dispatch(addWorkoutAction(workout));
  } else {
    const error = await response.json();
    throw new Error(`Error adding workout: ${error.message}`);
  }
};

export const deleteWorkout = (workoutId) => async (dispatch) => {
  const response = await csrfFetch(`/api/workouts/${workoutId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteWorkoutAction(workoutId));
  } else {
    const error = await response.json();
    throw new Error(`Error deleting workout: ${error.message}`);
  }
};

export const updateWorkout = (workoutId, workoutData) => async (dispatch) => {
  const response = await csrfFetch(`/api/workouts/${workoutId}`, {
    method: 'PUT',
    body: JSON.stringify(workoutData),
  });
  if (response.ok) {
    const workout = await response.json();
    dispatch(updateWorkoutAction(workout));
  } else {
    const error = await response.json();
    throw new Error(`Error updating workout: ${error.message}`);
  }
};

//*====> Reducer <====
const initialState = {
  workouts: [],
  workout: {},
};

export default function workoutsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUTS:
      return { ...state, workouts: action.payload };
    case GET_WORKOUT:
      return { ...state, workout: action.payload };
    case ADD_WORKOUT:
      return { ...state, workouts: [...state.workouts, action.payload] };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout.id !== action.payload
        ),
      };
    case UPDATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.map((workout) =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };
    default:
      return state;
  }
}
