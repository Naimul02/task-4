import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://nesn-39-store-server.vercel.app'
})
const useAxiosPublic = () => {
        return axiosPublic;
}
export default useAxiosPublic;