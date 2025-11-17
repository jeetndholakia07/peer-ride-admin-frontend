import { useEffect, useState, useRef } from "react";
import { getUserContext } from "../context/UserContext";
import apiInterceptor from "./apiInterceptor";
import { api } from "./api";

const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { user, setUser, hasValidatedRef } = getUserContext();
    const didValidate = useRef(false);

    useEffect(() => {
        if (didValidate.current || hasValidatedRef?.current) {
            if (user) setIsAuthenticated(true);
            setLoading(false);
            return;
        }
        const validate = async () => {
            try {
                const res = await apiInterceptor.get(api.auth.validate);
                const { id, username } = res.data;
                setUser({ id: id, username: username });
                setIsAuthenticated(true);
                hasValidatedRef.current = true;
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
                didValidate.current = true;
            }
        };
        validate();
    }, []);

    const authenticateAdmin = (userData: any) => {
        setUser({ id: userData.id, username: userData.username });
        setIsAuthenticated(true);
        hasValidatedRef.current = true;
        setLoading(false);
    };

    return { isAuthenticated, loading, authenticateAdmin };
};

export default useAuth;