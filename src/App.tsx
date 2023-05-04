import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import React, { useState } from 'react';
import TokenContext from './TokenContext';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';
import LoginSuccessful from './routes/LoginSuccessful/LoginSuccessful';

const App: React.FC = () => {

    const [token, setToken] = useState<string | undefined>(undefined);

  return (
    <>
      <Router>
      <TokenContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login-successful' element={<LoginSuccessful />} />
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
