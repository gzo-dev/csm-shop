import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../../../App";
import { useHistory } from "react-router-dom";
import { SocketContext } from "../../../../../SocketContainer/SocketContainer";
import { EDIT_URL } from "../../../../../config1";

function generateRandomDigits() {
  let result = ""; // Chuỗi kết quả sẽ chứa các chữ số ngẫu nhiên

  // Tạo 10 chữ số ngẫu nhiên
  for (let i = 0; i < 10; i++) {
    const randomDigit = Math.floor(Math.random() * 10); // Sinh số ngẫu nhiên từ 0 đến 9
    result += randomDigit; // Thêm chữ số vào chuỗi kết quả
  }

  return result; // Trả về chuỗi kết quả chứa 10 chữ số ngẫu nhiên
}

// Sử dụng hàm để sinh ra 10 chữ số ngẫu nhiên

const Edit = (props) => {
  const history= useHistory()
  const self = props.location.state.row;
  const roomId = generateRandomDigits();
  const encodedSearch = encodeURIComponent(self.search);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.emit("join_room", { roomId });
    }
  }, [socket, roomId]);

  useEffect(() => {
    if (socket) {
      socket.on("to_website", (data) => {
        history.push(`/admin/p/${self.categoryId}/${self.subCategoryId}/list?page=${self.page}&search=${encodedSearch}`)
      });
    }
  }, [socket]);
  

  return (
    <div style={{width: "100%"}}>
      <iframe
        style={{width: "100%", height: "700px"}}
        title=""
        src={`${EDIT_URL}/edit-product/${self.categoryId}/${self.subCategoryId}/${self.id}/${roomId}/${self.page}/${encodedSearch}`}
      />
      {console.log(self.search)}
    </div>
  );
};

export default Edit;
