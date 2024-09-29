import {useAuth} from "../auth/AuthProvider";

export const useAdminRole = () => {
    const auth = useAuth();
    return auth?.user?.role === 'ADMIN'
}

export const useSystemUserRole = () => {
    const auth = useAuth();
    return auth?.user?.role === 'SYSTEM_USER'
}