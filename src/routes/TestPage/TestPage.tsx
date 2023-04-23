import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import {baseUrl} from "../../utils";

const TestPage = () => {

    const { getAccessTokenSilently } = useAuth0();

    // Fetch the JWT token
    const token = getAccessTokenSilently();

    fetch(baseUrl + `/restricted`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('restricted endpoint accessed: ', res);
            return res.json();
        })
        .then((response) => {
            console.log('response: ', response);
        })
        .catch((error) => {
            console.error('Error adding new habit: ', error);
        });

    return (
        <div>TestPage</div>
    )
}

export default TestPage