import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {vehicleService} from "../services/vehicleService";
import {userService} from "../services/userService";
import useAuth from "../hooks/useAuth";

const VehiclesIDComponent = () => {
    const {id} = useParams();
    const [vehicle, setVehicle] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        vehicleService.getById(id)
            .then(({data}) => setVehicle(data));

    }, [id])

    const handleMessageSeller = () => {
        navigate(`/chat/${vehicle.user_id}`);

    }

    if (!vehicle) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Ad #{vehicle.id}</h2>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                {vehicle.vehicle_photos.map(photoObj => (
                    <img
                        key={photoObj.id}
                        src={photoObj.photo}
                        alt="vehicle"
                        width={150}
                        height="auto"

                    />
                ))}
            </div>
            <p><strong>Model:</strong> {vehicle.car_model_detail?.model}</p>
            <p><strong>Year:</strong> {vehicle.year}</p>
            <p><strong>mileage:</strong> {vehicle.mileage} км</p>
            <p><strong>fuel type:</strong> {vehicle.fuel_type}</p>
            <p><strong>description:</strong> {vehicle.description}</p>
            <p><strong>Price:</strong> {vehicle.price_input} {vehicle.currency}</p>
            <button onClick={handleMessageSeller} disabled={!isAuthenticated}>Написати продавцю</button>
        </div>
    );
};
export default VehiclesIDComponent;