import Axios from "axios"
import { API_URL } from "../config1"

const update_employee_manage_product = async (data) => {
    const res= await Axios({
        url: API_URL + "/api/auth/leader/list/employee",
        method: "PUT",
        data: {
            ...data
        }
    })
    const result= await res.data
    return result
}

export default update_employee_manage_product
