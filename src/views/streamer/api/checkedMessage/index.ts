import service from "@/utils/request";
export function uploadCheckmessage(name:any,carnum:any,fileList:[]) {
    let fileSend=[]
    fileList.forEach((f)=>{
        fileSend.push(JSON.stringify(f))
    })
    console.log(JSON.stringify(fileSend),'aaaaaa');
    console.log(name,carnum);
    
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