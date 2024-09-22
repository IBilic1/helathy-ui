import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const baseQuery = () => {
    const BACKED_URL = process.env.REACT_APP_BACKEND

    return fetchBaseQuery(
        {
            baseUrl: BACKED_URL,
            credentials: "include",
            prepareHeaders: (headers) => {
                headers.append('Access-Control-Allow-Credentials', 'true');
                headers.append('Access-Control-Allow-Origin', BACKED_URL || '');
                return headers;
            }
        });
};