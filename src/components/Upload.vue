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
    <button @click="handleClick">上傳</button>
  </div>
</template>

<script>
export default {
  name: "Upload",
  data() {
    return {
      fileList: [],
      uploadFile: null,
    };
  },
  created() {
    this.uploadFile = this.$bigdataUpload.setUploadMission({
      missionInfo: {
        auth_id: 969,
        stp_id: "A6.1",
        proj_id: "206",
        code_type: "A-SB-",
        fileTo: "STP_IMPORT",
      },
      sliceInfo: {
        sliceSize: 1,
        sliceUnit: "MB",
      },
    });
  },
  methods: {
    handleChange(e) {
      this.fileList = e.target.files;
    },
    handleClick() {
      this.uploadFile.missionList.createAwaitList(this.fileList);
      this.uploadFile.missionList.mergeStorageList();
      this.uploadFile.startUpload();
      // return this.uploadFile.getUploadKey();
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
