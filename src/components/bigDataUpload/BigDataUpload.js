import axios from "axios";
import missionList from "./missionList";
const headers = {
  headers: {
    AccessToken: "$2y$10$yEuocz6tuNTkqEPniEm6puzycUUxWntMZgBSEBvqQBzW.qIVPQo4W",
  },
};
class BigDataUpload {
  constructor(api) {
    // API's
    this.api = api ?? {};
    this.api.uploadKey = api.uploadKey ?? "/api/uploadKey";
    this.api.upload = api.upload ?? "/api/Upload";
    this.api.uploadMerge = api.uploadMerge ?? "/api/UploadMerge";

    this.missionList = null;
  }
  setUploadMission({ missionInfo, sliceInfo }) {
    this.missionList = new missionList(missionInfo, sliceInfo);
    return this;
  }
  async getUploadKey() {
    const { auth_id, stp_id, proj_id, code_type, fileTo, awaitList } =
      this.missionList;
    const { fileName, fileSplitCount, fileTotalSize } = awaitList[0];
    const { data } = await axios.post(
      this.api.uploadKey,
      {
        auth_id,
        stp_id,
        proj_id,
        code_type,
        fileTo,
        fileName,
        fileSplitCount,
        fileTotalSize,
      },
      headers
    );
    const { id, uploadKey } = data.data;
    awaitList[0].id = id;
    awaitList[0].uploadKey = uploadKey;
    this.missionList.setStorageList();
  }
  async uploadMission() {
    const { awaitList, lastChunk } = this.missionList;
    const {
      fileName,
      fileTotalSize,
      fileSplitCount,
      id,
      uploadKey,
      chunks,
      completedList,
    } = awaitList[0];
    for (let i = 0; i < chunks.length; i++) {
      if (completedList[i]) continue;
      const { theFile, chunk_id } = chunks[i];
      const fd = new FormData();
      fd.append("fileName", fileName);
      fd.append("fileTotalSize", fileTotalSize);
      fd.append("fileSplitCount", fileSplitCount);
      fd.append("id", id);
      fd.append("uploadKey", uploadKey);
      fd.append("theFile", theFile);
      fd.append("index", chunk_id);
      const ilc = lastChunk(completedList) === i ? true : false;
      fd.append("isLastChunk", ilc);
      const res = await axios.post(this.api.upload, fd, headers);
      if (res.status === 200) {
        completedList[i] = true;
        this.missionList.setStorageList();
      } else {
        alert("錯誤中斷" + res.status);
        return;
      }
    }
  }
  async uploadMerge() {
    const { auth_id, stp_id, proj_id, code_type, fileTo, awaitList } =
      this.missionList;
    const { fileName, fileTotalSize, id, completedList, uploadKey } =
      awaitList[0];
    if (completedList.every((stat) => stat)) {
      const mergeRequest = await axios.post(
        this.api.uploadMerge,
        {
          id,
          fileName,
          fileTotalSize,
          uploadKey,
          auth_id,
          stp_id,
          proj_id,
          code_type,
          fileTo,
        },
        headers
      );
      if (mergeRequest.status === 201) {
        awaitList.shift();
        this.missionList.setStorageList();
        return true;
      } else {
        return false;
      }
    }
  }
  async startUpload() {
    const { awaitList } = this.missionList;
    try {
      while (awaitList.length) {
        await this.getUploadKey();
        await this.uploadMission();
        const fin = await this.uploadMerge();
        if (!fin) break;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
const bigDataUpload = (api) => new BigDataUpload(api);
export default bigDataUpload;
