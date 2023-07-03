import axios from "axios"
import { API_URL } from "../config1"

const apply_voucher= async (data)=> {
    const res= await axios({
        url: API_URL + "/api/voucher/apply",
        method: "post",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default apply_voucher