import { NavLink } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { userIsValid } from '../../utils/user';
import { getAvatarUrl } from '../../utils/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProfileButton from './ProfileButton';
import UserProfile from '../UserProfile';
import Loading from '../Loading/Loading';
import * as sessionActions from '../../redux/session';
import './Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const { closeModal, setModalContent } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(sessionActions.sessionUser);

  const showUserProfile = () => {
    setModalContent(
      <UserProfile
        user={user}
        setModalContent={setModalContent}
        closeModal={closeModal}
      />
    );
  };

  useEffect(() => {
    const loadUser = async () => {
      await dispatch(sessionActions.restoreSession());
      setIsLoaded(true);
    };
    loadUser();
  }, [dispatch]);

  if (!isLoaded) return <Loading />;

  return (
    <div id='navbar'>
      <ul>
        <li>
          <NavLink to='/'>
            <img src='/icons8-weightlifting-100.png' alt='logo' />
          </NavLink>
        </li>
        <li id='profile-buttons'>
          <ProfileButton user={userIsValid(user) ? user : null} />
        </li>
        <div onClick={showUserProfile} id='user-avatar' title='User Profile'>
          {userIsValid(user) && (
            <img src={getAvatarUrl(user.profile_image_url)} alt='avatar' />
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;
