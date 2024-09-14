
import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'success' or 'failure'
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');  // Clear any previous messages

        try {
            const result = await signIn(username, password);  // Get result from signIn

            setLoading(false);  // Stop loading spinner

            if (result.success) {  // Check if the login was successful
                setStatus('success');
                setMessage('Login successful');
                setTimeout(() => {
                    setMessage('');  // Clear message after 3 seconds
                    navigate('/');   // Navigate to another page
                }, 2000);
            } else {
                setStatus('failure');  // Set failure status
                setMessage(result.message || 'Login failed. Please try again.');  // Show the error message from signIn
            }
        } catch (error) {
            setLoading(false);  // Stop loading spinner in case of error
            setStatus('failure');  // Set failure status
            setMessage('Login failed. Please try again.');  // General failure message
        }
    };

    const handleCloseMessage = () => {
        setMessage('');  // Close the alert message when 'X' is clicked
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
