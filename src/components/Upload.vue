<template>
  <div>
    <input
      type="file"
      multiple
      @change="handleChange"
    />
    <div class="file-list">
      <div
        class="file-item"
        v-for="(val, idx) in fileList"
        :key="idx"
      >
        <div class="file-name">{{ val.name }}</div>
        <div class="file-size">{{ val.size }}</div>
        <div class="file-type">{{ val.type }}</div>
      </div>
    </div>
    <button>上傳</button>
  </div>
</template>

<script>
import missionList from "./bigDataUpload/missionList";
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      missionList: new missionList({
        auth_id: 969,
        stp_id: "A6.1",
        proj_id: "1069",
        code_type: "A-SE-",
        fileTo: "STP_IMPORT",
      }),
    };
  },
  methods: {
    handleChange(e) {
      this.fileList = e.target.files;
      this.missionList.createAwaitList(this.fileList);
      this.missionList.setStorageList();
    },
  },
};
</script>

<style scoped lang="scss">
.file-list {
  .file-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    min-width: 500px;
    max-width: 1200px;
    min-height: 60px;
    margin: 0 auto;
    border: 1px solid #aaa;
    border-radius: 5px;
    .file-name {
      width: 50%;
    }
    .file-size,
    .file-type {
      width: 15%;
    }
  }
}
</style>
