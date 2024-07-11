import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import Loader from "../../loader";
import { GetUserLogin } from "../../services";
import LogoImage from "../../../assets/logo.png";
import { MdOutlinePhone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import TwoFactorAuthDialog from "./twoFa";
import verify_email from "../../../api/verify_email";
import swal from "sweetalert";
import { eraseCookie, getCookie, setCookie } from "../../../function";
import ReCAPTCHA from "react-google-recaptcha";

const Signin = () => {
  const deviceCode = localStorage.getItem("deviceCode")
    ? localStorage.getItem("deviceCode")
    : "";
  const [email, setEmail] = useState("");
  const [open2fa, setOpen2fa] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleClose2fa = () => {
    eraseCookie("token");
    setOpen2fa(false);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleChangeUser = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!recaptchaToken) {
        swal("Thông báo", "Vui lòng xác nhận reCAPTCHA", "error");
        return;
      }
      setIsLoaded(true);
      let data = {
        email: email,
        password: password,
        deviceCode,
        recaptchaToken
      };
      let user = await GetUserLogin.getUserLogin(data);
      if (user) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
          localStorage.setItem("rememberedPassword", password);
        }
        GetUserLogin.authenticate(user, async () => {
          if (user?.third === true) {
            // swal("Thông báo", "Tài khoản hoặc mật khẩu không chính xác", "error")
          } else if (user?.success === false) {
            swal("Thông báo", "Tài khoản hoặc mật khẩu không chính xác", "error");
          } else if (user?.require2fa === true) {
            try {
              const data = await verify_email();
              setOpen2fa(true);
              // setCookie('token', data?.token, 14400)
              // setToken(user?.token)
            } catch (error) {
              if (error?.response?.status === 400) {
                swal("Thông báo", "Email người nhận không tồn tại, Bạn  hãy thử lại", "error");
                eraseCookie("token");
              } else if (error?.response?.status === 500) {
                swal("Thông báo", "Có lỗi ở phía server", "error");
                eraseCookie("token");
              }
            }
          }
          setIsLoaded(false);
        });
      } else {
        setIsLoaded(false);
        NotificationManager.error("Có lỗi xảy ra", "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (getCookie("token") && open2fa === false) {
    return (window.location.href = window.location.origin + "/admin");
  }

  return (
    <div className="bg-sign">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              {isLoaded ? <Loader /> : ""}
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div
                      className="card-header card-sign-header"
                      style={{ backgroundColor: "white" }}
                    >
                      <h3 className="text-center font-weight-light my-4">
                        <img src={LogoImage} alt="" />
                      </h3>
                      <div
                        className="text-center"
                        style={{ fontSize: 14, color: "#7C7C7C" }}
                      >
                        Dịch vụ bất động sản cho thuê và du lịch - lữ hành
                      </div>
                      <div
                        className="mt-2 text-center "
                        style={{
                          fontSize: 25,
                          color: "#F37335",
                          fontWeight: 500,
                        }}
                      >
                        Admin Login
                      </div>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group position-relative">
                          <MdOutlinePhone
                            className="position-absolute"
                            style={{
                              top: "50%",
                              transform: "translate(0, -50%)",
                            }}
                          />
                          <input
                            className="form-control py-3 cus-inp-txt pl-4"
                            style={{
                              border: "none",
                              borderBottom: "1px solid #7C7C7C",
                            }}
                            id="inputEmailAddress"
                            type="email"
                            placeholder="Số điện thoại"
                            name="email"
                            value={email}
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="form-group position-relative">
                          <CiLock
                            className="position-absolute"
                            style={{
                              top: "50%",
                              transform: "translate(0, -50%)",
                            }}
                          />
                          <input
                            className="form-control cus-inp-txt py-3 pl-4"
                            id="inputPassword"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={password}
                            onChange={handleChangeUser}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox">
                            <input
                              className="custom-control-input"
                              id="rememberPasswordCheck"
                              type="checkbox"
                              checked={rememberMe}
                              onChange={handleRememberMeChange}
                            />
                            <label
                              className="custom-control-label"
                              style={{ fontSize: 14 }}
                              htmlFor="rememberPasswordCheck"
                            >
                              Nhớ mật khẩu
                            </label>
                          </div>
                        </div>
                        <ReCAPTCHA
                          sitekey="6Lfmy0EoAAAAAE28NJHvWGKeQ4-Y1Po9Fon9836k"
                          onChange={(token) => setRecaptchaToken(token)}
                        />
                        <div
                          className="form-group d-flex align-items-center justify-content-between mt-4 mb-0"
                          onClick={handleSubmit}
                        >
                          <a className="btn btn-sign hover-btn">Login</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <TwoFactorAuthDialog open={open2fa} handleClose={handleClose2fa} token={token} />
    </div>
  );
};

export default Signin;
