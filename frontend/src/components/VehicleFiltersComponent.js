import {useEffect, useState} from "react";
import {brandService} from "../services/brandService";

const VehicleFiltersComponent = ({ onFilter }) => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [priceTo, setPriceTo] = useState()
  const [priceFrom, setPriceFrom] = useState()

  useEffect(() => {
    brandService.getAll().then(({ data }) => {
      setBrands(data.data);
    });
  }, []);

  useEffect(() => {
    if (brand) {
      brandService.getModelsByBrand(brand).then(({ data }) => {
        setModels(data.data);
      });
    } else {
      setModels([]);
    }
  }, [brand]);

  const handleFilter = () => {
    const params = {};
    if (brand) params.brand = brand;
    if (model) params.model = model;
    if (yearFrom) params.year_from = yearFrom;
    if (yearTo) params.year_to = yearTo;
    if(priceFrom) params.price_from=priceFrom;
    if (priceTo) params.price_to=priceTo;
    onFilter(params);
  };

  return (
    <div>
      <label>Бренд:</label>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">Обрати бренд</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <label>Модель:</label>
      <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!models.length}>
        <option value="">Обрати модель</option>
        {models.map((m) => (
          <option key={m.id} value={m.id}>
            {m.model}
          </option>
        ))}
      </select>

      <label>Рік від:</label>
      <input type="number" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} />

      <label>Рік до:</label>
      <input type="number" value={yearTo} onChange={(e) => setYearTo(e.target.value)} />

       <label>$ Ціна від:</label>
      <input type="number" value={priceFrom} onChange={(e) => setPriceFrom(e.target.value)} />

      <label>$ Ціна до:</label>
      <input type="number" value={priceTo} onChange={(e) => setPriceTo(e.target.value)} />

      <button onClick={handleFilter}>Застосувати</button>
    </div>
  );
};

export default VehicleFiltersComponent;
