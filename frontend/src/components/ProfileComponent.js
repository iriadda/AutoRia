import {useEffect, useState} from "react";
import {userService} from "../services/userService";
import {useNavigate} from "react-router-dom";

const ProfileComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getMe().then(({data}) => setUser(data));
    }, []);

    console.log(user)
    if (!user) return <p>Loading...</p>;

    const handleBuyPremium = async () => {
        await userService.getPremium(user);
        alert("You have premium!");
        window.location.reload();
    };

    return (
        <div>
            <h2>{user.profile.first_name} {user.profile.last_name}</h2>
            <p>Account type: {user.profile.is_premium ? 'Premium' : 'Basic'}</p>
            {!user.profile.is_premium && (
                <button onClick={handleBuyPremium}>Upgrade to Premium</button>
            )}
            <p>{user.is_manager | user.is_staff && (
                <button onClick={() => navigate('/admin')}>admin panel</button>
            )}</p>
            <p>My vehicles:</p>
            <ul>
                {user.profile.cars && user.profile.cars.length > 0 ? (
                    user.profile.cars.map((car) => (
                        <li key={car.id}>
                            <p>
                                {car.car_model_detail.brand.name} {car.car_model_detail.model}
                            </p>
                            <button onClick={() => navigate('/vehicle/edit/' + car.id)}>Edit</button>
                            <button
                                onClick={() => navigate(`/analytics/${car.id}`)}
                                disabled={!user.profile.is_premium}
                                title={user.profile.is_premium ? "" : "Only for Premium users"}
                            >
                                analytics
                            </button>
                        </li>
                    ))
                ) : (
                    <li>You have no vehicles yet.</li>
                )}
            </ul>
        </div>
    );
};

export default ProfileComponent;