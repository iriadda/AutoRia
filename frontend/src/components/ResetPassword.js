import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from "../services/authService";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.recoveryToken(token, password);
            setMessage('Password changed');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setMessage('Помилка: ' + (err.response?.data?.detail || 'try again.'));
        }
    };

    return (
        <div>
            <h2>New password</h2>
            <form onSubmit={handlePasswordSubmit}>
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Change password</button>
            </form>
            <p>{message}</p>
            <button onClick={() => navigate('/login')}>To login</button>
        </div>
    );
};

export default ResetPassword;
