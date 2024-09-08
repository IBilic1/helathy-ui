import {createApi} from '@reduxjs/toolkit/query/react'
import {User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => ({
                url: `/user/user-info`,
                method: 'GET',
                keepUnusedDataFor: 3600,
            }),
        }),
    }),
})

export const {
    useGetUserQuery
} = authApi