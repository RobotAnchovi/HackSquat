import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { disabledSubmitButton, enabledSubmitButton } from '../../utils/dom';
import * as sessionActions from '../../redux/session';
import SignupFormModal from '../SignupFormModal';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async (e, loginAsDemoUser1) => {
    e.preventDefault();
    disabledSubmitButton();

    let data;

    if (loginAsDemoUser1) {
      data = await dispatch(
        sessionActions.login({
          email: 'demo@aa.io',
          password: 'password',
        })
      );
      // } else if (loginAsDemoUser2) {
      //   data = await dispatch(
      //     sessionActions.login({
      //       email: 'jason@aa.io',
      //       password: 'password',
      //     })
      //   );
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
    setModalContent(
      <h2 className='subheading alert-success'>
        Success!!!<span className='blinking-cursor'></span>
      </h2>
    );
    setTimeout(() => setModalContent(null), 500);
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
          <button
            type='submit'
            onClick={(e) => handleSubmit(e, true, false)}
            className='demo-user'
          >
            Demo User 1
          </button>
          {/* <button
            type='submit'
            onClick={(e) => handleSubmit(e, false, true)}
            className='demo-user'
          >
            Demo User 2
          </button> */}
        </div>
        <button
          type='button'
          onClick={() => setModalContent(<SignupFormModal />)}
          className='switch-to-signup'
        >
          Don&apos;t have an account? Sign up
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
