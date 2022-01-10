import axios from 'axios';
import {apiURL} from "./config";

const axiosApi = axios.create({
    baseURL: apiURL,
});

export default axiosApi;