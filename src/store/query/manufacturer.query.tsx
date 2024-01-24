import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Manufacturer} from "../../types/auth/types";

const baseQuery = (url: string) => {
    const access_token = localStorage.getItem('access_token');

    return fetchBaseQuery(
        {
            baseUrl: url,
            prepareHeaders: async (headers) => {
                headers.append('Origin', 'http://localhost:3000');
                if (access_token && access_token !== "undefined") {
                    headers.append('Authorization', 'Bearer ' + access_token);
                }
                return headers;
            }
        });
};

export const manufacturerApi = createApi({
    reducerPath: 'manufacturerApi',
    baseQuery: baseQuery('http://localhost:8080'),
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