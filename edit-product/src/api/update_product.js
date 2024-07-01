import axios from "axios";
import { API_URL } from "../config";

const update_product = async (data, token) => {
  const res = await axios({
    url: API_URL + "/api/product/update",
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

export default update_product;
