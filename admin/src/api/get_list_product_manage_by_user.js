import Axios from "axios";
import { getCookie } from "../function";
import { API_URL } from "../config1";

const get_list_product_manage_by_user = async (data) => {
    try {
        const res= await Axios({
            url: API_URL + "/api/v1/product/manage/by/user",
            method: "get",
            params: {
                ...data
            },
            headers: {
                "Authorization": "Bearer " + getCookie("token")
            }
        })
        const result= await res.data
        return result;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default get_list_product_manage_by_user
