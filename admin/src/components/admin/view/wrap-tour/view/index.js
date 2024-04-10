import React from "react";
import { useHistory } from "react-router-dom";

const View = () => {
  const id = 12;
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
                handleClick("/admin/t/1/list");
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
                Tour daily
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/t/2/list");
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
                Tour miền bắc
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50
            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/t/3/list");
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
                Tour miền trung
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/t/4/list");
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
                Tour miền nam
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 50,
              marginTop: 50

            }}
          >
            <div
              onClick={() => {
                handleClick("/admin/t/5/list");
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
               Tour tây nguyên
              </div>
            </div>
            <div
              onClick={() => {
                handleClick("/admin/t/6/list");
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
               Tour biển đảo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
