import axios from "axios";
import { API_URL } from "../config";

const upload_product_image = async (data) => {
  const res = await axios({
    url: API_URL + "/api/product/upload-img",
    method: "post",
    headers: {
      "content-type": "multipart/form-data",
    },
    data
  });
  const result = await res.data;
  return result;
};

export default upload_product_image;
