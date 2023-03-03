import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import LoginPage from './routes/LoginPage/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
