import { useState } from 'react';
import { useAuth } from '../hooks/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            await signUp(email, password, confirmPassword);
            alert("Registered! Proceed to login.")
            navigate('/signin');
        } catch (error) {
            alert('Sign up failed. Please try again.');
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <div>
                    <label>Confirm Password</label>
                    <input
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
        </div>
    );
}
