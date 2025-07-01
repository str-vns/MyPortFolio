import axios, { type AxiosInstance } from "axios";
export const baseUrl =
  process.env.BUILD === "DEV"
    ? process.env.LOCALNETWORK
    : process.env.RENDERNETWORK;

export const apiClient: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DOWNTOKEN}`,
    },
    timeout: 1000,
})
