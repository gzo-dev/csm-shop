import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { API_URL } from "../config";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import _ from "lodash";
import OutsideClickHandler from "react-outside-click-handler";
Quill.register("modules/imageUploader", ImageUploader);

const Font = ReactQuill.Quill.import("formats/font");
Font.whitelist = ["mirza", "roboto", "sans-serif", "system-ui"];
ReactQuill.Quill.register(Font, true);

const RichTextEditor = ({ content, placeholder, handleContentChange }) => {
  const editorRef = useRef();

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        handleContentChange(editorRef.current.state.value);
      }}
    >
      <ReactQuill
        ref={editorRef}
        theme="snow"
        // onChange={handleChange}
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
];

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default memo(RichTextEditor);
