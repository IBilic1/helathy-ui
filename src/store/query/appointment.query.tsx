// Need to use the React-specific entry point to allow generating React hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Appointment, User} from "../../types/auth/types";

const baseQuery = (url: string) => {
    const access_token = localStorage.getItem('access_token');

    return fetchBaseQuery(
        {
            baseUrl: url,
            prepareHeaders: async (headers) => {
                // Set headers based on the fetch args URL.
                headers.append('Origin', 'http://localhost:3000');
                if (access_token && access_token !== "undefined") {
                    headers.append('Authorization', 'Bearer ' + access_token);
                }
                return headers;
            }
        });
};

export const appointmentApi = createApi({
    reducerPath: 'appointmentApi',
    baseQuery: baseQuery('https://helathyapp-git-tosh.apps.na410r.prod.ole.redhat.com'),
    endpoints: (builder) => ({
        getAppointmentsByDoctor: builder.query<Appointment[], void>({
            query: () => ({
                url: `/api/v1/appointment`,
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
    useUpdateAppointmentMutation
} = appointmentApi