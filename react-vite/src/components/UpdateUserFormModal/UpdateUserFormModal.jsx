import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { disabledSubmitButton, enabledSubmitButton } from '../../utils/dom';
import { isImageValid } from '../../utils/image';
import Loading from '../Loading';
import * as sessionActions from '../../redux/session';

function UpdateUserFormModal({ user }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [password, setPassword] = useState('');
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
        profileImageUrl: 'Only .png, .jpg, .jpeg, .gif are allowed',
      });
    }

    setImageIsUploading(true);
    const data = await dispatch(
      sessionActions.updateUser({
        first_name: firstName,
        last_name: lastName,
        profile_image_url: profileImageUrl,
        email: user.email,
        username: user.username,
        password,
      })
    );

    if (data?.errors) {
      enabledSubmitButton();
      setImageIsUploading(false);
      return setErrors(data.errors);
    }
    setModalContent(
      <h2 className='subheading alert-success'>Successfully Updated</h2>
    );
    setImageIsUploading(false);
    enabledSubmitButton();
  };

  const inputInvalid = () => {
    return (
      !firstName.length ||
      !lastName.length ||
      password.length < 6 ||
      errors.profileImageUrl
    );
  };

  if (!user) return;

  return (
    <>
      <h2 className='subheading'>Update Profile</h2>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>First Name</label>
        <input
          type='text'
          spellCheck={false}
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
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.last_name && <p className='modal-errors'>{errors.last_name}</p>}
        <label>Email</label>
        <input
          type='text'
          spellCheck={false}
          value={user.email}
          className='disabled'
          disabled
        />
        {errors.email && <p className='modal-errors'>{errors.email}</p>}
        <label>Username</label>
        <input type='text' spellCheck={false} value={user.username} disabled />
        {errors.username && <p className='modal-errors'>{errors.username}</p>}
        <label>Password</label>
        <input
          type='password'
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className='modal-errors'>{errors.password}</p>}
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
      </form>
    </>
  );
}

export default UpdateUserFormModal;
