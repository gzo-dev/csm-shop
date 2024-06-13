import Axios from "axios"
import { API_URL } from "../config1"

const search_product= async (data)=> {
    const res= await Axios({
        url: API_URL + "/api/v1/search/p/text",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return  result
}

export default search_product