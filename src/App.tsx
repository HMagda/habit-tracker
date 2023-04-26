import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
import Navbar from './Components/Navbar/Navbar';
import ProtectedRoute from "./ProtectedRoute";
import {baseUrl} from "./utils";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch(baseUrl + '/is-authenticated')
            .then(response => response.json())
            .then(data => setIsLoggedIn(data.authenticated));
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage/>}/>
                    <Route path='/habits' element={isLoggedIn ? <HabitsPage/> : <Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
