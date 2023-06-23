import React, { useState } from 'react';
import Tour from 'reactour';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';
import { steps } from './steps'; 

const App: React.FC = () => {
  const [isTourOpen, setIsTourOpen] = useState(false);

  const closeTour = () => {
    setIsTourOpen(false);
  }

  const openTour = () => {
    setIsTourOpen(true);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route element={<PrivateRoute />}>
            <Route path='/habits' element={<HabitsPage  openTour={openTour} />} />
          </Route>
        </Routes>
      </Router>
      <Tour 
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={closeTour}
      />
    </>
  );
};

export default App;
