import Axios from "axios"
import { API_URL } from "../config1"
import { getCookie } from "../function"

const reset_device= async (data)=> {
    const res= await Axios({
        url: API_URL+ "/api/auth/reset-device",
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

export default reset_device