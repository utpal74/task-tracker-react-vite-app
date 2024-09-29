
import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const result = await signIn(username, password);

            setLoading(false);

            if (result.success) {
                setStatus('success');
                setMessage('Login successful');
                setTimeout(() => {
                    setMessage('');
                    navigate('/');
                }, 1000);
            } else {
                setStatus('failure');
                setMessage(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            setStatus('failure');
            setMessage('Login failed. Please try again.');
        }
    };

    const handleCloseMessage = () => {
        setMessage('');
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        className="username-field"
                        placeholder="Enter email"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Login</button>
            </form>
            <p>
                New to Track My Task?{" "}
                <Link to="/signup">Register here</Link>
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
