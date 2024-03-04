import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LandingPageModal from '../LandingPageModal';
// import { userIsValid } from '../../utils/user';
// import { useModal } from '../../context/Modal';
import Loading from '../Loading';
// import UserProfile from '../UserProfile';
import * as sessionActions from '../../redux/session';

const welcomeMessage = [
  (name) => `Welcome, ${name}!`,
  (name) => `Ready to crush it, ${name}!?`,
  (name) => `Howdy, ${name}!`,
  (name) => `Let's lift, ${name}!`,
  (name) => `Looking great, ${name}!`,
  (name) => `Ready to lift, ${name}!?`,
];

const getRandomWelcomeMessage = (name) => {
  const index = Math.floor(Math.random() * welcomeMessage.length);
  return welcomeMessage[index](name);
};

function HomePage() {
  // const dispatch = useDispatch();
  // const { setModalContent, closeModal } = useModal();
  const [isLoaded, setIsLoaded] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const user = useSelector(sessionActions.sessionUser);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      if (user?.id) {
        // Call the function to get a random welcome message for the user
        setWelcomeMessage(getRandomWelcomeMessage(user.first_name));
      }
    }, 1000);
  }, [user?.id, user?.first_name]);

  if (!isLoaded) return <Loading />;

  return (
    <div id='home-page'>
      <div id='main-content'>
        {!user?.id ? (
          <LandingPageModal />
        ) : (
          <h2>
            {welcomeMessage}
            <span className='blinking-cursor'></span>
          </h2>
        )}
      </div>
    </div>
  );
}

export default HomePage;
