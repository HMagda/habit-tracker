import { useAuth0 } from "@auth0/auth0-react";

export const useAuthToken = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getAuthToken = async () => {
        try {
            const token = await getAccessTokenSilently();
            return token;
        } catch (e) {
            console.error(e);
        }
    };

    return getAuthToken;
};