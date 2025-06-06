import {useEffect, useState} from "react";
import {brandService} from "../services/brandService";
import {vehicleService} from "../services/vehicleService";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import photoService from "../services/photoService";


const AddVehicleComponent = () => {
    const REGIONS = [
        {value: 'vinnytsia', label: 'Вінницька'},
        {value: 'volyn', label: 'Волинська'},
        {value: 'dnipropetrovsk', label: 'Дніпропетровська'},
        {value: 'donetsk', label: 'Донецька'},
        {value: 'zhytomyr', label: 'Житомирська'},
        {value: 'zakarpattia', label: 'Закарпатська'},
        {value: 'zaporizhzhia', label: 'Запорізька'},
        {value: 'ivano-frankivsk', label: 'Івано-Франківська'},
        {value: 'kyivska', label: 'Київська'},
        {value: 'kyiv', label: 'Київ'},
        {value: 'kirovohrad', label: 'Кіровоградська'},
        {value: 'luhansk', label: 'Луганська'},
        {value: 'lviv', label: 'Львівська'},
        {value: 'mykolaiv', label: 'Миколаївська'},
        {value: 'odesa', label: 'Одеська'},
        {value: 'poltava', label: 'Полтавська'},
        {value: 'rivne', label: 'Рівненська'},
        {value: 'sumy', label: 'Сумська'},
        {value: 'ternopil', label: 'Тернопільська'},
        {value: 'kharkiv', label: 'Харківська'},
        {value: 'kherson', label: 'Херсонська'},
        {value: 'khmelnytskyi', label: 'Хмельницька'},
        {value: 'cherkasy', label: 'Черкаська'},
        {value: 'chernivtsi', label: 'Чернівецька'},
        {value: 'chernihiv', label: 'Чернігівська'},
    ];


    const {register, handleSubmit, watch, setValue} = useForm();
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [region, setRegion] = useState([])
    const [photos, setPhotos] = useState([]);
    const [photoPreviews, setPhotoPreviews] = useState([]);


    const navigate = useNavigate();

    const selectedBrandId = watch('brand');

    useEffect(() => {
        brandService.getAll().then(({data}) => setBrands(data.data));
    }, []);

    useEffect(() => {
        if (selectedBrandId) {
            brandService.getModelsByBrand(selectedBrandId).then(({data}) => setModels(data.data));
            setValue('model', '');
        } else {
            setModels([]);
        }
    }, [selectedBrandId]);

    const onSubmit = (data) => {
        const payload = {
            car_model: data.model,
            year: parseInt(data.year),
            mileage: parseInt(data.mileage),
            transmission: data.transmission,
            fuel_type: data.fuel_type,
            engine_capacity: parseFloat(data.engine_capacity),
            description: data.description,
            price_input: parseFloat(data.price_input),
            currency: data.currency,
            region: data.region
        };

        vehicleService.post(payload)
            .then(async ({data}) => {
                alert('Vehicle created successfully');

                // === ВІДПРАВКА ФОТО ===
                if (photos.length > 0) {
                    const formData = new FormData();
                    photos.forEach((photo) => {
                        formData.append('photo', photo); // одне поле — кілька фото
                    });

                    const photoUploadPromises = photos.map(photo => {
                        const singleForm = new FormData();
                        singleForm.append('photo', photo);
                        return photoService.addPhoto(data.id, singleForm); // 👈 ти повинна мати endpoint `/vehicles/:id/photos/`
                    });

                    await Promise.all(photoUploadPromises);
                }

                navigate('/vehicles');
            })
            .catch((err) => {
                const resData = err?.response?.data;
                if (
                    err.response?.status === 400 &&
                    resData?.msg?.includes('foul language')
                ) {
                    alert(resData.msg);
                    navigate(`/vehicles/edit/${resData.vehicle_id}`);
                } else {
                    alert('Error: ' + JSON.stringify(resData));
                }
            });
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 5);
        setPhotos(selectedFiles);

        const previews = selectedFiles.map(file => URL.createObjectURL(file));
        setPhotoPreviews(previews);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Brand:</label>
            <select {...register('brand')}>
                <option value="">change brand</option>
                {brands.map(brand => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>

            <label>Model:</label>
            <select {...register('model')} disabled={!selectedBrandId}>
                <option value="">Change model</option>
                {models.map(model => (
                    <option key={model.id} value={model.id}>{model.model}</option>
                ))}
            </select>

            <label>Year:</label>
            <input type="number" {...register('year')} min={1990} max={2025} required/>

            <label>mileage (km):</label>
            <input type="number" {...register('mileage')} required/>

            <label>transmission:</label>
            <select {...register('transmission')} required>
                <option value="">change transmission</option>
                <option value="manual">manual</option>
                <option value="automatic">automatic</option>
            </select>

            <label>fuel type</label>
            <select {...register('fuel_type')} required>
                <option value="">change fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
            </select>

            <label>engine capacity (л):</label>
            <input type="number" step="0.1" {...register('engine_capacity')} min={0.6} max={10.0} required/>

            <label>description:</label>
            <textarea {...register('description')} maxLength={2000}/>

            <label>Price:</label>
            <input type="number" {...register('price_input')} required/>

            <label>currency:</label>
            <select {...register('currency')} required>
                <option value="">Оберіть валюту</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="UAH">UAH</option>
            </select>
            <label>Region:</label>
            <select {...register('region')} required>
                <option value="">change region</option>
                {REGIONS.map(region => (
                    <option key={region.value} value={region.value}>
                        {region.label}
                    </option>
                ))}
            </select>

            <label>Upload Photos (до 5):</label>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <div style={{display: 'flex', gap: '10px', margin: '10px 0', flexWrap: 'wrap'}}>
                {photoPreviews.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`preview-${index}`}
                        style={{width: '100px', height: '80px', objectFit: 'cover', borderRadius: '8px'}}
                    />
                ))}
            </div>

            <button type="submit">Register cars</button>
        </form>
    );
};

export default AddVehicleComponent;