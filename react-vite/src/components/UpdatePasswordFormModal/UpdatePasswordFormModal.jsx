import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { disabledSubmitButton, enabledSubmitButton } from '../../utils/dom';
import * as sessionActions from '../../redux/session';

function UpdatePasswordFormModal({ user }) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    disabledSubmitButton();

    const data = await dispatch(
      sessionActions.updateUserPassword({
        password,
        new_password: newPassword,
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      return setErrors(data.errors);
    }
    setModalContent(
      <h2 className='subheading alert-success'>
        Successfully Updated! Please log in again!
      </h2>
    );
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return password.length < 6 || newPassword.length < 6;
  };

  if (!user) return;

  return (
    <>
      <h2 className='subheading'>Update Password</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>Current Password</label>
        <input
          type='password'
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className='modal-errors'>{errors.password}</p>}
        <label>New Password</label>
        <input
          type='password'
          spellCheck={false}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {errors.newPassword && (
          <p className='modal-errors'>{errors.newPassword}</p>
        )}
        <button
          type='submit'
          className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
          disabled={inputInvalid()}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default UpdatePasswordFormModal;
