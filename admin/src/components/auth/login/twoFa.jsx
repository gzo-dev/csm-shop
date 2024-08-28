import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import OtpInput from "react-otp-input";
import verify_otp from "../../../api/verify_otp";
import { setCookie } from "../../../function";

const TwoFactorAuthDialog = ({ open, handleClose, token }) => {
  const [otp, setOtp] = useState("");

  const handleChangeOtp = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = async () => {
    try {
      const result= await verify_otp({otp})
      if(result?.ok=== true) {
        swal("Thông báo", "Đăng nhập thành công. Nhấn ok để tiếp tục", "success")
        .then(()=> {
          setCookie("token", result?.token, 144000)
          window.location.href= window.location.origin
        })
      }
    } catch (error) {
      if(error?.response?.status=== 400) {
        swal("Thông báo", "Mã xác thực không chính xác", "error")
      }
      else if(error?.response?.status=== 500) {
        swal("Thông báo", "Có lỗi ở server", "error")
      }
    }
    // Handle the OTP submission logic here
    console.log("Submitted OTP:", otp);
    onClose();
  };

  const onClose= ()=> {
    handleClose()
    setOtp("")
  }
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Xác thực email</DialogTitle>
      <DialogContent>
        <Typography mt={1} mb={1} variant="body1">Một mã 6 chữ số vừa được gửi đến email của bạn, Vui lòng xác thực mã vào ô dưới đây để tiếp tục  đăng nhập</Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <OtpInput
            value={otp}
            onChange={handleChangeOtp}
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "2rem",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.3)",
            }}
            renderInput={(props) => (
              <Box
                component="input"
                {...props}
                sx={{
                  all: "unset",
                  minWidth: 56,
                  height: 56,
                  fontSize: 18,
                  flexBasis: 70,
                  borderRadius: 2,
                  fontWeight: 600,
                  background: "rgb(238, 239, 242)",
                  input: {
                    textAlign: "center",
                  },
                  "::placeholder": {
                    color: "text.primary",
                  },
                }}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFactorAuthDialog;
