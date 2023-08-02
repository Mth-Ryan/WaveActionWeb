import { ApiOrigin } from "$lib/configConstants";

import axios from "axios"

export  const getApiClient = () => {
    let handler = axios.create();
    handler.defaults.baseURL = ApiOrigin;

    return handler;
}

export const getAuthApiClient = (token: string) => {
    let handler = axios.create();
    handler.defaults.baseURL = ApiOrigin;
    handler.defaults.headers["Authorization"] = `Bearer ${token}`

    return handler;
}