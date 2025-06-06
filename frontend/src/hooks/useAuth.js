import {useEffect, useState} from "react";
import {userService} from "../services/userService";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        userService.getMe()
            .then(({data}) => {
                setUser(data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                setUser(null);
                setIsAuthenticated(false);
            });
    }, []);

    return { isAuthenticated, user };
};

export default useAuth;
