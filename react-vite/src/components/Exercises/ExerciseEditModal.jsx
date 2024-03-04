import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateExercise, deleteExercise } from '../../redux/exercises';
import ConfirmDeleteFormModal from '../ConfirmDeleteFormModal';

const ExerciseEditModal = ({ exercise, onClose, onExerciseDeleted }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(exercise.name);
  const [description, setDescription] = useState(exercise.description || '');
  const [category, setCategory] = useState(exercise.category);
  const [isPublic, setIsPublic] = useState(exercise.is_public);
  const [errors, setErrors] = useState([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const categories = [
    { value: 'strength', label: 'Strength' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'balance', label: 'Balance' },
    { value: 'mobility', label: 'Mobility' },
    { value: 'accessory', label: 'Accessory' },
    { value: 'flexibility', label: 'Flexibility' },
    { value: 'plyometrics', label: 'Plyometrics' },
    { value: 'bodyweight', label: 'Bodyweight' },
    { value: 'core', label: 'Core' },
    { value: 'power', label: 'Power' },
    { value: 'speed', label: 'Speed' },
    { value: 'olympic', label: 'Olympic' },
    { value: 'other', label: 'Other' },
  ];
  useEffect(() => {
    setName(exercise.name);
    setDescription(exercise.description || '');
    setCategory(exercise.category);
    setIsPublic(exercise.is_public);
  }, [exercise]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exerciseData = {
      name,
      description,
      category,
      is_public: isPublic,
    };
    try {
      console.log(exercise.exercise_id);
      await dispatch(updateExercise(exercise.exercise_id, exerciseData));
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An error occurred. Please try again.']);
      }
    }
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await dispatch(deleteExercise(exercise.exercise_id));
      if (onExerciseDeleted) onExerciseDeleted(exercise.exercise_id);
      onClose();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An error occurred. Please try again.']);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDelete(false);
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='exercise-form'>
          <h2 className='heading'>Edit Exercise</h2>
          {errors.length > 0 && (
            <div className='modal-errors'>
              {errors.map((error, idx) => (
                <p key={idx}>{error}</p>
              ))}
            </div>
          )}
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Exercise Name'
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description (optional)'
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          <div>
            <label>
              <input
                type='checkbox'
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              Make this exercise public
            </label>
          </div>
          <button type='submit' className='btn-primary'>
            Update Exercise
          </button>
          <button
            type='button'
            onClick={handleShowConfirmDelete}
            className='btn-delete'
          >
            Delete Exercise
          </button>
        </form>
        {showConfirmDelete && (
          <ConfirmDeleteFormModal
            text='Are you sure you want to delete this exercise?'
            deleteCb={handleDeleteConfirmed}
            cancelDeleteCb={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseEditModal;
