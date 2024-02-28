import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { disabledSubmitButton, enabledSubmitButton } from '../../utils/dom';
import * as sessionActions from '../../redux/session';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async (e, loginAsDemoUser1, loginAsDemoUser2) => {
    e.preventDefault();
    disabledSubmitButton();

    let data;

    if (loginAsDemoUser1) {
      data = await dispatch(
        sessionActions.login({
          email: 'jason@aa.io',
          password: 'password',
        })
      );
    } else if (loginAsDemoUser2) {
      data = await dispatch(
        sessionActions.login({
          email: 'dwayne@aa.io',
          password: 'password',
        })
      );
    } else {
      data = await dispatch(
        sessionActions.login({
          email,
          password,
        })
      );
    }

    if (data?.errors) {
      enabledSubmitButton();
      if (data.errors.message)
        return setModalContent(
          <h2 className='subheading modal-errors'>{data.errors.message}</h2>
        );
      return setErrors(data.errors);
    }
    setModalContent(<h2 className='subheading alert-success'>Success!!!</h2>);
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return !email.length || password.length < 6;
  };

  return (
    <>
      <h2 className='subheading'>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type='text'
          spellCheck={false}
          placeholder='user@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p className='modal-errors'>{errors.email}</p>}
        <label>Password</label>
        <input
          type='password'
          spellCheck={false}
          placeholder='At least 6 characters'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className='modal-errors'>{errors.password}</p>}
        <button
          type='submit'
          className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
          disabled={inputInvalid()}
        >
          Submit
        </button>
        <div className='demo-users'>
          <p className='text'>Login as demo user: </p>
          <p
            type='submit'
            onClick={(e) => handleSubmit(e, true, false)}
            className='demo-user'
          >
            user 1
          </p>
          <p
            type='submit'
            onClick={(e) => handleSubmit(e, false, true)}
            className='demo-user'
          >
            user 2
          </p>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
