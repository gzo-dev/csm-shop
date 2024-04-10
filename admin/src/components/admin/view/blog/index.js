import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import List from "./list";
import Create from "./create";
import Edit from "./edit";
import MaskingImage from "../../../../assets/Masking.png";
import WrapTextImage from "../../../../assets/wrap-text.png";
import { useLocation } from "react-router-dom";

const Blogs = () => {
  const match = useRouteMatch();
  const location = useLocation();
  const [title, setTitle] = useState();
  useEffect(() => {
    if (location.pathname.split("/")[4]== "edit") {
      setTitle("Sửa blog");
    }
    if (location.pathname.split("/")[4]== "create") {
      setTitle("Thêm blog");
    } else {
      switch (parseInt(location.pathname.split("/")[3])) {
        case 1:
          setTitle("Cẩm nang du lịch");
          break;
        case 2:
          setTitle("Năng lực Minh Khang");
          break;
        case 3:
          setTitle("Đi muôn nơi");
          break;
        case 4:
          setTitle("Tư tưởng cốt lõi");
          break;
        case 5:
          setTitle("Tuyển dụng");
          break;
        case 6:
            setTitle("Hoạt động nội bộ");
            break;
        default:
            setTitle("Blog")
          break;
      }
    }
  }, [location.pathname]);

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
            {title}
          </div>
        </div>
      </div>
      <main>
        <Switch>
          <Route path={[`${match.path}/list`]} component={List} />
          <Route path={[`${match.path}/edit`]} component={Edit} />
          <Route path={[`${match.path}/create`]} component={Create} />
        </Switch>
      </main>
    </div>
  );
};

export default Blogs;
