import React from "react";
import { useHistory } from "react-router-dom";

const View = () => {
  const history = useHistory();
  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <div className="container-view-realestate" style={{ width: "100%" }}>
      <div
        style={{ width: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/1/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Cẩm nang du lịch
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/b/2/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Năng lực minh khang
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
                        <div
              onClick={() => {
                handleClick("/admin/b/13/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Vé tàu lửa
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/b/4/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Tư tưởng cốt lõi
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/5/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Tuyển dụng
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/b/6/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Hoạt động nội bộ
              </div>
            </div>
            {/*  */}

            {/*  */}
            {/*  */}
          </div>
          {/*  */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/7/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Quản lý căn hộ
              </div>
            </div>

            <div
              onClick={() => {
                handleClick("/admin/b/8/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Quản lý khách sạn
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/9/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Quản lý văn phòng
              </div>
            </div>
            {/*  */}
            {/*  */}
            <div
              onClick={() => {
                handleClick("/admin/b/10/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Tư vấn đầu tư
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/11/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Nhân sự
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/b/12/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Vé máy bay
              </div>
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50,
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/b/13/list");
              }}
              className="d-flex justify-content-center align-items-center"
              style={{
                padding: "20px 0px",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                width: 350,
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  color: "#F37335",
                  fontSize: 24,
                  fontWeight: 600,
                  textAlign: "center",
                  textTransform: "uppercase",
                }}
              >
                Vé tàu lửa
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default View;
