import { useState } from 'react';
import './LandingPageModal.css';

const LandingPageModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);

  return (
    <div
      className={
        isOpen ? 'landing-page-modal visible' : 'landing-page-modal hidden'
      }
    >
      <i
        title='Close'
        className='fa-solid fa-circle-xmark close-landing-page-modal'
        onClick={onClose}
      ></i>
      <div className='landing-page-to-hacksquat'>
        <i className='fa-solid fa-people-roof'></i>
        <h1>Welcome to Hack/Squat</h1>
        <i className='fa-solid fa-people-roof'></i>
      </div>
      <p>For Developers who Deadlift</p>
      <br />
      <p>
        HackSquat is designed to empower your fitness journey through
        personalized workout planning, scheduling, and comprehensive progress
        analytics. Our intuitive platform simplifies the creation of custom
        workout plans with a user-friendly drag-and-drop interface (Coming
        soon), making it easy to organize and adapt your fitness routine. Dive
        deep into your performance with our advanced analytics, visualizing your
        progress and fine-tuning your goals with data-driven insights. Whether
        you&apos;re aiming to hit new strength milestones, tracking your
        nutritional targets, or analyzing your lift progression, HackSquat is
        here to elevate your training. Join us and transform the way you
        workout, one squat at a time.
      </p>
      <br />
      <p>
        HackSquat was created by a lifter, for lifters!
        <span className='blinking-cursor'></span>
      </p>
    </div>
  );
};

export default LandingPageModal;
