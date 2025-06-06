import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {userService} from "../services/userService";


const Menu = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    useEffect(() => {
        userService.getMe()
            .then(({data}) => setUser(data))
            .catch(console.error);
    }, []);


    const handleLogout=async () =>{
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/vehicles')
        window.location.reload();
    }

    return (
        <>
            {!user ? (
                <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/vehicles')}>Vehicles</button>
                </>
            ) : (
                <>
                    <button onClick={() => navigate('/vehicles')}>Vehicles</button>
                    <button onClick={() => navigate('/vehicle/add')}>Sell Vehicles</button>
                    <button onClick={() => navigate('/profile')}>Personal Account</button>
                    <button onClick={() => navigate('/chat/')}>My chats</button>
                    <button onClick={handleLogout}>Log out</button>
                </>
            )}
        </>
    );
};
export {Menu};