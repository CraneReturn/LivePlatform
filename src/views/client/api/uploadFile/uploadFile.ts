import service from "@/utils/request";
export function uploadFileonce(file: any, chunk: any, md5: any, total: any) {
  console.log(file, chunk, md5, total);


  return service({
    url: `/video/uploadSlice?chunk=${chunk}&md5=${md5}&total=${total}`,
    headers: {
      isToken: true,
      'Content-Type': 'multipart/form-data'
    },
    method: 'post',
    data: file
  })
}
export function mergerFiles(fileName, md5) {
  return service({
    url: `/video/uploadVideoMerge?fileName=${fileName}&md5=${md5}`,
    headers: {
      isToken: true,
    },
    method: 'post',
  })
}
