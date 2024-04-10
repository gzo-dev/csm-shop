import axios from "axios"
import { API_URL } from "../config1"

const get_detail_tour= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/tour/detail",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default get_detail_tour