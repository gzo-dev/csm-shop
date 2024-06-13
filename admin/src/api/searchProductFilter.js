import Axios from "axios"
import { API_URL } from "../config1"

const search_product_filter= async (data)=> {
    const res= await Axios({
        url: API_URL + "/api/v1/product/filter",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return  result
}

export default search_product_filter