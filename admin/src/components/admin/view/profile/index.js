import React, { useContext, useEffect, useState } from "react";
import MaskingImage from "../../../../assets/Masking.png";
import WrapTextImage from "../../../../assets/wrap-text.png";
import LocationLogo from "../../../../assets/profile/location.png";
import MailLogo from "../../../../assets/profile/mail.png";
import PhoneLogo from "../../../../assets/profile/phone.png";
import { AppContext } from "../../../../App";
import { getCookie } from "../../../../function";
import get_list_employee_of_leader from "../../../../api/get_list_employee_of_leader";
import { Autocomplete, Box, Button, TextField, Typography } from "@mui/material";
import get_all_user from "../../../../api/get_all_user";
import reset_device from "../../../../api/reset_device";

const Profile = () => {
  const { user, userManager } = useContext(AppContext);
  const [employee, setEmployee] = useState([]);
  const [data, setData] = useState([]);
  const auid = getCookie("auid");
  const [value, setValue] = useState(null); // Lưu trữ giá trị được chọn
  const [inputValue, setInputValue] = useState(''); // Lưu trữ giá trị nhập vào

  const resetDeviceHandler= async ()=> {
    try {
      swal("Thông báo", "Bạn có chắc muốn reset device cho người dùng này không", {buttons: {
        ok: "OK",
        cancel: "Cancel"
      }})
      .then(async response=> {
        if(response=== "ok") {
          const result= await reset_device(value)
          if(result?.ok=== true) {
            swal("Thông báo", "Reset device cho người dùng này thành công", "success")
            setInputValue("")
            setValue(null)
          }
        }
        else {
          return null
        }
      })
      
    } catch (error) {
      swal("Thông báo", "Có lỗi xảy ra", "error")
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const result = await get_list_employee_of_leader({ uid: auid });
        setEmployee(result?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auid]);

  useEffect(() => {
    if (user.role === "admin") {
      (async () => {
        try {
          const result = await get_all_user();
          setData(result?.data);
        } catch (error) {}
      })();
    }
  }, [user.role]);

  return (
    <div id="layoutSidenav_content">
      <div style={{ width: "100%", position: "relative", marginBottom: 50 }}>
        <img
          style={{
            background: "#4d44b5",
            height: 150,
            objectFit: "cover",
            width: "100%",
          }}
          src={MaskingImage}
          alt="Masking"
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50%",
            transform: "translate(0, -25%)",
            left: "5%",
          }}
        >
          <img src={WrapTextImage} alt="WrapText" />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 20,
              fontWeight: 600,
              color: "#303972",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "uppercase",
            }}
          >
            Thông tin cá nhân
          </div>
        </div>
      </div>
      <main style={{ padding: "40px 55px" }}>
        <div className="w-100 d-flex align-items-center" style={{ gap: 40 }}>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <img src={LocationLogo} alt="" />
            <div style={{ fontSize: 18, fontWeight: 600, color: "#303972" }}>
              {user.address}
            </div>
          </div>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <img src={PhoneLogo} alt="" />
            <div style={{ fontSize: 18, fontWeight: 600, color: "#303972" }}>
              {user.phone}
            </div>
          </div>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <img src={MailLogo} alt="" />
            <div style={{ fontSize: 18, fontWeight: 600, color: "#303972" }}>
              {user.email}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="d-block pl-4 pt-4">
          <div className="d-flex">
            <div
              style={{
                width: 140,
                fontSize: 22,
                fontWeight: 600,
                color: "#303972",
              }}
            >
              Chức vụ:
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{user.role}</div>
          </div>
          <br />

          <div className="d-flex">
            <div
              style={{
                width: 140,
                fontSize: 22,
                fontWeight: 600,
                color: "#303972",
              }}
            >
              Họ và tên:
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>
              {user.firstName} {user.lastName}
            </div>
          </div>
          <br />
          {user.role === "admin" && (
            <div className="d-flex">
              <div
                style={{
                  width: 140,
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#303972",
                }}
              >
                Reset device:
              </div>
              <Box>
                <Typography mb={2}>Chọn người dùng để reset device</Typography>
                <Box>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue); // Cập nhật giá trị được chọn
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue); // Cập nhật giá trị nhập vào
                    }}
                    options={data}
                    getOptionLabel={(option) => option.firstName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn một người dùng"
                        variant="outlined"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value?.id
                    } // Xử lý để tìm kiếm chính xác giá trị
                  />
                </Box>
                <Box mt={2}>
                  {value && <Button onClick={resetDeviceHandler} variant="contained">Reset device</Button>}
                
                </Box>
              </Box>
            </div>
          )}
          <br />
          {user.role === "employee" && userManager && (
            <div className="d-flex">
              <div
                style={{
                  width: 140,
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#303972",
                }}
              >
                Người quản lý:
              </div>
              <div style={{ fontSize: 22, fontWeight: 600 }}>
                {userManager.firstName}
              </div>
            </div>
          )}
          {employee?.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#303972",
                }}
              >
                Danh sách nhân viên quản lý:{" "}
              </div>
              <table
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #303972", padding: 10 }}>
                      STT
                    </th>
                    <th style={{ border: "1px solid #303972", padding: 10 }}>
                      Họ và tên
                    </th>
                    <th style={{ border: "1px solid #303972", padding: 10 }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid #303972", padding: 10 }}>
                      Số điện thoại
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employee.map((emp, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #303972", padding: 10 }}>
                        {index + 1}
                      </td>
                      <td style={{ border: "1px solid #303972", padding: 10 }}>
                        {emp.firstName}
                      </td>
                      <td style={{ border: "1px solid #303972", padding: 10 }}>
                        {emp.email}
                      </td>
                      <td style={{ border: "1px solid #303972", padding: 10 }}>
                        {emp.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
