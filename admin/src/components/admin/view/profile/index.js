import React, { useContext } from "react";
import MaskingImage from "../../../../assets/Masking.png";
import WrapTextImage from "../../../../assets/wrap-text.png";
import LocationLogo from "../../../../assets/profile/location.png"
import MailLogo from "../../../../assets/profile/mail.png"
import PhoneLogo from "../../../../assets/profile/phone.png"
import { AppContext } from "../../../../App";

const Profile = () => {
  const {user, userManager }= useContext(AppContext)
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
      <main style={{padding: "40px 55px"}}>
        {/* <Switch>
          <Route path={[`${match.path}/list`]} component={View} />
        </Switch> */}
        <div className="w-100 d-flex align-items-center" style={{gap: 40}}>
            <div className="d-flex align-items-center" style={{gap: 20}}>
                <img src={LocationLogo} alt="" />
                <div style={{fontSize: 18, fontWeight: 600, color: "#303972"}}>{user.address}</div>
            </div>
            {/*  */}
            <div className="d-flex align-items-center" style={{gap: 20}}>
                <img src={PhoneLogo} alt="" />
                <div style={{fontSize: 18, fontWeight: 600, color: "#303972"}}>{user.phone}</div>
            </div>
            {/*  */}
            <div className="d-flex align-items-center" style={{gap: 20}}>
                <img src={MailLogo} alt="" />
                <div style={{fontSize: 18, fontWeight: 600, color: "#303972"}}>{user.email}</div>
            </div>
        </div>
        <br />
        <br />
        <div className="d-block pl-4 pt-4">
            <div className="d-flex">
                <div style={{width: 140, fontSize: 22, fontWeight: 600, color: "#303972"}}>Chức vụ:</div>
                <div style={{fontSize: 22, fontWeight: 600}}>{user.role}</div>
            </div>
            <br />
            <div className="d-flex">
                <div style={{width: 140, fontSize: 22, fontWeight: 600, color: "#303972"}}>Họ và tên:</div>
                <div style={{fontSize: 22, fontWeight: 600}}>{user.firstName} {user.lastName}</div>
            </div>
            <br />
            {user.role=== "employee" && userManager &&
              <div className="d-flex">
                  <div style={{width: 140, fontSize: 22, fontWeight: 600, color: "#303972"}}>Người quản lý:</div>
                  <div style={{fontSize: 22, fontWeight: 600}}>{userManager.firstName}</div>
              </div>
            }
        </div>
      </main>
    </div>
  );
};

export default Profile;
