import { csrfFetch } from './csrf';
//! THESE ROUTES HAVE BEEN VERIFIED

//*====> Actions <====
const GET_WORKOUT_EXERCISES = 'workoutExercises/GET';
const ADD_WORKOUT_EXERCISE = 'workoutExercises/ADD';
const DELETE_WORKOUT_EXERCISE = 'workoutExercises/DELETE';
const UPDATE_WORKOUT_EXERCISE = 'workoutExercises/UPDATE';

//*====> Action Creators <====
const getWorkoutExercisesAction = (workoutExercises) => ({
  type: GET_WORKOUT_EXERCISES,
  payload: workoutExercises,
});

const addWorkoutExerciseAction = (workoutExercise) => ({
  type: ADD_WORKOUT_EXERCISE,
  payload: workoutExercise,
});

const deleteWorkoutExerciseAction = (workoutExerciseId) => ({
  type: DELETE_WORKOUT_EXERCISE,
  payload: workoutExerciseId,
});

const updateWorkoutExerciseAction = (workoutExercise) => ({
  type: UPDATE_WORKOUT_EXERCISE,
  payload: workoutExercise,
});

//*====> Thunks <====
export const getWorkoutExercises = (workoutId) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/workout-exercises/workout/${workoutId}/exercises`
  );
  if (response.ok) {
    const workoutExercises = await response.json();
    dispatch(getWorkoutExercisesAction(workoutExercises));
  } else {
    const error = await response.json();
    throw new Error(`Error loading workout exercises: ${error.message}`);
  }
};

export const addWorkoutExercise = (workoutExerciseData) => async (dispatch) => {
  const response = await csrfFetch('/api/workout-exercises/', {
    method: 'POST',
    body: JSON.stringify(workoutExerciseData),
  });
  if (response.ok) {
    const workoutExercise = await response.json();
    dispatch(addWorkoutExerciseAction(workoutExercise));
  } else {
    const error = await response.json();
    throw new Error(`Error adding workout exercise: ${error.message}`);
  }
};

export const deleteWorkoutExercise =
  (workoutExerciseId) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/workout-exercises/${workoutExerciseId}`,
      {
        method: 'DELETE',
      }
    );
    if (response.ok) {
      dispatch(deleteWorkoutExerciseAction(workoutExerciseId));
    } else {
      const error = await response.json();
      throw new Error(`Error deleting workout exercise: ${error.message}`);
    }
  };

export const updateWorkoutExercise =
  (workoutExerciseId, workoutExerciseData) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/workout-exercises/${workoutExerciseId}`,
      {
        method: 'PUT',
        body: JSON.stringify(workoutExerciseData),
      }
    );
    if (response.ok) {
      const workoutExercise = await response.json();
      dispatch(updateWorkoutExerciseAction(workoutExercise));
    } else {
      const error = await response.json();
      throw new Error(`Error updating workout exercise: ${error.message}`);
    }
  };

//*====> Reducer <====
const initialState = {
  workoutExercises: [],
};

export default function workoutExercisesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WORKOUT_EXERCISES: {
      return { ...state, workoutExercises: action.payload };
    }
    case ADD_WORKOUT_EXERCISE: {
      return {
        ...state,
        workoutExercises: [...state.workoutExercises, action.payload],
      };
    }
    case DELETE_WORKOUT_EXERCISE: {
      return {
        ...state,
        workoutExercises: state.workoutExercises.filter(
          (workoutExercise) => workoutExercise.id !== action.payload
        ),
      };
    }
    case UPDATE_WORKOUT_EXERCISE:
      return {
        ...state,
        workoutExercises: state.workoutExercises.map((exercise) =>
          exercise.id === action.payload.id ? action.payload : exercise
        ),
      };
    default:
      return state;
  }
}
