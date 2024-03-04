import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadExercises,
  // loadOneExercise,
  // addExercise,
  // updateExercise,
  deleteExercise as deleteExerciseAction,
} from '../../redux/exercises';
import './ExerciseList.css';
// import ExerciseFormModal from './ExerciseFormModal';
// import ExerciseEditModal from './ExerciseEditModal';

const ExerciseList = () => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    dispatch(loadExercises());
  }, [dispatch]);

  useEffect(() => {
    let sortedExercises = [...exercises];

    if (sortOption === 'category') {
      sortedExercises.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortOption === 'name') {
      sortedExercises.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'userCreated') {
      sortedExercises = sortedExercises.filter(
        (exercise) => !exercise.is_public
      );
    }

    setFilteredExercises(sortedExercises);
  }, [exercises, sortOption]);

  useEffect(() => {
    const searchResults = exercises.filter(
      (exercise) =>
        (exercise.name
          ? exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false) ||
        (exercise.description
          ? exercise.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          : false)
    );
    setFilteredExercises(searchResults);
  }, [searchTerm, exercises]);

  const handleDeleteExercise = (exerciseId) => {
    dispatch(deleteExerciseAction(exerciseId));
  };

  return (
    <div className='exercise-list-container'>
      <h2>
        Exercises<span className='blinking-cursor'></span>
      </h2>
      <div className='exercise-controls'>
        <div className='exercise-search-controls'>
          <input
            className='exercise-search-input'
            type='text'
            placeholder='Search exercises...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className='exercise-sort-select'
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value='name'>Alphabetical</option>
            <option value='category'>Category</option>
            <option value='userCreated'>User Created</option>
          </select>
        </div>
        <button
          className='add-exercise-button'
          onClick={() => {
            /* Open Add Exercise Modal */
          }}
        >
          Add Exercise
        </button>
      </div>
      {filteredExercises.length > 0 ? (
        <table className='exercise-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.map((exercise) => (
              <tr key={exercise.exercise_id}>
                <td>{exercise.name}</td>
                <td>{exercise.category}</td>
                <td className='exercise-actions'>
                  {exercise.user_id && (
                    <>
                      <button
                        className='edit-exercise-button'
                        onClick={() => {
                          /* Open Edit Exercise Modal, passing exercise as prop */
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className='delete-exercise-button'
                        onClick={() =>
                          handleDeleteExercise(exercise.exercise_id)
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='no-exercise-results'>
          No exercises found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default ExerciseList;
