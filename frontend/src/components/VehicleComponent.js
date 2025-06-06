const VehicleComponent = ({vehicle}) => {
    const {
        id,
        car_model_detail,
        year,
        mileage,
        transmission,
        fuel_type,
        engine_capacity,
        description,
        price_usd,
        user,
        vehicle_photos
    } = vehicle
    const mainPhoto = vehicle_photos.find(photo => photo.is_main);
    return (
        <div>
            {mainPhoto && <img src={mainPhoto.photo} alt="Main vehicle" width={200} />}
            <p><a href={'/vehicles/' + id}>{id}: {car_model_detail.brand.name} {car_model_detail.model}, year: {year},
                mileage: {mileage} price:{price_usd}</a></p>

        </div>
    );
};
export default VehicleComponent;