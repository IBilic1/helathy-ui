import React, {createContext, useContext} from 'react';
import {User} from "../types/auth/types";
import {authApi, useGetUserQuery, useLogoutMutation} from "../store/query/auth.query";
import {useDispatch} from "react-redux";

type AuthProviderProp = {
    user?: User;
    logout: () => void;
    isAuthenticated: () => boolean;
    isAdminAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthProviderProp | undefined>(undefined);

type AuthProviderProps = {
    children: JSX.Element;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const {data: user} = useGetUserQuery();

    const lazyLogout = () => {
        logout();
        dispatch(authApi.util.invalidateTags(['User']));
        window.location.href = '/login';
    }

    const isAuthenticated = () => {
        return user !== undefined;
    }

    const isAdminAuthenticated = () => {
        return user !== undefined && user.role === "DOCTOR";
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, isAdminAuthenticated, logout: lazyLogout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
