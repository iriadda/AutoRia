import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const brandBase = `${urls.cars}/brand`;

const brandService = {
    getAll: () => apiService.get(brandBase),

    create: (data) => apiService.post(brandBase, data),

    update: (id, data) => apiService.put(`${brandBase}/${id}`, data),

    delete: (id) => apiService.delete(`${brandBase}/${id}`),

    getModelsByBrand: (brandId) => apiService.get(`${brandBase}/${brandId}/models`),

    addModelToBrand: (brandId, modelName) => apiService.post(`${brandBase}/${brandId}/add_model`, { model: modelName }),
};

export {brandService};