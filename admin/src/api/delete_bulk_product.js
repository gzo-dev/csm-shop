import axios from "axios"
import { API_URL } from "../config1"
import { getCookie } from "../function"

const delete_bulk_product= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/product/d/bulk",
        method: "post",
        data: {
            ...data
        },
        headers: {
            "Authorization": "Bearer " + getCookie("token")
        }
    })
    const result= await res.data
    return result
}

export default delete_bulk_product