import {useEffect, useState} from "react";
import {vehicleService} from "../services/vehicleService";
import {useNavigate} from "react-router-dom";

const ManagerModerationComponent = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        vehicleService.getFiltered({
            is_active: false,
            is_checked: false,
        }).then(({data}) => setVehicles(data.data));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this ad?")) return;

        vehicleService.remove(id)
            .then(() => {
                setVehicles(prev => prev.filter(vehicle => vehicle.id !== id));
            })
    };

    const handleDetails = (id) => {
        navigate(`/vehicles/${id}`);
    };

    if (!loading) return <div>Loading...</div>;


    return (
        <div>
            <h2>Ads that require moderation</h2>
            {vehicles.length === 0 ? (
                <p>No ads to check.</p>
            ) : (
                <ul>
                    {vehicles.map((v) => (
                        <li key={v.id}>
                            <strong>{v.car_model_detail.brand.name} {v.car_model_detail.model}</strong> — {v.year}, {v.price_input} {v.currency}
                             <button onClick={() => handleDetails(v.id)}>Detail</button>
                            <button onClick={() => handleDelete(v.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ManagerModerationComponent;