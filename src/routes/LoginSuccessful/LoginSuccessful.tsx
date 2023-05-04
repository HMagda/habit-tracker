import React, { useContext } from 'react'
import TokenContext from '../../TokenContext';
import { useAuthToken } from '../../hooks/useAuthToken';

const LoginSuccessful = () => {
    const getAuthToken = useAuthToken();

    const { token, setToken } = useContext(TokenContext);

    const handleClick = async () => {

        if (token === undefined) {
            const fetchedToken = await getAuthToken();
            console.log('login-successful page token: ', fetchedToken)
            setToken(fetchedToken);
          }

          window.location.href = '/habits';

      
        // const fetchToken = async () => {

        // };
    
        // fetchToken().then((ftoken) => {
        //   console.log('fetchToken ftoken w LandingPage.tsx: ', ftoken);
    
        //   fetch(baseUrl + '/habits/today', {
        //     headers: {
        //       Authorization: `Bearer ${ftoken}`,
        //       'Content-Type': 'application/json',
        //     },
        //     credentials: 'include',
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       const habitsForToday = data.habits;
        //       const today = data.todayIndex;
        //       setTimeout(() => {
        //         navigate('/habits', {
        //           state: {habitsForToday, today},
        //         });
        //       }, 100);
        //     })
        //     .catch((error) => {
        //       console.error('There was a problem with the fetch operation:', error);
        //     });
        // });
    };

  return (
    <div>LoginSuccessful

        <button onClick={handleClick}>Go to my habits</button>
    </div>
  )
  
}

export default LoginSuccessful