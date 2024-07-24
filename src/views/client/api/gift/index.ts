// 礼物的管理接口
// 增删改查
// 增加礼物种类
import service from "@/utils/request";
export function addGift() {
  return service({
    url: "/giftAdmin/addGift",
    method: "post",
  });
}
export function deleteGift() {
  return service({
    url: "/giftAdmin/deleteGift",
    method: "delete",
  });
}

export function modifyGift() {
  return service({
    url: "/giftAdmin/modifyGift",
    method: "get",
  });
}
