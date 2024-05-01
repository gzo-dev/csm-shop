import Axios from "axios";
import { API_URL } from "../config1";
import { NotificationManager } from "react-notifications";

const getAllProductListCategory = async (data) => {
    try {
        const res= await Axios({
            url: API_URL + "/api/v1/product/c/s",
            method: "get",
            params: {
                ...data
            }
        })
        const result= await res.data
        if (result.data.error) {
            NotificationManager.error(result.data.error);
            return null;
        }
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default getAllProductListCategory