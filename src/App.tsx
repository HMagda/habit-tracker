import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import LoginPage from './routes/LoginPage/LoginPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/habits' element={<HabitsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
