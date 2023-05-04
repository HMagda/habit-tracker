import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LandingPage.modules.scss';
import Winner from '../../assets/winner.png';
import {baseUrl} from '../../utils';
import Navbar from '../../Components/Navbar/Navbar';
import {useAuthToken} from '../../hooks/useAuthToken';
import {GetTokenSilentlyOptions, useAuth0} from '@auth0/auth0-react';
import TokenContext from '../../TokenContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  // const [token, setToken] = useState<string | undefined>(undefined);
  const { token, setToken } = useContext(TokenContext);

  const getAuthToken = useAuthToken();
  const {isAuthenticated, loginWithRedirect, getAccessTokenSilently} =
    useAuth0();

  const getAccessTokenWithAudience = async () => {
    try {
      const options: GetTokenSilentlyOptions = {
        authorizationParams: {
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        },
      };

      return await getAccessTokenSilently(options);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const handleClick = () => {

    console.log('get started clicked');
    window.location.href = '/habits';
    // if (isAuthenticated) {
    //   fetchAll();
    // } else {
    //   loginWithRedirect()
    //     .then(() => {
    //       console.log('Logged in!');

    //       const token = getAccessTokenWithAudience();
    //       console.log('token: ', token);
    //       //todo - put this token to a global state to be used in other components (in all fetch requests)
    //     })

    //     .then(() => {
    //       fetchAll();
    //     });
    // }
  };

  // const fetchAll = () => {
  //   const fetchToken = async () => {
  //     if (token === undefined) {
  //       const fetchedToken = await getAuthToken();
  //       setToken(fetchedToken);
  //       return fetchedToken;
  //     }
  //   };

  //   fetchToken().then((ftoken) => {
  //     console.log('fetchToken ftoken w LandingPage.tsx: ', ftoken);

  //     fetch(baseUrl + '/habits/today', {
  //       headers: {
  //         Authorization: `Bearer ${ftoken}`,
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const habitsForToday = data.habits;
  //         const today = data.todayIndex;
  //         setTimeout(() => {
  //           navigate('/habits', {
  //             state: {habitsForToday, today},
  //           });
  //         }, 100);
  //       })
  //       .catch((error) => {
  //         console.error('There was a problem with the fetch operation:', error);
  //       });
  //   });
  // };

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
