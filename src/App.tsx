import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';

const App: React.FC = () => {

  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/habits' element={<HabitsPage />} />
            </Route>
          </Routes>
      </Router>
    </>
  );
};

export default App;
