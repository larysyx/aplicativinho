import axios from "axios";

 export const api = axios.create({
    baseURL: "https://adonis-api-xeee.onrender.com",
    headers: {
        Accept: 'aplication.json'
    }
 })