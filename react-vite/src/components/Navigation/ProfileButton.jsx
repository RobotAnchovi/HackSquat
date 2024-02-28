import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../redux/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { setModalContent } = useModal();
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
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

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setModalContent(
      <h2 className='subheading alert-success'>Successfully Logged Out</h2>
    );
    closeMenu();
  };

  return (
    <>
      <div>
        <button
          title='Cilck here to login or sign up'
          id='user-menu'
          onClick={toggleMenu}
        >
          <FaUserCircle />
        </button>
      </div>
      {showMenu && (
        <div id='user-buttons' ref={ulRef}>
          {user ? (
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          ) : (
            <>
              <div>
                <OpenModalButton
                  buttonText='Log In'
                  onButtonClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div>
                <OpenModalButton
                  buttonText='Sign Up'
                  onButtonClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ProfileButton;
