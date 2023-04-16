import React from 'react';
import {useNavigate} from 'react-router-dom';
import './LandingPage.modules.scss';
import Winner from '../../assets/winner.png';
// import Navbar from '../../Components/Navbar/Navbar';
import {baseUrl} from '../../utils';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    fetch(baseUrl + '/habits/today', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const habitsForToday = data.habits;
        const today = data.todayIndex;
        setTimeout(() => {
          navigate('/habits', {
            state: {habitsForToday, today},
          });
        }, 100);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <>
      <div className='landing-page'>
        {/* <Navbar /> */}
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
