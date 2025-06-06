import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const vehicleService = {

    getFiltered (params) {
         console.log('Params:', params);
        return apiService.get(urls.cars, { params })
    },
    post(data) {
        return apiService.post(urls.cars, data)
    },
    update(id, data) {
        return apiService.patch(`${urls.cars}/${id}`, data)
    },
    remove(id) {
        return apiService.delete(`${urls.cars}/${id}`)
    },
    getById(id) {
        return apiService.get(`${urls.cars}/${id}`)
    }

}

export {vehicleService}