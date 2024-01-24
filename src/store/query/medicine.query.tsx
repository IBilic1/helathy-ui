import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Medicine} from "../../types/auth/types";

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

export const medicineApi = createApi({
    reducerPath: 'medicineApi',
    baseQuery: baseQuery('http://localhost:8080'),
    endpoints: (builder) => ({
        getAllMedicines: builder.query<Medicine[], void>({
            query: () => ({
                url: `/api/v1/medicine`,
                method: 'GET',
            }),
        }),
        getMedicine: builder.query<Medicine[], number>({
            query: (id: number) => ({
                url: `/api/v1/medicine/${id}`,
                method: 'GET',
            }),
        }),
        createMedicine: builder.mutation<void, Medicine>({
            query: (body) => ({
                url: `/api/v1/medicine`,
                method: 'POST',
                body,
            }),
        }),
        updateMedicine: builder.mutation<void, Medicine>({
            query: (body) => ({
                url: `/api/v1/medicine`,
                method: 'PUT',
                body,
            }),
        }),
        deleteMedicine: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/v1/medicine/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllMedicinesQuery,
    useCreateMedicineMutation,
    useGetMedicineQuery,
    useDeleteMedicineMutation,
    useUpdateMedicineMutation,
} = medicineApi