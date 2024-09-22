import {useAuth} from "../auth/AuthProvider";

export const useRole = () => {
    const auth = useAuth();
    return auth?.user?.role === 'ADMIN'
}