import axios from "axios"
import { API_URL } from "../config1"

const delete_bulk_product= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/product/d/bulk",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default delete_bulk_product