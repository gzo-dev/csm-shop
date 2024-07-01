import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import OtpInput from "react-otp-input";

const TwoFactorAuthDialog = ({ open, handleClose }) => {
  const [otp, setOtp] = useState("");

  const handleChangeOtp = (otp) => {
    setOtp(otp);
  };

  const handleSubmit = () => {
    // Handle the OTP submission logic here
    console.log("Submitted OTP:", otp);
    handleClose();
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xác thực email</DialogTitle>
      <DialogContent>
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
        <TextField fullWidth label="Backup Code (if any)" variant="outlined" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TwoFactorAuthDialog;
