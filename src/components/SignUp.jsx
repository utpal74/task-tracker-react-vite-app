
import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        console.log("c pwd", confirmPassword)
        // Check if passwords match before proceeding
        if (password !== confirmPassword) {
            setLoading(false);
            setStatus('failure');
            setMessage('Passwords do not match!');
            return;
        }

        try {
            const result = await signUp(email, password, confirmPassword);

            setLoading(false);

            if (result.success) {
                setStatus('success');
                setMessage('Registration successful');
                setTimeout(() => {
                    setMessage('');
                    navigate('/signin');
                }, 2000);
            } else {
                setStatus('failure');
                setMessage(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setStatus('failure');
            setMessage('Registration failed. Please try again.');
        }
    };

    const handleCloseMessage = () => {
        setMessage('');
    };

    return (
        <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email</label>
                    <input
                        className="username-field"
                        placeholder="Enter email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        className="pwd-field"
                        placeholder="Enter password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        className="pwd-field"
                        placeholder="Re-enter password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Existing user?{" "}
                <Link to="/signin">Skip to Login</Link>
            </p>

            {loading && (
                <div className="spinner-overlay">
                    <div className="spinner"></div>
                </div>
            )}

            {message && (
                <div className={`alert ${status === 'success' ? 'alert-success' : 'alert-failure'}`}>
                    <span>{message}</span>
                    <button className="close-btn" onClick={handleCloseMessage}>
                        &times; {/* Close ("X") icon */}
                    </button>
                </div>
            )}
        </div>
    );
}
