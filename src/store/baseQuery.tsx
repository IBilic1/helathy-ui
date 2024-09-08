import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const baseQuery = (url: string) => {
    const BACKED_URL = process.env.REACT_APP_BACKEND

    return fetchBaseQuery(
        {
            baseUrl: url,
            credentials: "include",
            prepareHeaders: (headers) => {
                headers.append('Access-Control-Allow-Credentials', 'true');
                headers.append('Access-Control-Allow-Origin', BACKED_URL || '');
                return headers;
            }
        });
};