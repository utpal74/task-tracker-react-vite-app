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
                // Store token or session info if needed
                localStorage.setItem('authToken', result.token);
                setIsSignedIn(true);  // Set to true after successful sign-in
            } else {
                console.error('Sign-in failed');
                // Handle error (e.g., show error message to the user)
            }
        } catch (error) {
            console.error('Error signing in:', error);
            // Handle error (e.g., show error message to the user)
        }
    };

    const signUp = async (username, password, confirmPassword) => {
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            // Handle password mismatch (e.g., show error message to the user)
            return;
        }

        try {
            const response = await fetch('http://localhost:8082/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json();
                // Store token or session info if needed
                setIsSignedIn(true);  // Set to true after successful sign-up
            } else {
                console.error('Sign-up failed');
                // Handle error (e.g., show error message to the user)
            }
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error (e.g., show error message to the user)
        }
    };

    const signOut = () => {
        localStorage.removeItem('authToken');
        setIsSignedIn(false);  // Reset the state on sign-out
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
