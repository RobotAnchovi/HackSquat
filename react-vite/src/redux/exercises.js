import { csrfFetch } from './csrf';
//! ALL ROUTES HAVE BEEN VERIFIED

//*====> Action Types for exercises <====
const LOAD_EXERCISES = 'exercises/LOAD';
const LOAD_EXERCISE = 'exercises/LOAD_ONE';
const ADD_EXERCISE = 'exercises/ADD';
const UPDATE_EXERCISE = 'exercises/UPDATE';
const DELETE_EXERCISE = 'exercises/DELETE';

//*====> Action Creators for exercises <====
const loadExerciseAction = (exercises) => ({
  type: LOAD_EXERCISES,
  exercises,
});

const loadOneExerciseAction = (exercise) => ({
  type: LOAD_EXERCISE,
  exercise,
});

const addExerciseAction = (exercise) => ({
  type: ADD_EXERCISE,
  exercise,
});

const updateExerciseAction = (exercise) => ({
  type: UPDATE_EXERCISE,
  exercise,
});

const deleteExerciseAction = (exerciseId) => ({
  type: DELETE_EXERCISE,
  exerciseId,
});

//*====> Thunks for exercises <====
export const loadExercises = () => async (dispatch) => {
  const response = await csrfFetch('/api/exercises');
  if (response.ok) {
    const exercises = await response.json();
    dispatch(loadExerciseAction(exercises));
  } else {
    const error = await response.json();
    throw new Error(`Error loading exercises: ${error.message}`);
  }
};

export const loadOneExercise = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}`);
  if (response.ok) {
    const exercise = await response.json();
    dispatch(loadOneExerciseAction(exercise));
  } else {
    const error = await response.json();
    throw new Error(`Error loading exercise: ${error.message}`);
  }
};

export const addExercise = (exerciseData) => async (dispatch) => {
  const response = await csrfFetch('/api/exercises', {
    method: 'POST',
    body: JSON.stringify(exerciseData),
  });
  if (response.ok) {
    const newExercise = await response.json();
    dispatch(addExerciseAction(newExercise));
    return newExercise;
  } else {
    const error = await response.json();
    throw new Error(`Error adding exercise: ${error.message}`);
  }
};

export const updateExercise =
  (exerciseId, exerciseData) => async (dispatch) => {
    const response = await csrfFetch(`/api/exercises/${exerciseId}`, {
      method: 'PUT',
      body: JSON.stringify(exerciseData),
    });
    if (response.ok) {
      const updatedExercise = await response.json();
      dispatch(updateExerciseAction(updatedExercise));
      return updatedExercise;
    } else {
      const error = await response.json();
      throw new Error(`Error updating exercise: ${error.message}`);
    }
  };

export const deleteExercise = (exerciseId) => async (dispatch) => {
  const response = await csrfFetch(`/api/exercises/${exerciseId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteExerciseAction(exerciseId));
  } else {
    const error = await response.json();
    throw new Error(`Error deleting exercise: ${error.message}`);
  }
};

//*====> Reducer for exercises <====
const initialState = {
  exercises: [],
  exercise: {},
};

export default function exercisesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXERCISES:
      return {
        ...state,
        exercises: action.exercises,
      };
    case LOAD_EXERCISE:
      return {
        ...state,
        exercise: action.exercise,
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [...state.exercises, action.exercise],
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map((exercise) =>
          exercise.id === action.exercise.id ? action.exercise : exercise
        ),
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          (exercise) => exercise.id !== action.exerciseId
        ),
      };
    default:
      return state;
  }
}
