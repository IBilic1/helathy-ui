// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react'
import {Appointment, User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

const BACKED_URL = process.env.REACT_APP_BACKEND

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: baseQuery(BACKED_URL || ''),
    endpoints: (builder) => ({
        getAppointmentsByDoctor: builder.query<Appointment[], void>({
            query: () => ({
                url: `/api/v1/appointment`,
                method: 'GET',
            }),
        }),
        getAppointmentsByUser: builder.query<Appointment[], void>({
            query: () => ({
                url: `/api/v1/appointment/for-user`,
                method: 'GET',
            }),
        }),
        createAppointment: builder.mutation<void, Appointment>({
            query: (body) => ({
                url: `/api/v1/appointment`,
                method: 'POST',
                body,
            }),
        }),
        updateAppointment: builder.mutation<void, Appointment>({
            query: (body) => ({
                url: `/api/v1/appointment`,
                method: 'PUT',
                body,
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: `/api/v1/user/all`,
                method: 'GET',
            }),
        }),
        deleteAppointment: builder.mutation<void, number>({
            query: (id) => ({
                url: `/api/v1/appointment/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAppointmentsByDoctorQuery,
    useCreateAppointmentMutation,
    useGetAllUsersQuery,
    useDeleteAppointmentMutation,
    useUpdateAppointmentMutation,
    useGetAppointmentsByUserQuery
} = appointmentApi