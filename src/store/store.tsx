import {configureStore, Dispatch, Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {authApi} from "./query/auth.query";
import {appointmentApi} from "./query/appointment.query";
import {medicineApi} from "./query/medicine.query";
import {manufacturerApi} from "./query/manufacturer.query";
import {prescriptionApi} from "./query/prescription.query";


const customMiddleware: Middleware = (store: MiddlewareAPI) => (
    next: Dispatch
) => (action) => {

    // ovdje idi po refresh token
    return next(action);
};

export default customMiddleware;

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [authApi.reducerPath]: authApi.reducer,
        [appointmentApi.reducerPath]: appointmentApi.reducer,
        [medicineApi.reducerPath]: medicineApi.reducer,
        [manufacturerApi.reducerPath]: manufacturerApi.reducer,
        [prescriptionApi.reducerPath]: prescriptionApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(appointmentApi.middleware)
            .concat(medicineApi.middleware)
            .concat(manufacturerApi.middleware)
            .concat(prescriptionApi.middleware)
            .concat(customMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;