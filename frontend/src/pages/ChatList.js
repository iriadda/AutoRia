import { useEffect, useState } from "react";
import ChatService from "../services/ChatService";
import {useNavigate} from "react-router-dom";

export const ChatList = () => {
    const [chats, setChats] = useState([]);
    const navigate=useNavigate()

    useEffect(() => {
        ChatService.getAllRoom().then(({ data }) => {
            setChats(data);
        });
    }, []);

    return (
        <div>
            <h3>My chats</h3>
            {chats.map(chat => (
                <div key={chat.room_name} onClick={() => navigate(`/chat/${chat.user_id}`)}>
                    💬 {chat.username}
                </div>
            ))}
        </div>
    );
};
