import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const photoService={
    addPhoto(id, data){
        return apiService.post(`${urls.addPhoto}/${id}`, data)
    }
}
export default photoService