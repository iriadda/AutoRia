import {authService} from "./authService";
import {w3cwebsocket as W3cwebsocket} from "websocket";


const baseURL='ws://localhost/api'
const socketService = async () => {
    const {data:{token}} = await authService.getSocketToken();
    return {
        chat: (id)=> new W3cwebsocket(`${baseURL}/chat/${id}?token=${token}`),

    }
}

export {socketService}