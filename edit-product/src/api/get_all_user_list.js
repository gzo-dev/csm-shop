import axios from "axios";
import { API_URL } from "../config";

const get_all_user_list = async (data, token) => {
  const res = await axios({
    url: API_URL + "/api/auth/user/getAllUserList",
    method: "get",
    params: {
      ...data,
    },
    headers: { "Authorization": "Bearer " + token },
  });
  const result = await res.data;
  return result;
};

export default get_all_user_list;
