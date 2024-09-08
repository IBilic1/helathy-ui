import {createApi} from '@reduxjs/toolkit/query/react'
import {Medicine} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const medicineApi = createApi({
    reducerPath: 'medicineApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAllMedicines: builder.query<Medicine[], void>({
            query: () => ({
                url: `/medicine`,
                method: 'GET',
            }),
        }),
        getMedicine: builder.query<Medicine[], number>({
            query: (id: number) => ({
                url: `/medicine/${id}`,
                method: 'GET',
            }),
        }),
        createMedicine: builder.mutation<void, Medicine>({
            query: (body) => ({
                url: `/medicine`,
                method: 'POST',
                body,
            }),
        }),
        updateMedicine: builder.mutation<void, Medicine>({
            query: (body) => ({
                url: `/medicine`,
                method: 'PUT',
                body,
            }),
        }),
        deleteMedicine: builder.mutation<void, number>({
            query: (id) => ({
                url: `/medicine/${id}`,
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