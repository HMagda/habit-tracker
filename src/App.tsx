import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import LoginPage from './routes/LoginPage/LoginPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import PrivateRoute from './PrivateRoute';
import Navbar from './Components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          

<Route element={<PrivateRoute/>}>
            <Route path="/habits" element={<HabitsPage/>} />
              {/* Other Routes you want to protect */}
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
