import {urls} from "../constants/urls";
import {apiService} from "./apiService";


const modelBase = `${urls.cars}/models`;

const modelService = {
    update: (id, data) => apiService.put(`${modelBase}/${id}`, data),

    delete: (id) => apiService.delete(`${modelBase}/${id}`),
};

export {modelService};