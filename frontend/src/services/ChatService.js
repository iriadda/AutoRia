import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const ChatService={
    getAllRoom(){
        return apiService.get(`${urls.chat}/my-rooms`)
    }
}
export default ChatService