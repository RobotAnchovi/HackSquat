import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadExercises } from '../../redux/exercises';
import './ExerciseList.css';
import ExerciseFormModal from './ExerciseFormModal';
import ExerciseEditModal from './ExerciseEditModal';

const ExerciseList = () => {
  const dispatch = useDispatch();
  const { exercises } = useSelector((state) => state.exercises);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [showEditExerciseModal, setShowEditExerciseModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

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

  const openEditModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowEditExerciseModal(true);
  };

  const handleCloseModal = () => {
    setShowAddExerciseModal(false);
    setShowEditExerciseModal(false);
    setSelectedExercise(null);
  };

  const refreshExercises = () => {
    dispatch(loadExercises());
  };

  const removeExerciseFromState = (exerciseId) => {
    setFilteredExercises(
      filteredExercises.filter(
        (exercise) => exercise.exercise_id !== exerciseId
      )
    );
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
          onClick={() => setShowAddExerciseModal(true)}
        >
          Add Exercise
        </button>
      </div>
      {showAddExerciseModal && <ExerciseFormModal onClose={handleCloseModal} />}
      {showEditExerciseModal && selectedExercise && (
        <ExerciseEditModal
          exercise={selectedExercise}
          onClose={handleCloseModal}
          onExerciseUpdated={refreshExercises}
          onExerciseDeleted={(exerciseId) => {
            removeExerciseFromState(exerciseId);
            refreshExercises();
          }}
        />
      )}
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
                  <button className='add-to-plan-button'>Add to Plan</button>
                  {exercise.user_id && (
                    <>
                      <button
                        className='edit-exercise-button'
                        onClick={() => openEditModal(exercise)}
                      >
                        Edit
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
