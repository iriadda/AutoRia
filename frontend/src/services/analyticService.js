import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const AnalyticService={
    get(id){
        return apiService.get(`${urls.analytics}/${id}`)
    }
}
export default AnalyticService