import {useEffect, useState} from "react";
import {brandService} from "../services/brandService";

const AddBrandModelComponent = () => {
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [newModel, setNewModel] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = () => {
        brandService.getAll()
            .then(({data}) => setBrands(data.data))
    };

    const handleAddBrand = () => {
        if (!newBrand.trim()) return;
        brandService.create({name: newBrand})
            .then(() => {
                setMessage(`Бренд "${newBrand}" успішно додано`);
                setNewBrand('');
                loadBrands();
            })
    };

    const handleAddModel = () => {
        if (!newModel.trim() || !selectedBrand) return;
        console.log('Sending model:',  newModel);
        console.log('To brand ID:', selectedBrand);
        brandService.addModelToBrand(selectedBrand,  newModel)
            .then(() => {
                setMessage(`Модель "${newModel}" додано до бренду`);
                setNewModel('');
                setSelectedBrand('');
            })
    };

    return (
        <div>
            <h2>Add brand</h2>
            <input type="text" value={newBrand}
                   onChange={(e) => setNewBrand(e.target.value)}
                   placeholder="Brand name"
            />
            <button onClick={handleAddBrand}>Додати бренд</button>

            <h2>Add model</h2>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
                <option value="">Change brand</option>
                {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
            </select>
            <input
                type="text"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="Model name"
            />
            <button
                onClick={handleAddModel}
            >Add model
            </button>

            {message && (
                <div>
                    {message}
                </div>
            )}
        </div>
    );
};
export default AddBrandModelComponent;