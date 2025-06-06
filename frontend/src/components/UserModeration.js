import {userService} from "../services/userService";
import {useEffect, useState} from "react";


const UserModeration = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        userService.getAll().then(({data}) => setUsers(data.data));
    }, []);

    useEffect(() => {
        userService.getMe().then(({data}) => setCurrentUser(data))
    }, [])

    const handleToggleStatus = async (user) => {
        console.log(user.id)
        if (user.is_active) {
            await userService.blockUser(user.id);
        } else {
            await userService.unblockUser(user.id);
        }

        setUsers(prev =>
            prev.map(u =>
                u.id === user.id ? {...u, is_active: !u.is_active} : u
            )
        );
    };

    const handleMakeManager = async (user) => {
        if (!user.is_manager) {
            await userService.makeManager(user.id);
        }
        setUsers(prev =>
            prev.map(u =>
                u.id === user.id ? {...u, is_manager: true} : u
            )
        );
    };
    return (
        <div>
            <h2>Manage Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.email} — {user.is_active ? 'Active' : 'Blocked'}
                        <button onClick={() => handleToggleStatus(user)}>
                            {user.is_active ? 'Block' : 'Unblock'}
                        </button>
                        {!user.is_manager && !user.is_staff && (
                            <button onClick={() => handleMakeManager(user)}>Make Manager</button>
                        )}

                    </li>
                ))}
            </ul>
        </div>
    );
};
export default UserModeration;