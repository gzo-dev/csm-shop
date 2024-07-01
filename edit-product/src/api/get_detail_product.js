import axios from "axios"
import { API_URL } from "../config"

const get_detail_product= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/product/getProductById",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default get_detail_product