
import axios, {AxiosError} from "axios";

export type ApiError = AxiosError<{ error: string }>

export const nextApiServer = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
    withCredentials: true
})