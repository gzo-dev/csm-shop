import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import List from "./list";
import Createproduct from "./new-add";
import Edit from "./edit";
import Uploadphoto from "./product-slider";
import MaskingImage from "../../../../assets/Masking.png";
import WrapTextImage from "../../../../assets/wrap-text.png";
import { useParams, useLocation } from "react-router-dom";

const Product = () => {
  const { id, subid } = useParams();
  const location= useLocation()
  const match = useRouteMatch();

  useEffect(() => {
    // Your componentDidMount logic here
    return () => {
      // Your componentWillUnmount logic here
    };
  }, []);

  const renderType = (type, path, id) => {
    if(path== "/admin/product/create")  {
      return "Thêm sản phẩm"
    }
    else if(path== "/admin/product/edit") {
      return "Cập nhật sản phẩm"
    }
    if(id== 13) {
      switch (type) {
        case 19:
          return "Nhà nguyên căn";
          break;
        case 20:
          return "Căn hộ phòng cho thuê";
          break;
        case 21:
          return "Mặt bằng";
          break;
        case 22:
          return "Cho thuê văn phòng";
          break;
        default:
          break;
      }
    }
    if(id== 12) {
      switch (type) {
        case 16:
          return "Đặt phòng khách sạn";
          break;
        case 17:
          return "Đặt phòng villa";
          break;
        case 18:
          return "Đặt phòng homestay";
          break;
        default:
          break;
      }
    }
  };

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
            {renderType(parseInt(subid), location.pathname, id)}
          </div>
        </div>
      </div>
      <main>
        <Switch>
          <Route path={[`${match.path}/list`]} component={List} />
          <Route path={`${match.path}/edit`} component={Edit} />
          <Route path={[`${match.path}/create`]} component={Createproduct} />
          <Route path={[`${match.path}/more-photo`]} component={Uploadphoto} />
        </Switch>
      </main>
    </div>
  );
};

export default Product;
