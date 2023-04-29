import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LandingPage from './routes/LandingPage/LandingPage';
import HabitsPage from './routes/HabitsPage/HabitsPage';
require('dotenv').config();
import {} from 'dotenv/config'
import PrivateRoute from "./PrivateRoute";

const App: React.FC = () => {



    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<LandingPage/>}/>
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
