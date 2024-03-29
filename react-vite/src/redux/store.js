import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import exercisesReducer from './exercises';
import workoutPlansReducer from './workoutPlans';
import workoutExercisesReducer from './workoutExercises';
import workoutsReducer from './workouts';

const rootReducer = combineReducers({
  session: sessionReducer,
  exercises: exercisesReducer,
  workoutPlans: workoutPlansReducer,
  workoutExercises: workoutExercisesReducer,
  workouts: workoutsReducer,
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
