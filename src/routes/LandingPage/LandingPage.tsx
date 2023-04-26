import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LandingPage.modules.scss';
import Winner from '../../assets/winner.png';
import {baseUrl} from '../../utils';
import Navbar from '../../Components/Navbar/Navbar';
import {useAuthToken} from "../../hooks/useAuthToken";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | undefined>(undefined);
  const getAuthToken = useAuthToken();

  const handleClick = () => {

    const fetchToken = async () => {
      if(token === undefined) {
        const fetchedToken = await getAuthToken();
        setToken(fetchedToken);
        return fetchedToken
      }
    };

    fetchToken().then((ftoken) => {
      fetch(baseUrl + '/habits/today', {
        headers: {
          Authorization: `Bearer ${ftoken}`,
          'Content-Type': 'application/json',
        },
        credentials: "include"
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
    });
  }


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
