import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LandingPageModal from '../LandingPageModal';
// import { userIsValid } from '../../utils/user';
// import { useModal } from '../../context/Modal';
import Loading from '../Loading';
import * as sessionActions from '../../redux/session';
import { useNavigate } from 'react-router-dom';
import BarbellCalculatorModal from '../BarbellCalculator';
import {
  FaDumbbell,
  FaUserFriends,
  FaUtensils,
  FaCalculator,
  FaRunning,
  FaLaughBeam,
} from 'react-icons/fa';
import './HomePage.css';

const welcomeMessage = [
  (name) => `Welcome, ${name}!`,
  (name) => `Ready to crush it, ${name}!?`,
  (name) => `Howdy, ${name}!`,
  (name) => `Let's lift, ${name}!`,
  (name) => `Looking great, ${name}!`,
  (name) => `Ready to lift, ${name}!?`,
  (name) => `${name} did NOT die of dysentery!`,
];

const getRandomWelcomeMessage = (name) => {
  const index = Math.floor(Math.random() * welcomeMessage.length);
  return welcomeMessage[index](name);
};

function HomePage() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const user = useSelector(sessionActions.sessionUser);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      if (user?.id) {
        //^ Call the function to get a random welcome message for the user
        setWelcomeMessage(getRandomWelcomeMessage(user.first_name));
      }
    }, 1000);
  }, [user?.id, user?.first_name]);

  const handleFeatureComingSoon = () => {
    alert('Feature coming soon!');
  };

  if (!isLoaded) return <Loading />;

  return (
    <div id='home-page'>
      <div id='main-content'>
        {!user?.id ? (
          <LandingPageModal />
        ) : (
          <div>
            <h2>
              {welcomeMessage}
              <span className='blinking-cursor'></span>
            </h2>
            <div className='navigation-links'>
              <button onClick={() => navigate('/exercises')}>
                <FaDumbbell /> Exercises
              </button>
              <button onClick={() => navigate('/workout-plans')}>
                <FaUserFriends /> Plans
              </button>
              <button onClick={() => navigate('/workouts')}>
                <FaRunning /> Workouts
              </button>
              <button onClick={() => navigate('/failed-lift')}>
                <FaLaughBeam /> Have Fun!
              </button>
              <button onClick={handleFeatureComingSoon}>
                <FaUtensils /> Nutrition
              </button>
              <button onClick={() => setShowCalculatorModal(true)}>
                <FaCalculator /> Bar Calc
              </button>
              {showCalculatorModal && (
                <BarbellCalculatorModal
                  onClose={() => setShowCalculatorModal(false)}
                />
              )}
            </div>
            <div id='site-title'>
              <h1>Hack/Squat</h1>
              <h3>Code Hard, Lift Harder- Where Programming Meets Power</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
