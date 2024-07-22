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
function padZero(num) {
  return num < 10 ? '0' + num : num;
}
export function changeUsermessages(userid:any,nickname:string,sex:string,birthday,intr,avatar) {
  const isInvalidFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(birthday);
    
  let newdate = birthday; // 默认不转换日期
 if(!isInvalidFormat){
  const date = new Date(birthday);
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  newdate= `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 }
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