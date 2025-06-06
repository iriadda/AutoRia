import {apiService} from "./apiService";
import {urls} from "../constants/urls";


const authService = {
    async login(user) {
        const {data} = await apiService.post(urls.auth.login, user);
        const {access, refresh} = data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        return data;
    },
    async refresh(refreshToken) {
        const {data} = await apiService.post(urls.auth.refresh, {refresh: refreshToken});

        const {access, refresh} = data;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        return data;
    },
    recoveryRequest(email) {
        return apiService.post(urls.auth.recovery, {email})
    },
    recoveryToken(token, password) {
        return apiService.post(`auth/recovery/${token}`, {password})
    },
    getSocketToken() {
        return apiService.get(urls.auth.socket)
    }
};
export {authService}