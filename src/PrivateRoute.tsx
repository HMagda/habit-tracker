import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect]);

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return null;  // Or some loading placeholder
    }
};

export default PrivateRoute;