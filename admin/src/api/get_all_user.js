import axios from "axios"
import { API_URL } from "../config1"
import { getCookie } from "../function"

const get_all_user= async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/auth/user/getAllUserList",
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

export default get_all_user