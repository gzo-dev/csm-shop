import axios from "axios";
import { API_URL } from "../config1";

const get_list_product_user_manage = async (data) => {
  const res = await axios({
    url: API_URL + "/api/v1/product/user/manage",
    method: "get",
    params: {
      ...data,
    },
  });
  const result = await res.data;    
  return result;
};  

export default get_list_product_user_manage;
