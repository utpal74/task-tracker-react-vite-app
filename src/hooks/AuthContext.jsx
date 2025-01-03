
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const BASE_URL = import.meta.env.VITE_API_URL;

export default function AuthProvider({ children }) {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            validateToken(authToken);
        }
    }, []);

    const validateToken = async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('authToken', result.new_token);
                setIsSignedIn(true);
            } else {
                localStorage.removeItem('authToken');
                setIsSignedIn(false);
            }
        } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('authToken');
            setIsSignedIn(false);
        }
    };

    const signIn = async (username, password) => {
        try {
            const response = await fetch(`${BASE_URL}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('authToken', result.token);
                setIsSignedIn(true);
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
        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return { success: false, message: 'Passwords do not match' };
        }

        try {
            const response = await fetch(`${BASE_URL}/signup`, {
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

    const signOut = async () => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            setIsSignedIn(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/signout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken
                }
            });

            if (response.ok) {
                localStorage.removeItem('authToken');
                setIsSignedIn(false);
            } else {
                const errorData = await response.json();
                console.error('Sign-out failed:', errorData.message || 'Sign-out failed');
            }
        } catch (error) {
            console.error('Error during sign-out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isSignedIn, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}
