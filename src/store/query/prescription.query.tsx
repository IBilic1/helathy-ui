import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Prescription} from "../../types/auth/types";

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

export const prescriptionApi = createApi({
    reducerPath: 'prescriptionApi',
    baseQuery: baseQuery('http://localhost:8080'),
    endpoints: (builder) => ({
        getAllPrescriptions: builder.query<Prescription[], void>({
            query: () => ({
                url: `/prescription`,
                method: 'GET',
            }),
        }),
        createPrescription: builder.mutation<void, Prescription>({
            query: (body) => ({
                url: `/prescription`,
                method: 'POST',
                body,
            }),
        }),
        updatePrescription: builder.mutation<void, Prescription>({
            query: (body) => ({
                url: `/prescription`,
                method: 'PUT',
                body,
            }),
        }),
        deletePrescription: builder.mutation<void, number>({
            query: (id) => ({
                url: `/prescription/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAllPrescriptionsQuery,
    useCreatePrescriptionMutation,
    useDeletePrescriptionMutation,
    useUpdatePrescriptionMutation,
} = prescriptionApi