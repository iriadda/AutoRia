import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {vehicleService} from "../services/vehicleService";

const EditVehicleComponent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue} = useForm();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        vehicleService.getById(id)
            .then(({data}) => {
                const fields = [
                    'car_model', 'year', 'mileage', 'transmission',
                    'fuel_type', 'engine_capacity', 'description',
                    'price_input', 'currency'
                ];
                fields.forEach(field => setValue(field, data[field]));
                setLoading(false);
            })
    }, [id, setValue]);

    const onSubmit = (data) => {
        const payload = {
            ...data,
            year: parseInt(data.year),
            mileage: parseInt(data.mileage),
            engine_capacity: parseFloat(data.engine_capacity),
            price_input: parseFloat(data.price_input)
        };

        vehicleService.update(id, payload)
            .then(({data}) => {
                alert('Ad updated successfully');
                navigate('/');
            })
            .catch(error => {
                const resData = error?.response?.data;
                if (error.response?.status === 400 && resData?.msg) {
                    alert(resData.msg);
                }
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Model ID:</label>
            <input type="text" {...register('car_model')} disabled/>

            <label>Year:</label>
            <input type="number" {...register('year')} min={1990} max={2025} required/>

            <label>Mileage:</label>
            <input type="number" {...register('mileage')} required/>

            <label>Transmission:</label>
            <select {...register('transmission')} required>
                <option value="manual">manual</option>
                <option value="automatic">automatic</option>
            </select>

            <label>Fuel Type:</label>
            <select {...register('fuel_type')} required>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
            </select>

            <label>Engine Capacity (л):</label>
            <input type="number" step="0.1" {...register('engine_capacity')} min={0.6} max={10.0} required/>

            <label>Description:</label>
            <textarea {...register('description')} maxLength={2000} required/>

            <label>Price:</label>
            <input type="number" {...register('price_input')} required/>

            <label>Currency:</label>
            <select {...register('currency')} required>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
            </select>

            <button type="submit">Оновити</button>
        </form>
    );
};

export default EditVehicleComponent;