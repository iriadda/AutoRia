import {apiService} from "./apiService";
import {urls} from "../constants/urls";

const userService = {
    getAll: () => apiService.get(urls.users),
    blockUser: (userId) => apiService.patch(`${urls.users}/${userId}/block`),
    unblockUser: (userId) => apiService.patch(`${urls.users}/${userId}/unblock`),
    makeManager: (userId) => apiService.patch(`${urls.users}/${userId}/user-manager/`),

    register: (data) => apiService.post(urls.users, data),


    getMe: () => apiService.get(`${urls.users}/profile`),


    updateMe: (data) => apiService.patch(`${urls.users}/profile`, data),


    deleteMe: () => apiService.delete(`${urls.users}/profile`),

    getPremium: (data) => apiService.patch(`${urls.users}/buy-premium`)
};

export {userService};