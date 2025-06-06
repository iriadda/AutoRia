import { useEffect, useRef, useState } from "react";
import { socketService } from "../services/socketService";

export const Chat = ({targetUserId}) => {
    const [socketClient, setSocketClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const messageInput = useRef();

    const userId = targetUserId.sellerId

    useEffect(() => {
        setMessages([]);

        if (userId) {
            socketInit(userId).then(client => setSocketClient(client));
        }

        // Очищення при розмонтуванні
        return () => {
            if (socketClient) {
                socketClient.close();
            }
        };
    }, [userId]);

    const socketInit = async (userId) => {
        const { chat } = await socketService();
        const client = await chat(userId); // WebSocket: ws://yourdomain/chat/<targetUserId>/

        client.onopen = () => {
            console.log('Chat socket connected');
        };

        client.onmessage = ({ data }) => {
            const { message, user, request_id } = JSON.parse(data);
            if (user && user.includes('_')) {
                const [userId, username] = user.split('_', 2);
                setMessages(prev => [...prev, { userId, username: username.trim(), message, request_id }]);
            } else {
                setMessages(prev => [...prev, { userId: user, username: user, message, request_id }]);
            }
        };

        client.onclose = () => {
            console.log('Chat socket closed');
        };

        client.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return client;
    };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter' && socketClient && e.target.value) {
            socketClient.send(JSON.stringify({
                action: 'send_private_message',
                request_id: new Date().getTime(),
                data: { text: e.target.value }
            }));
            e.target.value = '';
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={msg.request_id || index}>
                        <span>{msg.username || msg.userId}</span>: {msg.message}
                    </div>
                ))}
            </div>
            <input
                type="text"
                ref={messageInput}
                onKeyDown={handleEnterKey}
                placeholder="Type a message..."
            />
        </div>
    );
};