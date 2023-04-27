<template>
  <div class="editor-container">
    <div class="tool-bar">
      <select @input="inputFontSize">
        <template v-for="val in fontSizeObj">
          <option
            :value="val.value"
            :selected="val.title === '內文'"
          >
            {{ val.title }}
          </option>
        </template>
      </select>
      <button @click="(e) => applyStyle(e, 'strong')">
        <strong>B</strong>
      </button>
      <button @click="(e) => applyStyle(e, 'i')"><i>I</i></button>
      <button @click="(e) => applyStyle(e, 'u')"><u>U</u></button>
      <button @click="(e) => applyStyle(e, 's')"><s>S</s></button>
      <button @click="importImgBlock">插入圖片</button>
    </div>
    <div
      ref="editor"
      class="editor"
      contenteditable="true"
      @input="inputContent"
      @focus="focusDetect"
      @blur="blurDetect"
    ></div>
    <image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="previewSrcList"
    />
  </div>
</template>

<script>
import ImageViewer from "../../node_modules/element-ui/packages/image/src/image-viewer";
import { createImgBlock } from "./imageBlock";

let prevOverflow = "";

export default {
  name: "Editor",
  components: { ImageViewer },
  data() {
    return {
      text: "",
      focus: false,
      selection: null,
      range: null,
      fontSize: "20px",
      fontSizeObj: [
        { title: "大標題", value: "28px" },
        { title: "標題", value: "26px" },
        { title: "小標題", value: "22px" },
        { title: "內文", value: "20px" },
      ],
      firstLineCreate: false,
      showViewer: false,
      src: "https://raw.githubusercontent.com/vic0627/cgd103_g5/orgdev/src/assets/images/About/dog.jpg",
      previewSrcList: [
        "https://raw.githubusercontent.com/vic0627/cgd103_g5/orgdev/src/assets/images/About/dog.jpg",
      ],
    };
  },
  mounted() {
    this.selection = window.getSelection();
    this.range = document.createRange();
  },
  watch: {
    text(n) {
      // console.log(n);
    },
  },
  methods: {
    inputContent(e) {
      console.log(e.target.innerHTML);
      const el = this.$refs.editor;
      this.firstLineCreate = !this.text.startsWith("<") && el.innerHTML !== "";
      if (this.firstLineCreate) {
        const div = document.createElement("div");
        div.style.fontSize = this.fontSize;
        div.appendChild(el.childNodes[0]);
        el.appendChild(div);
        this.selection.modify("move", "forward", "character");
      }

      this.text = el.innerHTML;

      el.childNodes.forEach((e) => {
        if (!e.classList.contains("block")) e.classList.add("block");
      });
    },
    focusDetect() {
      this.focus = true;
    },
    blurDetect() {
      this.focus = false;
    },
    applyStyle(e, tag) {
      const el = e.target;
      const carcet = this.selection.focusNode;
      let isSelected;
      if (el.classList.contains("selected")) {
        el.classList.remove("selected");
        isSelected = false;
      } else {
        el.classList.add("selected");
        isSelected = true;
      }
      if (!carcet) return;
      const range = this.selection.getRangeAt(0);
      const selectedText = range.extractContents();
      const span = this.create(tag);
      span.appendChild(selectedText);
      range.insertNode(span);
    },
    create(tag = "span") {
      return document.createElement(tag);
    },
    inputFontSize(e) {
      // console.log(this.selection.focusNode.parentNode); // carset 位置的父層，暫訂須指向 block。
      this.fontSize = e.target.value;
      const carcet = this.selection.focusNode;
      let targetNode;
      if (carcet) {
        targetNode = carcet.parentNode;
        while (!targetNode.classList.contains("block")) {
          targetNode = targetNode.parentNode;
        }
        targetNode.style.fontSize = this.fontSize;
      }
    },
    importImgBlock() {
      const { block, imgWrap } = createImgBlock();
      block.addTo(this.$refs.editor);
      imgWrap.on([{ type: "click", handler: this.clickHandler }]);
      this.text = this.$refs.editor.innerHTML;
      const emptyNode = this.create("div");
      emptyNode.innerHTML = "&nbsp;";
      emptyNode.style.fontSize = this.fontSize;
      block.el.insertAdjacentElement("afterend", emptyNode);
    },
    clickHandler() {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = prevOverflow;
      this.showViewer = false;
    },
  },
  updated() {},
};
</script>

<style scoped lang="scss">
.editor-container {
  .tool-bar {
    margin: 20px 0;
    .selected {
      color: red;
    }
  }
  .editor:host {
    max-width: 1200px;
    min-height: 60px;
    margin: 0 auto;
    .block {
      // font-size: 20px;
      color: red;
    }
  }
}
[contenteditable="true"] {
  outline: none;
  caret-color: #000;
}
div.block.img-block {
  max-width: 1200px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  border: 1px solid gray;
  border-radius: 4px;
  .img {
    width: 350px;
    height: 237px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .text {
    width: 746px;
  }
}
</style>
