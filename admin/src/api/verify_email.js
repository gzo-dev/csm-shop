import axios from "axios"
import { API_URL } from "../config1"
import { getCookie } from "../function"

const verify_email = async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/auth/2fa",
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

export default verify_email 