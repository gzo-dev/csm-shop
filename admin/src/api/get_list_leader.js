import axios from "axios"
import { API_URL } from "../config1"

const get_list_leader = async ()=> {
    const res= await axios({
        url: API_URL+ "/api/auth/user/leader",
        method: "get",
    })
    const result= await res.data
    return result
}

export default get_list_leader 