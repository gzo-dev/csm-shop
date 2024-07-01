import axios from "axios"
import { API_URL } from "../config1"
import { getCookie } from "../function"

const get_list_contact= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/contact",
        method: "get",
        params: {
            ...data
        },
        headers: {
            "Authorization": "Bearer " + getCookie("token")
        }
    })
    const result= await res.data
    return result
}

export default get_list_contact