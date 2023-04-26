import React from 'react';
import {Navigate, Route} from 'react-router-dom';

interface ProtectedRouteProps {
    path: string;
    element: React.ReactElement;
    isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, path, element }) => {
    return (
        <Route
            path={path}
            element={isLoggedIn ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;