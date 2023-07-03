import Axios from "axios"
import { API_URL } from "../config1"

const reply_contact= async (email, content, contactId, replyText)=> {
    const res= await Axios({
        url: API_URL+ "/api/contact/reply",
        method: "post",
        data: {
            email, content, contactId, replyText
        }
    })
    const result= await res.data
    return result
}

export default reply_contact