import service from "@/utils/request";
export function wechatCode() {
  return service({
    url: `/oauth/getWxCode`,
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
