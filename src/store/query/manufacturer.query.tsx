import {createApi} from '@reduxjs/toolkit/query/react'
import {Manufacturer} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const manufacturerApi = createApi({
    reducerPath: 'manufacturerApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllManufacturers: builder.query<Manufacturer[], void>({
            query: () => ({
                url: `/api/v1/manufacturer`,
                method: 'GET',
            }),
        }),
        createManufacturer: builder.mutation<void, Manufacturer>({
            query: (body) => ({
                url: `/api/v1/manufacturer`,
                method: 'POST',
                body,
            }),
        }),
        updateManufacturer: builder.mutation<void, Manufacturer>({
            query: (body) => ({
                url: `/api/v1/manufacturer`,
                method: 'PUT',
                body,
            }),
        }),
        deleteManufacturer: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/v1/manufacturer/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllManufacturersQuery,
    useCreateManufacturerMutation,
    useDeleteManufacturerMutation,
    useUpdateManufacturerMutation,
} = manufacturerApi