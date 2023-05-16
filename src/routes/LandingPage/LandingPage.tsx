import React from 'react';
import './LandingPage.modules.scss';
import Winner from '../../assets/winner.png';
import Navbar from '../../Components/Navbar/Navbar';

const LandingPage: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/habits';
  };

  return (
    <>
      <div className='landing-page'>
        <Navbar />
        <h1 className='app-name'>Habit Tracker</h1>
        <button className='cta-button' onClick={handleClick}>
          Get Started
        </button>
        <p className='app-description'>
          Develop new habits by tracking your progress and staying cosistent.
        </p>
        <div className='img-container'>
          <img src={Winner} alt='Winner' className='winner' />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
