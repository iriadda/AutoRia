import {ChatList} from "./ChatList";
import {Chat} from "../components/Chat";
import {useParams} from "react-router-dom";


export const ChatPage = () => {
    const targetUser =useParams() ||null
    console.log(targetUser)


    return (
        <div>
            <ChatList/>
            <hr/>
            <Chat targetUserId={targetUser} />
        </div>
    );
};