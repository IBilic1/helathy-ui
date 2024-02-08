import {createApi} from '@reduxjs/toolkit/query/react'
import {Prescription} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const prescriptionApi = createApi({
    reducerPath: 'prescriptionApi',
    baseQuery: baseQuery(BACKED_URL || ''),
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