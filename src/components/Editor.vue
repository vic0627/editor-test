<template>
  <div class="quillWrapper">
    <div
      class="ql-toolbar"
      ref="qlToolbar"
      @mouseover="tooltipHandler"
      @mouseleave="visible = 0"
    >
      <span class="ql-formats">
        <button
          class="ql-undo"
          id="ql-undo"
          @click="historyHandler('undo')"
        >
          <UndoSvg :disable="undoDisable" />
        </button>
        <button
          class="ql-redo"
          id="ql-redo"
          @click="historyHandler('redo')"
        >
          <RedoSvg :disable="redoDisable" />
        </button>
      </span>
      <span class="ql-formats">
        <select class="ql-header">
          <option value="1">
            <strong>大標題</strong>
          </option>
          <option value="2"><strong>標題</strong></option>
          <option value="2"><strong>子標題</strong></option>
          <option selected>內文</option>
        </select>
      </span>
      <span class="ql-formats">
        <button
          class="ql-bold"
          id="ql-bold"
        ></button>
        <button
          class="ql-italic"
          id="ql-italic"
        ></button>
        <button
          class="ql-underline"
          id="ql-underline"
        ></button>
        <button
          class="ql-strike"
          id="ql-strike"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-list"
          value="check"
          id="ql-list-check"
        ></button>
        <button
          class="ql-list"
          value="bullet"
          id="ql-list-bullet"
        ></button>
        <button
          class="ql-list"
          value="ordered"
          id="ql-list-ordered"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-align"
          value=""
          id="ql-align"
        ></button>
        <button
          class="ql-align"
          value="center"
          id="ql-align-center"
        ></button>
        <button
          class="ql-align"
          value="right"
          id="ql-align-right"
        ></button>
        <button
          class="ql-indent"
          value="-1"
          id="ql-indent-decrease"
        ></button>
        <button
          class="ql-indent"
          value="+1"
          id="ql-indent-increase"
        ></button>
      </span>
      <span class="ql-formats">
        <button
          class="ql-image-import"
          id="ql-image-import"
          @click="imageInputTrigger"
        >
          <ImageSvg />
        </button>
      </span>
    </div>
    <div
      id="editor"
      @click="clickHandler"
    >
      <h1>標題</h1>
      <p>開始書寫</p>
    </div>
    <image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="previewSrcList"
    />
    <Tooltip
      :visible="visible"
      :position="position"
      >{{ tooltipContent }}</Tooltip
    >
    <input
      ref="imageInput"
      style="display: none"
      type="file"
      accept="image/*"
      @change="imageInputChange"
    />
  </div>
</template>
<script>
import { quillInit, targetBlockInit } from "./quillEditor/quillEditor";
import { imageBlockCreate } from "./quillEditor/imageBlock";
import ImageViewer from "element-ui/packages/image/src/image-viewer.vue";
import Tooltip from "./quillEditor/Tooltip.vue";
import UndoSvg from "./quillEditor/UndoSvg.vue";
import RedoSvg from "./quillEditor/RedoSvg.vue";
import ImageSvg from "./quillEditor/ImageSvg.vue";
export default {
  name: "Editor",
  components: {
    UndoSvg,
    RedoSvg,
    ImageSvg,
    ImageViewer,
    Tooltip,
  },
  // 父層所傳的 props，存放內容。
  props: {
    html_content: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 編輯器實例
      quill: null,
      // 編輯器容器
      ql_editor: null,
      // imageViewer 開關
      showViewer: false,
      // 圖片陣列
      imgBlocks: [],
      // 欲預覽之圖片
      previewSrcList: [],
      // tooltip 顯示控制
      visible: 0,
      // tooltip 文字
      tooltipContent: "",
      // tooltip 位置
      position: {
        top: 0,
        left: 0,
      },
      // tooltip 目標物
      targetBlock: targetBlockInit(),
    };
  },
  mounted() {
    // 建立 quill 實例
    this.quill = quillInit(this.$refs.qlToolbar);
    // 獲取編輯器本體
    this.ql_editor = document.querySelector(".ql-editor");
    // 編輯器掛載監聽，用 emit 將內容送上去父組件
    this.quill.on("editor-change", () =>
      this.$emit("transport-html", this.ql_editor.innerHTML)
    );
  },
  beforeDestroy() {
    this.quill.off("editor-change", () =>
      this.$emit("transport-html", this.ql_editor.innerHTML)
    );
  },
  methods: {
    // undo、redo
    historyHandler(type) {
      this.quill.history[type]();
    },
    // 事件代理去抓編輯器內的圖片，有抓到就打開 imageViewer
    clickHandler(e) {
      const src = e.target.src || e.target.firstChild.src;
      if (!src) return;
      this.previewSrcList = [src];
      document.body.style.overflow = "hidden";
      this.showViewer = true;
    },
    closeViewer() {
      document.body.style.overflow = "";
      this.showViewer = false;
    },
    // tooltip 控制
    tooltipHandler(e) {
      // 向父層遞規，有抓到 id 就往下，但 id 為 app 就直接退回來不跑迴圈(不考慮開發者在其他層使用到 id)，並關閉 tooltip
      let target = e.target;
      while (!target.id) {
        target = target.parentNode;
      }
      if (target.id === "app") return (this.visible = 0);
      // 根據目標物列判斷是否顯示 tooltip，如需顯示就同步改變顯示、內容、位置
      this.targetBlock.forEach((val) => {
        if (target.id === val.id) {
          const elementRect = target.getBoundingClientRect();
          const top = elementRect.top + target.offsetHeight + 10;
          const left = elementRect.left + target.offsetWidth / 2;
          this.visible = 1;
          this.tooltipContent = val.text;
          this.position = { top, left };
        }
      });
    },
    // 虛擬觸發 input file
    imageInputTrigger() {
      this.$refs.imageInput.click();
    },
    // input change 事件，將圖片轉為 base64 帶入到函式中
    imageInputChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        imageBlockCreate(reader.result);
      };
    },
    // 在 updated 週期調用，抓取圖片陣列，且判斷抓取的圖片是否為編輯器內的圖片
    imageRecreate() {
      const imgs = [...document.querySelectorAll(".ql-img")];
      const wildImgs = document.getElementsByTagName("img");
      for (let i = 0; i < wildImgs.length; i++) {
        const item = wildImgs.item(i);
        if (item.parentNode.parentNode.classList.contains("ql-editor"))
          imgs.push(item);
      }
      this.imgBlocks = imgs;
    },
  },
  computed: {
    // quill history API，把 undo、redo 陣列長度丟到 svg 子組件做判斷
    undoDisable() {
      if (!this.quill) return;
      const { undo } = this.quill.history.stack;
      return undo.length;
    },
    redoDisable() {
      if (!this.quill) return;
      const { redo } = this.quill.history.stack;
      return redo.length;
    },
  },
  watch: {
    // 判斷因 redo、undo 所重新插入之圖片 class 消失的狀況，重新給予 class name
    imgBlocks(n) {
      if (n.length === 0) return;
      n.forEach((el) => {
        if (!el.classList.contains("ql-img")) {
          el.classList.add("el-image__inner", "el-image__preview", "ql-img");
          el.parentNode.classList.add("img-block");
        }
      });
    },
  },
  updated() {
    this.imageRecreate();
  },
};
</script>
<style lang="scss" scoped>
@import "./quillEditor/qlEditor.scss";
</style>
