import {useState} from "react";
import {authService} from "../services/authService";
import {useNavigate} from "react-router-dom";

export const ResetPasswordRequest = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await authService.recoveryRequest(email);
        setMessage('Password recovery link sent to your email.');

    };

    return (
        <div>
            <h2>Password recovery</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button>send</button>
            </form>
            <p>{message}</p>
            <button onClick={() => navigate('/login')}>login</button>
        </div>
    );
}
