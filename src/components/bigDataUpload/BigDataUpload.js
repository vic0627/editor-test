import axios from "axios";
import localStorage from "./localStorage";
const { LOCAL_GET, LOCAL_SET, LOCAL_REMOVE } = localStorage;

export default class {
  constructor(options) {
    const { uploadKey, upload, uploadMerge, sliceSize, sliceSizeUnit } =
      options;
    // API's
    this.api = {
      uploadKey: uploadKey ?? "/api/uploadKey",
      upload: upload ?? "/api/Upload",
      uploadMerge: uploadMerge ?? "/api/UploadMerge",
    };
  }
}
