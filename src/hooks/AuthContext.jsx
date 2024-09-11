import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signIn = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8082/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json();
                // Assuming you get a token or sign-in status from the API
                setIsSignedIn(true);  // Set to true after successful sign-in
            } else {
                console.error('Sign-in failed');
            }
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const signOut = () => {
        setIsSignedIn(false);  // Reset the state on sign-out
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
