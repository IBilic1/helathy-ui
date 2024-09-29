// Need to use the React-specific entry point to allow generating React hooks
import {createApi} from '@reduxjs/toolkit/query/react'
import {Appointment, User} from "../../types/auth/types";
import {baseQuery} from "../baseQuery";

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: baseQuery(),
    endpoints: (builder) => ({
        getAppointmentsByDoctor: builder.query<Appointment[], void>({
            query: () => ({
                url: `/appointment`,
                method: 'GET',
            }),
        }),
        getAppointmentsByUser: builder.query<Appointment[], void>({
            query: () => ({
                url: `/appointment/for-user`,
                method: 'GET',
            }),
        }),
        createAppointment: builder.mutation<void, Appointment>({
            query: (body) => ({
                url: `/appointment`,
                method: 'POST',
                body,
            }),
        }),
        updateAppointment: builder.mutation<void, Appointment>({
            query: (body) => ({
                url: `/appointment`,
                method: 'PUT',
                body,
            }),
        }),
        getAllPatients: builder.query<User[], void>({
            query: () => ({
                url: `/user`,
                method: 'GET',
            }),
        }),
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: `/user/all`,
                method: 'GET',
            }),
        }),
        deleteAppointment: builder.mutation<void, number>({
            query: (id) => ({
                url: `/appointment/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetAppointmentsByDoctorQuery,
    useCreateAppointmentMutation,
    useGetAllUsersQuery,
    useGetAllPatientsQuery,
    useDeleteAppointmentMutation,
    useUpdateAppointmentMutation,
} = appointmentApi