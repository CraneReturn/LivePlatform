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

// 用户邮箱注册
export function register(obj: object) {
  let params = {
    code: "",
    email: "",
    password: "",
  };
  params = { ...params, ...obj };
  return service({
    url: "/user/register",
    params: params,
    method: "post",
  });
}
// 获取邮箱验证码
export function getCode(obj: object) {
  let params = {
    code: "",
    email: "",
    password: "",
  };
  params = { ...params, ...obj };
  return service({
    url: "/user/getCode",
    params: params,
    method: "post",
  });
}
// 用户邮箱登录
export function login(obj: object) {
  let params = {
    phone: "",
    email: "",
    password: "",
  };
  params = { ...params, ...obj };
  return service({
    url: "/user/login",
    params: params,
    method: "post",
  });
}
