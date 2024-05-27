import axios from 'axios'

export const API = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

API.interceptors.response.use(response => {
    return response.data
})
