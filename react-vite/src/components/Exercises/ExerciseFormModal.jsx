import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExercise } from '../../redux/exercises';

const ExerciseFormModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('strength');
  const [isPublic, setIsPublic] = useState(false);
  const [errors, setErrors] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addExercise({ name, description, category, is_public: isPublic })
      );
      onClose();
    } catch (error) {
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div id='modal'>
      <div id='modal-background' onClick={onClose}></div>
      <div id='modal-content'>
        <form onSubmit={handleSubmit} className='exercise-form'>
          <h2 className='heading'>Add New Exercise</h2>
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
            Add Exercise
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseFormModal;
