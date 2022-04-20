import axios, { AxiosInstance } from "axios";

export default (jwt: string): AxiosInstance => {
    return axios.create({
        baseURL: "https://qr.qualium-systems.com/api/v1/",
        headers: { 'Authorization': `Bearer ${jwt}`}
    })
}