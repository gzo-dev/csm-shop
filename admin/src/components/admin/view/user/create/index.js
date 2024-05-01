import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import Axios from "axios";
import get_list_leader from "../../../../../api/get_list_leader";

const Create = ({ history }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [image, setImage] = useState();
  const [userManager, setUserManager] = useState();
  const [listLeader, setListLeader] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await get_list_leader();
      setListLeader(result.data);
    })();
  }, []);
  const [formData, setFormData] = useState({
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    address: null,
    phone: "",
    password: null,
    confirmPassword: null,
    status: 0,
    role: null,
    note: "",
    avatar: "",
    user_id: "",
    user_manager: null,
  });

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoaded(true);
      const { password, confirmPassword, ...data } = formData;
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp");
        setIsLoaded(false);
      } else {
        const avatar = await handleUpload(e);

        const user = await GetUserLogin.getUserRegister({
          ...formData,
          avatar: avatar.file_path ? avatar.file_path : null,
        });
        if (user) {
          setIsLoaded(false);
          history.goBack();
          NotificationManager.success("Tạo người dùng thành công", "Message");
        } else {
          NotificationManager.error("Có lỗi xảy ra!", "Input");
          setIsLoaded(false);
        }
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error("Có lỗi trên hệ thống trên hệ thống!", "Input");
      setIsLoaded(false);
    }
  };

  const onFileChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleUpload = async (event) => {
    try {
      if (image) {
        var formData = new FormData();
        formData.append("file", image);
        const res = await Axios.post(
          "https://api.gzomedia.net/upload.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const imageUrl = await res.data;
        return imageUrl;
      } else {
        return { file_path: null };
      }
    } catch (error) {
      return { file_path: null };
    }
  };

  const {
    firstName,
    lastName,
    email,
    role,
    confirmPassword,
    password,
    status,
    address,
    phone,
    note,
    avatar,
    user_id,
  } = formData;

  return (
    <div className="container-fluid">
      {/* <div className="row">
                <div className="col-lg-5 col-md-9 col-lg-6">
                    <h2 className="mt-30 page-title">Tạo người dùng mới</h2>
                </div>
                <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                    <Button variant="contained" onClick={handleBack}><i className="fas fa-arrow-left" /> Back</Button>
                </div>
            </div> */}
      {/* <ol className="breadcrumb mb-30">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Nguời dùng</li>
            </ol> */}
      <Paper className="user-management" style={{ padding: "1rem" }}>
        {isLoaded ? <Loader /> : null}
        <div className="row">
          <div className="col-md-6 form-group">
            <label>Họ và tên</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Chức vụ</label>
            <select
              className="form-control"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option>Chọn chức vụ</option>
              <option value="ceo">CEO</option>
              <option value="hr">HR</option>
              <option value="marketing">Marketing</option>
              <option value="operator">Tổng đài viên</option>
              <option value="parttime">Part time</option>

              <option value="leader">Quản lý</option>
              <option value="employee">Nhân viên</option>
            </select>
          </div>
          {/* <div className="col-md-6 form-group">
                        <label>Tên</label>
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={handleChange} />
                    </div> */}
          <div className="col-md-6 form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Số điện thoại</label>
            <input
              type="number"
              className="form-control"
              name="phone"
              value={phone}
              onChange={handleChange}
              maxLength="10"
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Quyền hạn</label>
            <select
              className="form-control"
              name="role"
              value={role}
              onChange={handleChange}
            >
              <option disabled>Chọn chức vụ</option>
              <option value="ceo">CEO</option>
              <option value="hr">HR</option>
              <option value="marketing">Marketing</option>
              <option value="operator">Tổng đài viên</option>
              <option value="parttime">Part time</option>
              <option value="leader">Quản lý</option>
              <option value="employee">Nhân viên</option>
            </select>
          </div>
          {role === "employee" && (
            <div className="col-md-6 form-group">
              <label>Người quản lý</label>
              <select
                className="form-control"
                name="user_manager"
                value={userManager}
                onChange={handleChange}
              >
                {listLeader.map((item, key) => (
                  <option value={item.id} key={key}>
                    {item.firstName}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="col-md-6 form-group">
            <label>Thông tin chung</label>
            <input
              type="text"
              className="form-control"
              name="note"
              value={note}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Mã nhân viên</label>
            <input
              type="text"
              className="form-control"
              name="user_id"
              value={user_id}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Ảnh đại diện</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={onFileChange}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Trạng thái</label>
            <select
              className="form-control"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <option>Chọn trạng thái</option>
              <option value="1">Đang hoạt động</option>
              <option value="0">Ngừng hoạt động</option>
            </select>
          </div>
        </div>
        <button
          className="btn btn-success col-sm-3 mt-3 py-2"
          onClick={handleSubmit}
          style={{ background: "#F37335", borderRadius: 15 }}
        >
          Tạo tài khoản
        </button>
      </Paper>
    </div>
  );
};

export default Create;
