import axios, { type AxiosInstance } from "axios";
import toast from "react-hot-toast";
import useToken from "../stores/auth/useToken";

const BaseUrl: string = "https://store-back.mehran-dev.com";

const HttpRequest: AxiosInstance = axios.create({
    baseURL: BaseUrl + "/api",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

HttpRequest.interceptors.request.use((config) => {
      let { getToken } = useToken.getState();
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
});

HttpRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status == 422) {
            toast.error(error.response.data.error);
        } else if (error?.response?.status == 401) {
            toast.error("خطای احراز هویت");
        } else {
            toast.error("خطایی در ارتباط با سرور رخ داد");
            window.location.href = "/500"
        }
    }
);

export default HttpRequest;
export { BaseUrl };