import React from "react";
import MaskingImage from "../../../../assets/Masking.png";
import BannerImage from "../../../../assets/banner.png";
import WrapTextImage from "../../../../assets/wrap-text.png";

const Index = () => {
  return (
    <div id="layoutSidenav_content">
      <div style={{ width: "100%", position: "relative"}}>
        <img
            draggable={false}
            style={{
                background: "#4d44b5",
                height: 150,
                objectFit: "cover",
                width: "100%",
            }}
            src={MaskingImage}
            alt="Masking"
        />
        {/* <div
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
            {"Trang chủ"}
          </div>
        </div> */}
      </div>
      <main style={{height: "calc(100vh - 150px)"}}>
        <img draggable={false} className="wrap-image-banner-home" src={BannerImage} style={{width: '100%', height: "100%"}} />
      </main>
    </div>
  );
};

export default Index;
