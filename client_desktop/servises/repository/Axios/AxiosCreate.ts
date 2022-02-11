import axios, {
    AxiosInstance,
    AxiosPromise,
    AxiosResponse,
    AxiosError,
    AxiosRequestConfig
} from "axios";

class AxiosCreate {
    static _instanse: null | AxiosCreate = null;
    private URL: string = process.env.NEXT_PUBLIC_API_URL as string;
    api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            withCredentials: true,
            baseURL: this.URL
        });

        this.api.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        this.api.interceptors.request.use((config: AxiosRequestConfig) => {
            const token = localStorage.getItem("authToken");

            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
        /**/
    }
    static get getInstance() {
        if (!AxiosCreate._instanse) {
            AxiosCreate._instanse = new AxiosCreate();
        }
        return AxiosCreate._instanse;
    }
}

export default AxiosCreate;
