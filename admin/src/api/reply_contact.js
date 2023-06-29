import Axios from "axios"
import { API_URL } from "../config1"

const reply_contact= async (email, content)=> {
    const res= await Axios({
        url: API_URL+ "/api/contact/reply",
        method: "post",
        data: {
            email, content
        }
    })
    const result= await res.data
    return result
}

export default reply_contact