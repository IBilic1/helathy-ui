import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "./query/auth.query";
import {appointmentApi} from "./query/appointment.query";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(appointmentApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;