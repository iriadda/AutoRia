import {useEffect, useState} from "react";
import {vehicleService} from "../services/vehicleService";
import {useNavigate} from "react-router-dom";
import {userService} from "../services/userService";

const ManagerModerationComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        userService.getAll().then(({data}) => setUsers(data.data))

    }, []);

const suspiciousUsers = users.filter(
        (user) => user.profile?.vehicle_creation_attempts > 3
    );
    // if (!loading) return <div>Loading...</div>;


    return (
        <div>
            <h2>suspicious users</h2>
            {suspiciousUsers.length === 0 ? (
                <p>No users to check.</p>
            ) : (
                <ul>
                    {suspiciousUsers.map((user) => <li key={user.id}>{user.email}</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ManagerModerationComponent;