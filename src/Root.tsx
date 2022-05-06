
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import App from './App';

type Props = {}

const Root = (props: Props) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) return <div className='h-screen w-screen flex items-center justify-center'>Loading...</div>;
    return isAuthenticated ? <App /> : (
        <div className='flex h-screen w-screen justify-center items-center'>
            <button
                className='w-32 h-12 bg-blue-500 text-white font-bold rounded-full shadow-lg p-2'
                onClick={() => loginWithRedirect({})}
            >
                Login
            </button>
        </div>
    );

}

export default Root