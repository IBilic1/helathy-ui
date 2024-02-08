// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {AuthResponse, LoginRequest, SignUpRequest, User} from "../../types/auth/types";

const BACKED_URL = process.env.REACT_APP_BACKEND

const baseQuery = (url: string) => {
    return fetchBaseQuery(
        {
            baseUrl: url,
            prepareHeaders: async (headers) => {
                // Set headers based on the fetch args URL.
                headers.append('Origin', 'http://localhost:3000');
                return headers;
            }
        });
};

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: `/api/v1/auth/authenticate`,
                method: 'POST',
                body,
            }),
        }),
        signUp: builder.mutation<AuthResponse, SignUpRequest>({
            query: (body) => ({
                url: `/api/v1/auth/register`,
                method: 'POST',
                body,
            }),
        }),
        refreshToken: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: `/api/v1/auth`,
                method: 'POST',
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: `/api/v1/user`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useSignInMutation,
    useSignUpMutation,
    useRefreshTokenMutation,
    useGetUserQuery
} = authApi