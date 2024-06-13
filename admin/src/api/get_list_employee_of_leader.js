import axios from "axios"
import { API_URL } from "../config1"

const get_list_employee_of_leader = async (data)=> {
    const res= await axios({
        url: API_URL+ "/api/auth/leader/list/employee",
        method: "get",
        params: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default get_list_employee_of_leader 