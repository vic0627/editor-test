# 上傳任務清單結構

有 "*" 不進 localStorage

missionList: {}
|__ auth_id: number = 人
|__ proj_id: string = 標案編號
|__ stp_id: string = 流程編號
|__ code_type: string = 品管編碼
|__ fileTo: string = 主要儲存上傳檔案資訊的表
|__ awaitList: object[] = 等待上傳清單
    |__ mission: {}

mission: {}
|__ fileName: string = 檔名
|__ fileSplitCount: number = 分割檔數量
|__ fileTotalSize: number = 檔案總大小（byte）
|__ id: number = 流水號
|__ uploadKey: string = 上傳憑證
|__ completedList: boolean[].length === fileSplitCount = 完成上傳清單
|__ *chunks: object[] = 分割檔們
    |__ chunk: {}

chunk: {}
|__ theFile: Blob = Blob 檔案
|__ isLastChunk: boolean = 為最後一個分割檔
|__ index: number = 分割檔索引值
