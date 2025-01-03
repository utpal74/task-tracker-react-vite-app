
import { Link, useNavigate } from 'react-router-dom';
// import logo from "../assets/logo.png";
import logo_ai from "../assets/logo-ai.webp";
import { useAuth } from '../hooks/AuthContext.jsx';
import React, { useState } from 'react';

export default function Header({ handleToggleTask }) {
    const { isSignedIn, signOut } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogout = async () => {
        setLoading(true);
        setMessage('');

        try {
            const result = await signOut();
            if (result.success) {
                setMessage('Logged out successfully');
                setTimeout(() => {
                    setLoading(false);
                    setMessage('');
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            setMessage('Logout failed. Please try again.');
        }
    };


    return (
        <header>
            <div className="head-container">
                <div className="logo-section">
                    <img src={logo_ai} alt="TRACK MY TASK" />
                </div>
                <div className="header-btn-section">
                    {isSignedIn ? (
                        <button onClick={handleLogout} disabled={loading}
                            className="header-btn"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="header-btn"
                            onClick={() => navigate('/signin')}
                        >
                            Login
                        </button>
                    )}

                    {loading && (
                        <div className="spinner-overlay">
                            <div className="spinner"></div>
                        </div>
                    )}

                    {message && (
                        <div className="alert alert-success">
                            <span>{message}</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
