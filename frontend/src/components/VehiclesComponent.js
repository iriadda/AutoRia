import {useEffect, useState} from "react";
import {vehicleService} from "../services/vehicleService";
import VehicleComponent from "./VehicleComponent";
import VehicleFiltersComponent from "./VehicleFiltersComponent";

export const VehiclesComponent = () => {
    const [vehicles, setVehicles] = useState([])

    const fetchVehicles = (params = {}) => {
        vehicleService.getFiltered({is_active: true, ...params})
            .then(({data}) => setVehicles(data.data));
    };

    useEffect(() => {
        fetchVehicles();
    }, []);
    return (
        <div>
            <VehicleFiltersComponent onFilter={fetchVehicles}/>

            {vehicles.map(vehicle => <VehicleComponent key={vehicle.id} vehicle={vehicle}/>)}
        </div>
    )
}
