import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../redux/session';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../UserProfile';
import { getAvatarUrl } from '../../utils/image';
import BarbellCalculatorModal from '../BarbellCalculator';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { modalContent, setModalContent } = useModal();
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleImageError = (e) => {
    e.target.src = '/icons8-weightlifting-100.png';
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (modalContent) {
      closeMenu();
    }
  }, [modalContent]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setModalContent(
      <h2 className='subheading alert-success'>
        Successfully Logged Out<span className='blinking-cursor'></span>
      </h2>
    );
    closeMenu();
    navigate('/');
  };

  const userProfile = () => {
    setModalContent(
      <UserProfile
        user={user}
        setModalContent={setModalContent}
        closeModal={closeMenu}
      />
    );
  };

  return (
    <div id='user-menu-container'>
      <button id='user-menu' onClick={toggleMenu}>
        {user ? (
          <img
            src={getAvatarUrl(user.profile_image_url)}
            alt='avatar'
            onError={handleImageError}
            className='user-avatar'
          />
        ) : (
          <FaUserCircle size={30} />
        )}
      </button>
      {showMenu && (
        <ul className='dropdown-menu'>
          {user ? (
            <>
              <li>
                <button onClick={userProfile}>Profile</button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/exercises');
                    closeMenu();
                  }}
                >
                  Exercises
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/workout-plans');
                    closeMenu();
                  }}
                >
                  Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/workouts');
                    closeMenu();
                  }}
                >
                  Workouts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate('/failed-lift');
                    closeMenu();
                  }}
                >
                  Have Fun!
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMenu(false);
                    alert('Feature is coming soon!');
                  }}
                >
                  Progress
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowMenu(false);
                    alert('Feature is coming soon!');
                  }}
                >
                  Nutrition
                </button>
              </li>
              <li>
                <button onClick={() => setShowCalculatorModal(true)}>
                  Bar Calc
                </button>
                {showCalculatorModal && (
                  <BarbellCalculatorModal
                    onClose={() => setShowCalculatorModal(false)}
                  />
                )}
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li className='login'>
                <OpenModalButton
                  buttonText='Log In'
                  onButtonClick={() => {
                    closeMenu();
                    setModalContent(<LoginFormModal />);
                  }}
                />
              </li>
              <li className='sign-up'>
                <OpenModalButton
                  buttonText='Sign Up'
                  onButtonClick={() => {
                    closeMenu();
                    setModalContent(<SignupFormModal />);
                  }}
                />
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
