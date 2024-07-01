import axios from "axios"
import { API_URL } from "../config"

const get_detail_blog= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/blog/d",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default get_detail_blog