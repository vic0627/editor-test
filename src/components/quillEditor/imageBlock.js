import { createDOM } from "./createDOM";

export const imageBlockCreate = (src) => {
  const editor = document.querySelector(".ql-editor");
  const { block } = createImgBlock(src);
  block.addTo(editor);
  const emptyNode = createDOM({
    tag: "p",
    innerText: "圖片說明：",
  });
  block.el.insertAdjacentElement("afterend", emptyNode.el);
};

const createImgBlock = (src = "") => {
  const blockNode = {
    tag: "p",
    attrs: {
      class: "img-block",
    },
  };
  const block = createDOM(blockNode);

  const imgNode = {
    tag: "img",
    attrs: {
      class: "el-image__inner el-image__preview ql-img",
      src,
    },
  };
  const img = createDOM(imgNode).addTo(block);

  return { block };
};
