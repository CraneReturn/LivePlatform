import service from "@/utils/request";
export function uploadCheckmessage(name:any,carnum:any,fileList:[]) {
    let fileSend=[]
    fileList.forEach((f)=>{
        fileSend.push(JSON.stringify(f))
    })
  return service({
    url: `/user/auth`,
    headers: {
      isToken: true,
    },
    method: 'post',
    data: {
        cardImage: JSON.stringify(fileSend),
        idCard: carnum,
        username: name
    }
  })
}
export function getCheckState() {
  return service({
    url: `/user/getAuthInfo`,
    headers: {
      isToken: true,
    },
    method: 'get',
  })
}
export function updateChecked(name:any,carnum:any,fileList:[]) {
  let fileSend=[]
  fileList.forEach((f)=>{
      fileSend.push(JSON.stringify(f))
  })
return service({
  url: `/user/updateAuth`,
  headers: {
    isToken: true,
  },
  method: 'put',
  data: {
      cardImage: JSON.stringify(fileSend),
      idCard: carnum,
      username: name
  }
})
}