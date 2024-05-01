import React, { useEffect, useState } from "react";
import { Button, Paper, Typography } from "@material-ui/core";
import { GetUserLogin } from "../../../../services";
import { NotificationManager } from "react-notifications";
import Loader from "../../../../loader";
import Axios from "axios";
import get_list_leader from "../../../../../api/get_list_leader";

const Edit = (props) => {
  const [userData, setUserData] = useState(props.location.state);
  const [isLoaded, setIsLoaded] = useState(false);
  const [image, setImage] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userManager, setUserManager]= useState()
  const [listLeader, setListLeader]= useState([])

  useEffect(()=> {
    (async ()=> {
      const result= await get_list_leader()
      setListLeader(result.data)
    })()
  }, []) 

  const handleChange = (e) => {
    console.log(e.target.value)
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    props.history.goBack();
  };

  const handleSubmit = async (e) => {
    setIsLoaded(true);

    // Perform all necessary validations
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      setIsLoaded(false);
    } else {
      const data = { ...userData };
      let finalData;
      if (
        password.trim().length > 0 &&
        confirmPassword.trim().length > 0 &&
        password === confirmPassword
      ) {
        finalData = { ...data, password: password };
      } else {
        finalData = { ...data, password: undefined };
      }
      // Make API call
      const imageApi = await handleUpload(e);
      if (imageApi) {
        const user = await GetUserLogin.getUserUpdate({
          ...finalData,
          avatar: imageApi.file_path,
        });
        if (user) {
          setIsLoaded(false);
          props.history.goBack();
          NotificationManager.success("Update success", "Message");
        } else {
          NotificationManager.error("Check field", "Input");
        }
      } else {
        const user = await GetUserLogin.getUserUpdate(finalData);
        if (user) {
          setIsLoaded(false);
          props.history.goBack();
          NotificationManager.success("Update success", "Message");
        } else {
          NotificationManager.error("Check field", "Input");
        }
      }
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
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const {
    firstName,
    lastName,
    email,
    role,
    address,
    phone,
    status,
    verify,
    note,
    user_id,
    avatar,
  } = userData;

  return (
    <div className="container-fluid">
      {/* <div className="row">
                <div className="col-lg-5 col-md-9 col-lg-6">
                    <Typography variant="h4" className="mt-30 page-title">Cập nhật người dùng</Typography>
                </div>
                <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                    <Button variant="contained" onClick={handleBack}><i className="fas fa-arrow-left" /> Back</Button>
                </div>
            </div> */}
      {/* <ol className="breadcrumb mb-30">
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">User</li>
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
          {/* <div className="col-md-6 form-group">
                        <label>Last Name</label>
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
            <label>Trạng thái người dùng</label>
            <select
              className="form-control"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <option value="0">Ngừng hoạt động</option>
              <option value="1">Đang hoạt động</option>
            </select>
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
            <label>Số điện thoại</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
          </div>
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
            <label>Quyền hạn</label>
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
          {role=== "employee" &&
            <div className="col-md-6 form-group">
              <label>Người quản lý</label>
              <select
                className="form-control"
                name="user_manager"
                value={userManager}
                onChange={handleChange}
              >
                <option value="" selected disabled hidden>Chọn người quản lý</option>
               {
                listLeader.map((item, key)=> 
                  <option value={item.id} key={key}>{item.firstName}</option>
                )
               }
              </select>
            </div>
          }
          <div className="col-md-6 form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Xác nhận mật khẩu</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-3"
          onClick={handleSubmit}
          style={{ backgroundColor: "#F37335", borderRadius: 15 }}
        >
          Cập nhật người dùng
        </Button>
      </Paper>
    </div>
  );
};

export default Edit;
