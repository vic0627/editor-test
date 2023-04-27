import Quill from "quill";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ align: "" }, { align: "center" }, { align: "right" }],
  [{ indent: "-1" }, { indent: "+1" }],
];

export const quillInit = (toolbarOptions) =>
  new Quill("#editor", {
    modules: {
      toolbar: toolbarOptions,
      history: {
        delay: 2000,
        maxStack: 10,
      },
    },
    theme: "snow",
  });

export const targetBlockInit = () => [
  {
    id: "ql-undo",
    text: "復原",
  },
  {
    id: "ql-redo",
    text: "取消復原",
  },
  {
    id: "ql-bold",
    text: "粗體",
  },
  {
    id: "ql-italic",
    text: "斜體",
  },
  {
    id: "ql-underline",
    text: "底線",
  },
  {
    id: "ql-strike",
    text: "刪除線",
  },
  {
    id: "ql-list-check",
    text: "核取列表",
  },
  {
    id: "ql-list-bullet",
    text: "項目符號列表",
  },
  {
    id: "ql-list-ordered",
    text: "編號列表",
  },
  {
    id: "ql-align",
    text: "靠左對齊",
  },
  {
    id: "ql-align-center",
    text: "置中對齊",
  },
  {
    id: "ql-align-right",
    text: "靠右對齊",
  },
  {
    id: "ql-indent-decrease",
    text: "縮排",
  },
  {
    id: "ql-indent-increase",
    text: "增排",
  },
  {
    id: "ql-image-import",
    text: "圖片上傳類型格式為JPG、PNG、GIF、SVG、TIFF、TIF ",
  },
];
