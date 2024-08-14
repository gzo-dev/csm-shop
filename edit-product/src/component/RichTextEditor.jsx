import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { API_URL } from "../config";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import _ from "lodash";
import OutsideClickHandler from "react-outside-click-handler";

const BlockEmbed = Quill.import("blots/block/embed");

class TableBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("contenteditable", false);
    return node;
  }

  static value(node) {
    return node.innerHTML;
  }
}
TableBlot.blotName = "table";
TableBlot.tagName = "table";

class TableRowBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("contenteditable", false);
    return node;
  }

  static value(node) {
    return node.innerHTML;
  }
}
TableRowBlot.blotName = "tr";
TableRowBlot.tagName = "tr";

class TableCellBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute("contenteditable", true);
    return node;
  }

  static value(node) {
    return node.innerHTML;
  }
}
TableCellBlot.blotName = "td";
TableCellBlot.tagName = "td";

Quill.register(TableBlot);
Quill.register(TableRowBlot);
Quill.register(TableCellBlot);
Quill.register("modules/imageUploader", ImageUploader);

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["mirza", "roboto", "sans-serif", "system-ui"];
ReactQuill.Quill.register(Font, true);

const RichTextEditor = ({ content, placeholder, handleContentChange }) => {
  const editorRef = useRef();
  const insertTable = () => {
    const quill = editorRef.current.getEditor();
    const table = quill.getModule("table");
    const range = quill.getSelection();

    quill.insertEmbed(range.index, "table", true, "user");
    quill.insertEmbed(range.index + 1, "tr", true, "user");
    quill.insertEmbed(range.index + 2, "td", true, "user");
    quill.insertEmbed(range.index + 3, "td", true, "user");
    quill.insertEmbed(range.index + 4, "tr", true, "user");
    quill.insertEmbed(range.index + 5, "td", true, "user");
    quill.insertEmbed(range.index + 6, "td", true, "user");
  };

  useEffect(() => {
    const toolbar = editorRef.current.getEditor().getModule('toolbar');
    toolbar.addHandler('table', insertTable);
  }, []);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        handleContentChange(content);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.tagName === "IMG") {
            console.log(e.target.tagName);
            console.log(e.target.src);
            const newAltText = prompt(
              "Nhập alt text cho hình ảnh của bạn:",
              e.target.alt || ""
            );
            // const quillEditor = editorRef.current.getEditor()
            const image = e.target;
            console.log(image);
            image.setAttribute("alt", newAltText || "");
          }
        }}
      >
        <ReactQuill
          ref={editorRef}
          theme="snow"
          onChange={handleContentChange}
          value={content || ""}
          placeholder={placeholder}
          modules={RichTextEditor.modules}
          formats={RichTextEditor.formats}
          onFocus={() => {
            console.log(editorRef.current.state.value);
          }}

          // onBlur={()=> {
          //   console.log(editorState)
          // }}
        />
      </div>
    </OutsideClickHandler>
  );
};

RichTextEditor.modules = {
  clipboard: {
    matchVisual: false,
  },
  toolbar: {
    container: [
      [{ font: ["roboto", "mirza", "sans-serif", "system-ui"] }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block", "link"],
      [{ script: "sub" }, { script: "super" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["image", "video"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["clean"],
      ["table"], // Add table button
    ],
  },

  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(API_URL + "/api/v1/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            resolve(result.imageUrl);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};

RichTextEditor.formats = [
  "align",
  "background",
  "blockquote",
  "bullet",
  "color",
  "code",
  "code-block",
  "clean",
  "direction",
  "font",
  "header",
  "italic",
  "indent",
  "image",
  "list",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "video",
  "bold",
  "table",
  "tr",
  "td",
];

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default memo(RichTextEditor);
