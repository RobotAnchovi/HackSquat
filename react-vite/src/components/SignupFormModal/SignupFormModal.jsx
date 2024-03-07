import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { disabledSubmitButton, enabledSubmitButton } from '../../utils/dom';
import { isImageValid } from '../../utils/image';
import Loading from '../Loading';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../redux/session';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [imageIsUploading, setImageIsUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const { setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    disabledSubmitButton();

    if (profileImageUrl && !isImageValid(profileImageUrl.name)) {
      enabledSubmitButton();
      return setErrors({
        profileImageUrl: 'Please use .png, .jpg, .jpeg, .gif only.',
      });
    }

    if (password !== confirmPassword) {
      enabledSubmitButton();
      return setErrors({ confirmPassword: 'Passwords do not match' });
    }

    setImageIsUploading(true);

    const data = await dispatch(
      sessionActions.signup({
        first_name: firstName,
        last_name: lastName,
        profile_image_url: profileImageUrl,
        email,
        username,
        password,
      })
    );

    if (data) {
      enabledSubmitButton();
      setImageIsUploading(false);
      return setErrors(data);
    }
    setModalContent(
      <h2 className='subheading alert-success'>
        Success!!!<span className='blinking-cursor'></span>
      </h2>
    );
    setTimeout(() => setModalContent(null), 500);
    setImageIsUploading(false);
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return (
      !firstName.length ||
      !lastName.length ||
      !email.length ||
      username.length < 4 ||
      password.length < 6 ||
      errors.profileImageUrl
    );
  };

  return (
    <>
      <h2 className='subheading'>Sign Up</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>First Name</label>
        <input
          type='text'
          spellCheck={false}
          placeholder='Required'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.first_name && (
          <p className='modal-errors'>{errors.first_name}</p>
        )}
        <label>Last Name</label>
        <input
          type='text'
          spellCheck={false}
          placeholder='Required'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.last_name && <p className='modal-errors'>{errors.last_name}</p>}
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
        <label>Username</label>
        <input
          type='text'
          spellCheck={false}
          placeholder='At least 4 characters'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className='modal-errors'>{errors.username}</p>}
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
        <label>Confirm Password</label>
        <input
          type='password'
          spellCheck={false}
          placeholder='At least 6 characters'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && (
          <p className='modal-errors'>{errors.confirmPassword}</p>
        )}
        <label>Profile Image</label>
        <input
          type='file'
          accept='image/*'
          onChange={(e) => {
            const size = e.target.files[0].size;
            if (size > 10 ** 6)
              return setErrors({
                profileImageUrl: 'File size must not be larger than 10MB.',
              });
            setProfileImageUrl(e.target.files[0]);
            setErrors({ profileImageUrl: '' });
          }}
        />
        {errors.profileImageUrl && (
          <p className='modal-errors'>{errors.profileImageUrl}</p>
        )}
        {imageIsUploading && <Loading />}
        <button
          type='submit'
          className={`btn-submit ${inputInvalid() ? 'disabled' : ''}`}
          disabled={inputInvalid()}
        >
          Submit
        </button>
        <button
          type='button'
          className='switch-to-login'
          onClick={() => setModalContent(<LoginFormModal />)}
        >
          Already have an account? Log in
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
