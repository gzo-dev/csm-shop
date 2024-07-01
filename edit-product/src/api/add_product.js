import axios from "axios";
import { API_URL } from "../config";

const add_new_product = async (data, token) => {
  const res = await axios({
    url: API_URL + "/api/product/add",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
      "Authorization": "Bearer " + token
    },
    data
  });
  const result = await res.data;
  return result;
};

export default add_new_product;
