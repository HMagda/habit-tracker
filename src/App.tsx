import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
                <Navbar/>
                <Routes>
                    <Route path='/' element={<LandingPage/>}/>
                    <ProtectedRoute path="/habits" element={<HabitsPage/>} isLoggedIn={isLoggedIn} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
