import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
    const { signIn } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signIn(username, password); // Call signIn with await
            // TODO: Handle success (e.g., redirect or show success message)
            alert('Login successful!');
            navigate('/');
        } catch (error) {
            // Handle error (e.g., show error message)
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
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
        </div>
    );
}
