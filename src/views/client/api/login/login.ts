import service from "@/utils/request";
export function wechatCode() {
  return service({
    url: `/oauth/getWxcode`,
    method: "get",
  });
}
export function getToken(key: String) {
  return service({
    url: "/oauth/getToken",
    params: { key },
    method: "get",
  });
}
