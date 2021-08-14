import { useState, useCallback } from "react";

export const useConnect = () => {
    const [token, setToken ] = useState(false);
    const [userId, setUserId] = useState(false);
    const [firstname, setFirstname] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const connect = useCallback((token, userId, firstname, isAdmin) => {
        setToken(token);
        setUserId(userId);
        setFirstname(firstname);
        setIsAdmin(isAdmin);

        localStorage.setItem("user",
            JSON.stringify({
                token: token,
                userId: userId,
                firstname: firstname,
                isAdmin: isAdmin
            })
        );
    }, [])

    return { token, userId, firstname, isAdmin, connect };
}