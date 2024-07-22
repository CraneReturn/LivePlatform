import service from "@/utils/request";
export function getUsermessages() {
  return service({
    url: `/user/getUserInfo`,
    headers: {
      isToken: true
    },
    method: 'get',
  })
}
export function changeUsermessages(userid:any,nickname:string,sex:string,birthday,intr,avatar) {
    const date = new Date(birthday);
    const newdate=date.toISOString();  
    return service({
      url: `/user/update`,
      headers: {
        isToken: true
      },
      data:{
        nickname,
        birthday:newdate,
        intr,
        sex,
        avatar,
        userId:userid
        
      },
      method: 'put',
    })
  }