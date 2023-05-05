import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import TokenContext from './TokenContext';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {
  const [token, setToken] = useState<string | undefined>(
    () => localStorage.getItem('token') || undefined
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <>
      <Router>
        <TokenContext.Provider value={{token, setToken}}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/habits' element={<HabitsPage />} />
              {/* Other Routes you want to protect */}
            </Route>
          </Routes>
        </TokenContext.Provider>
      </Router>
    </>
  );
};

export default App;
