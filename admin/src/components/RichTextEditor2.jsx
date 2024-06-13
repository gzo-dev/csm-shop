import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill } from "react-quill";
// import "react-quill/dist/quill.snow.css";


const RichTextEditor2 = ({ content, placeholder, handleContentChange }) => {
  const [editorState, setEditorState] = useState(content);
  useEffect(()=> {
    setEditorState(content)
  }, [content])
  const handleChange = (value) => {
    setEditorState(value);
    handleContentChange(value);
  };

  return (
    <ReactQuill
      theme="snow"
      onChange={handleChange}
      value={editorState || " "}
      placeholder={placeholder}
      modules={RichTextEditor2.modules}
      formats={RichTextEditor2.formats}
    />
  );
};

RichTextEditor2.modules = {
  toolbar: [
    [{ 'font': ['sofia  ', 'times-new-roman', 'arial'] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
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
  clipboard: {
    matchVisual: true,
  },
};

RichTextEditor2.formats = [
  "font",
  "align",
  "background",
  "blockquote",
  "bullet",
  "color",
  "code",
  "code-block",
  "clean",
  "direction",
  
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
  "bold"
];

RichTextEditor2.propTypes = {
  placeholder: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default RichTextEditor2;