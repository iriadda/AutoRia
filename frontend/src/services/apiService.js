import {baseURL, urls} from "../constants/urls";
import axios, {request} from "axios";
import {authService} from "./authService";


const apiService = axios.create({baseURL})


apiService.interceptors.request.use(req => {
        const token = localStorage.getItem('access');

        if (token) {
            req.headers.Authorization = `Bearer ${token}`

        }
        return req;
    },
    error => Promise.reject(error)
);



export {apiService}