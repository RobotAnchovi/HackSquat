import { Link } from 'react-router-dom';

const FailedLift = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>
        Not sure if this is what you were looking for...
        <span className='blinking-cursor'></span>
      </h1>
      <p>But don&apos;t worry, we&apos;ve got something for you!</p>
      <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowfullscreen
        style={{
          boxShadow: '0 0 10px 0 #33c633',
          borderRadius: '10px',
        }}
      ></iframe>
      <br />
      <Link
        to='/'
        style={{
          marginTop: '20px',
          display: 'inline-block',
          textDecoration: 'none',
          // color: 'white',
          backgroundColor: '#262626',
          padding: '10px 20px',
          fontWeight: 'bold',
          borderRadius: '10px',
          boxShadow: '0 0 10px 0 #33c633',
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default FailedLift;
