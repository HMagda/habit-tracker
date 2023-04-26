import {GetTokenSilentlyOptions, useAuth0} from "@auth0/auth0-react";

export const useAuthToken = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getAccessTokenWithAudience = async () => {
        try {
            const options: GetTokenSilentlyOptions = {
                authorizationParams: {
                    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
                },
            };

            return await getAccessTokenSilently(options);
        } catch (error) {
            console.error('Error getting access token:', error);
        }
    };

    const getAuthToken = async () => {
        try {
            return await getAccessTokenWithAudience();
        } catch (e) {
            console.error(e);
        }
    };

    return getAuthToken;
};