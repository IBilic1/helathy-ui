import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import Cookies from "js-cookie";

export const baseQuery = () => {
    const BACKED_URL = process.env.REACT_APP_BACKEND

    return fetchBaseQuery(
        {
            baseUrl: BACKED_URL,
            credentials: "include",
            prepareHeaders: (headers) => {
                headers.append('Access-Control-Allow-Credentials', 'true');
                headers.append('Access-Control-Allow-Origin', BACKED_URL || '');
                const csrfToken = Cookies.get('XSRF-TOKEN');

                if (csrfToken) {
                    headers.append('X-XSRF-TOKEN', csrfToken);
                }
                return headers;
            }
        });
};