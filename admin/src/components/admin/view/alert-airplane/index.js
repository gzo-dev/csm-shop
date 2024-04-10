import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import MaskingImage from "../../../../assets/Masking.png";
import WrapTextImage from "../../../../assets/wrap-text.png";

// Tạo một custom module
var Parchment = Quill.import("parchment");
var Block = Parchment.query("block");

class Tab extends Block {
  static create(value) {
    let node = super.create();
    node.setAttribute("style", "padding-left: 1em");
    return node;
  }
}
Tab.blotName = "tab";
Tab.tagName = "span";
Quill.register(Tab);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["image", "code-block", "link"],
      [{ align: [] }],
      [{ tab: "Tab" }], // Thêm tab vào thanh công cụ
    ],
  },
};

function IndexAlertAirplane() {
  const [value, setValue] = useState("");

  const handleChange = (content, delta, source, editor) => {
    setValue(content);
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
            Thông tin cá nhân
          </div>
        </div>
      </div>
      <main style={{ padding: "40px 55px" }}>
        <div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={modules}
          />
        </div>
      </main>
    </div>
  );
}

export default IndexAlertAirplane;
