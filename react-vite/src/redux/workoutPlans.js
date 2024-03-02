import { csrfFetch } from './csrf';

//*====> Actions <====
const GET_WORKOUT_PLANS = 'workoutPlans/GET';
const ADD_WORKOUT_PLAN = 'workoutPlans/ADD';
const DELETE_WORKOUT_PLAN = 'workoutPlans/DELETE';
const UPDATE_WORKOUT_PLAN = 'workoutPlans/UPDATE';

//*====> Action Creators <====
const getWorkoutPlansAction = (workoutPlans) => ({
  type: GET_WORKOUT_PLANS,
  payload: workoutPlans,
});

const addWorkoutPlanAction = (workoutPlan) => ({
  type: ADD_WORKOUT_PLAN,
  payload: workoutPlan,
});

const deleteWorkoutPlanAction = (workoutPlanId) => ({
  type: DELETE_WORKOUT_PLAN,
  payload: workoutPlanId,
});

const updateWorkoutPlanAction = (workoutPlan) => ({
  type: UPDATE_WORKOUT_PLAN,
  payload: workoutPlan,
});

//*====> Thunks <====
export const getWorkoutPlans = () => async (dispatch) => {
  const response = await csrfFetch('/api/workout-plans');
  if (response.ok) {
    const workoutPlans = await response.json();
    dispatch(getWorkoutPlansAction(workoutPlans));
  } else {
    const error = await response.json();
    throw new Error(`Error loading workout plans: ${error.message}`);
  }
};

export const addWorkoutPlan = (workoutPlanData) => async (dispatch) => {
  const response = await csrfFetch('/api/workout-plans', {
    method: 'POST',
    body: JSON.stringify(workoutPlanData),
  });
  if (response.ok) {
    const workoutPlan = await response.json();
    dispatch(addWorkoutPlanAction(workoutPlan));
  } else {
    const error = await response.json();
    throw new Error(`Error adding workout plan: ${error.message}`);
  }
};

export const deleteWorkoutPlan = (workoutPlanId) => async (dispatch) => {
  const response = await csrfFetch(`/api/workout-plans/${workoutPlanId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const workoutPlan = await response.json();
    dispatch(deleteWorkoutPlanAction(workoutPlan.id));
  } else {
    const error = await response.json();
    throw new Error(`Error deleting workout plan: ${error.message}`);
  }
};

export const updateWorkoutPlan = (workoutPlanData) => async (dispatch) => {
  const response = await csrfFetch(`/api/workout-plans/${workoutPlanData.id}`, {
    method: 'PUT',
    body: JSON.stringify(workoutPlanData),
  });
  if (response.ok) {
    const workoutPlan = await response.json();
    dispatch(updateWorkoutPlanAction(workoutPlan));
  } else {
    const error = await response.json();
    throw new Error(`Error updating workout plan: ${error.message}`);
  }
};

//*====> Reducer <====
const initialState = {
  workoutPlans: [],
};

export default function workoutPlansReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUT_PLANS:
      return { ...state, workoutPlans: action.payload };
    case ADD_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlans: [...state.workoutPlans, action.payload],
      };
    case DELETE_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlans: state.workoutPlans.filter(
          (workoutPlan) => workoutPlan.id !== action.payload
        ),
      };
    case UPDATE_WORKOUT_PLAN:
      return {
        ...state,
        workoutPlans: state.workoutPlans.map((workoutPlan) =>
          workoutPlan.id === action.payload.id ? action.payload : workoutPlan
        ),
      };
    default:
      return state;
  }
}
