import service from "@/utils/request";
export function uploadFileonce(file: any, chunk: any, md5: any, total: any) {
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
export function mergerFiles(fileName: any, md5: any) {
  console.log('1000');
  
  return service({
    url: `/video/uploadVideoMerge?fileName=${fileName}&md5=${md5}`,
    headers: {
      isToken: true,
    },
    method: 'post',
  })
}
export function getrestStarIndexArr(md5: any) {
  console.log(md5);

  return service({
    url: `/video/getNoUp?md5=${md5}`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })
}
//获取一级分类
export function getOneSort() {
  return service({
    url: `/video/getOnSort`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })
}
//获取二级分类
export function getTwoType(id: any){
    return service({
      url: `/video/getTwo?sortId=${id}`,
      headers: {
        isToken: true,
      },
      method: 'get',
    })
  
}