import { LOCAL_GET, LOCAL_SET } from "./localStorage";
export default class missionList {
  constructor(options, sliceInfo) {
    const { auth_id, stp_id, proj_id, code_type, fileTo } = options;
    const infoNotComplete =
      !auth_id || !stp_id || !proj_id || !code_type || !fileTo;
    if (infoNotComplete)
      throw new ReferenceError("上傳資訊不完整! 請確認參數是否設置正確!");
    this.sliceSize = this.transformSliceInfo(sliceInfo);
    this.options = options;
    this.auth_id = auth_id;
    this.stp_id = stp_id;
    this.proj_id = proj_id;
    this.code_type = code_type;
    this.fileTo = fileTo;
    this.awaitList = [];
  }
  clearAwaitList() {
    this.awaitList = [];
  }
  createChunk(file, chunk_id, sliceSize) {
    if (!(file instanceof File))
      throw new TypeError("非 File 物件不可建立分割檔!");
    const ts = file.size;
    const cid = chunk_id ?? 0;
    const ss = sliceSize ?? this.sliceSize;
    const blobFrom = cid * ss;
    const blobTo = (cid + 1) * ss > ts ? ts : (cid + 1) * ss;
    return file.slice(blobFrom, blobTo);
  }
  createMission(file) {
    if (!(file instanceof File))
      throw new TypeError("非 File 物件不可建立任務!");
    const { name, size } = file;
    const fileSplitCount = Math.ceil(size / this.sliceSize);
    const createArray = (fn) => Array.from({ length: fileSplitCount }, fn);
    const mission = {
      fileName: name,
      fileTotalSize: size,
      fileSplitCount,
      id: null,
      uploadKey: null,
      completedList: createArray(() => false),
      chunks: createArray((_, i) => ({
        theFile: this.createChunk(file, i, this.sliceSize),
        isLastChunk: false,
        chunk_id: i,
      })),
    };
    this.awaitList.push(mission);
  }
  createAwaitList(fileList) {
    if (!(fileList instanceof FileList))
      throw new TypeError("非 FileList 物件不可建立任務清單!");
    this.clearAwaitList();
    for (let i = 0; i < fileList.length; i++) {
      this.createMission(fileList.item(i));
    }
  }
  createStorageList() {
    return JSON.stringify({
      auth_id: this.auth_id,
      stp_id: this.stp_id,
      proj_id: this.proj_id,
      code_type: this.code_type,
      fileTo: this.fileTo,
      awaitList: this.awaitList.map((val) => {
        const o = { ...val };
        delete o.chunks;
        return o;
      }),
    });
  }
  setStorageList() {
    LOCAL_SET("missionList", this.createStorageList());
  }
  getStorageList() {
    return JSON.parse(LOCAL_GET("missionList"));
  }
  finishUploadChunk(uploadKey, chunk_id) {
    const mission = this.awaitList.find(
      (mission) => mission.uploadKey === uploadKey
    );
    delete mission.chunks.find((chunk) => chunk.chunk_id === chunk_id);
    mission.completedList[chunk_id] = true;
    this.setStorageList();
  }
  transformSliceInfo({ sliceSize, sliceUnit = "B" }) {
    const units = ["B", "KB", "MB", "GB"];
    const n = units.findIndex((e) => e === sliceUnit);
    if (n === -1)
      throw new TypeError(
        `可使用單位為"B"、"KB"、"MB"、"GB"，請重新設定單位。`
      );
    else return sliceSize * Math.pow(1024, n);
  }
  getMission(index) {
    return this.awaitList[index];
  }
}
