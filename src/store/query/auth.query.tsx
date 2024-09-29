import {createApi} from '@reduxjs/toolkit/query/react'
import {User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery(),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        logout: builder.mutation<User, void>({
            query: () => ({
                url: `/logout`,
                method: 'POST',
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: `/user/user-info`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
    }),
})

export const {
    useGetUserQuery,
    useLogoutMutation
} = authApi