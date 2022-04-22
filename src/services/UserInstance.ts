import axios, { AxiosInstance } from "axios";

export default (jwt: string): AxiosInstance => {
    return axios.create({
        baseURL: "https://qr.qualium-systems.com/api/v1/",
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    })
}