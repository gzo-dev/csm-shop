import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import { API_URL } from "../config";
import "quill-image-uploader/dist/quill.imageUploader.min.css";
import _ from "lodash";
import OutsideClickHandler from "react-outside-click-handler";

// Custom Blots for table (you already have this part)
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

  // Function to insert table (you already have this part)
  const insertTable = () => {
    const quill = editorRef.current.getEditor();
    const range = quill.getSelection();

    quill.insertEmbed(range.index, "table", true, "user");
    quill.insertEmbed(range.index + 1, "tr", true, "user");
    quill.insertEmbed(range.index + 2, "td", true, "user");
    quill.insertEmbed(range.index + 3, "td", true, "user");
    quill.insertEmbed(range.index + 4, "tr", true, "user");
    quill.insertEmbed(range.index + 5, "td", true, "user");
    quill.insertEmbed(range.index + 6, "td", true, "user");
  };

  // Function to generate IDs for headers
  const generateId = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  // Function to insert Table of Contents
  const insertTOC = () => {
    const quill = editorRef.current.getEditor();
    const content = quill.getContents();
    const headers = [];
    
    content.ops.forEach((op, index) => {
      if (op.attributes && op.attributes.header) {
        const headerText = op.insert.trim();
        const id = generateId(headerText);
        headers.push({ id, text: headerText });
        
        // Add ID to the header
        quill.formatText(index, op.insert.length, 'headerId', id);
      }
    });

    // Generate TOC HTML
    const tocHtml = `
      <div class="table-of-contents">
        <h2>Mục lục</h2>
        <ul>
          ${headers.map(header => `<li><a href="#${header.id}">${header.text}</a></li>`).join('')}
        </ul>
      </div>
    `;

    // Insert TOC at the current selection
    quill.clipboard.dangerouslyPasteHTML(quill.getSelection().index, tocHtml);
  };

  useEffect(() => {
    const quill = editorRef.current.getEditor();
    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('table', insertTable);
    toolbar.addHandler('toc', insertTOC); // Add handler for Table of Contents button
  }, []);

  return (
    <OutsideClickHandler
      onOutsideClick={() => handleContentChange(content)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.tagName === "IMG") {
            const newAltText = prompt(
              "Nhập alt text cho hình ảnh của bạn:",
              e.target.alt || ""
            );
            e.target.setAttribute("alt", newAltText || "");
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
        />
      </div>
    </OutsideClickHandler>
  );
};

RichTextEditor.modules = {
  clipboard: { matchVisual: false },
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
      ["table", "toc"], // Add table and Table of Contents buttons
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
  "align", "background", "blockquote", "bullet", "color", "code", "code-block",
  "clean", "direction", "font", "header", "italic", "indent", "image", "list", 
  "link", "size", "strike", "script", "underline", "video", "bold", "table", 
  "tr", "td", "headerId", // Add 'headerId' format to keep track of header IDs
];

RichTextEditor.propTypes = {
  placeholder: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

export default memo(RichTextEditor);
