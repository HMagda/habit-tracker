import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    path: string;
    element: React.ReactElement;
    isLoggedIn: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, path, element }) => {
    return isLoggedIn ? <Route path={path} element={element} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;