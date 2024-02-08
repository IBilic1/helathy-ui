import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const baseQuery = (url: string) => {
    const access_token = localStorage.getItem('access_token');
    const ORIGIN_URL = process.env.REACT_ORIGIN

    return fetchBaseQuery(
        {
            baseUrl: url,
            prepareHeaders: async (headers) => {
                headers.append('Origin', ORIGIN_URL || '');
                if (access_token && access_token !== "undefined") {
                    headers.append('Authorization', 'Bearer ' + access_token);
                }
                return headers;
            }
        });
};