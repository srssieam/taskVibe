import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "https://task-vibe-server.vercel.app/v1/api"
})
const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;