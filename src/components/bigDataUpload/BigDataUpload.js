import axios from "axios";
import missionList from "./missionList";
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
    console.log(this.missionList);
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
      {
        headers: {
          AccessToken:
            "$2y$10$X/z68sczoDwxIV5ipEE4Z.OlYduvZte.a.kXXlv0rg0eDic1e81Aa",
        },
      }
    );
    if (data) {
      const { id, uploadKey } = data.data;
      awaitList[0].id = id;
      awaitList[0].uploadKey = uploadKey;
      this.missionList.setStorageList();
    }
  }
}
const bigDataUpload = (api) => new BigDataUpload(api);
export default bigDataUpload;
