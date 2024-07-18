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
  let data = {
    code: "",
    email: "",
    password: "",
  };
  data = { ...data, ...obj };
  return service({
    url: "/user/register",
    data: data,
    method: "post",
  });
}
// 获取邮箱验证码
export function getCode(obj: object) {
  let data = {
    email: "",
    type: "register",
  };
  data = { ...data, ...obj };
  return service({
    url: "/user/getCode",
    data: data,
    method: "post",
  });
}
// 用户邮箱登录
export function login(obj: object) {
  let data = {
    phone: "",
    email: "",
    password: "",
  };
  data = { ...data, ...obj };
  return service({
    url: "/user/login",
    data: data,
    method: "post",
  });
}
