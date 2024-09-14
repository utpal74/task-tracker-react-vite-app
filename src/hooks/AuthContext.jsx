
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
                setIsSignedIn(true);  // Mark user as signed in
                return { success: true, message: 'Login successful' };
            } else {
                const errorData = await response.json();
                console.error('Sign-in failed:', errorData.message);
                return { success: false, message: errorData.message || 'Sign-in failed' };
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            return { success: false, message: 'Network error or server not responding' };
        }
    };

    const signUp = async (username, password, confirmPassword) => {
        console.log("password=", password)
        console.log("confirm password=", confirmPassword)
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return { success: false, message: 'Passwords do not match' };
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
                setIsSignedIn(true);
                return { success: true, message: 'Registration successful' };
            } else {
                const errorData = await response.json();
                console.error('Sign-up failed:', errorData.message);
                return { success: false, message: errorData.message || 'Sign-up failed' };
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
            return { success: false, message: 'Network error or server not responding' };
        }
    };

    const signOut = () => {
        localStorage.removeItem('authToken');
        setIsSignedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
