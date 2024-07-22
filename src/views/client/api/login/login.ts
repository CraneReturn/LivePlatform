import service from "@/utils/request";
export function wechatCode() {
  return service({
    url: `/oauth/getWxCode`,
    headers: {
      isToken: false,
    },
    method: "get",
  });
}
export function getToken(key: String) {
  return service({
    url: "/oauth/getToken",
    params: { key },
    headers: {
      isToken: false,
    },
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
    headers: {
      isToken: false,
    },
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
    headers: {
      isToken: false,
    },
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
    headers: {
      isToken: false,
    },
    params,
    method: "post",
  });
}
// 获取用户信息
export function getuserInfo() {
  return service({
    url: "/user/getUserInfo",
    params: {},
    method: "get",
  });
}
// 修改用户密码
export function uploadPassword(obj: object) {
  let data = {
    email: "",
    password: "",
    verifyCode: "",
  };
  data = { ...data, ...obj };
  return service({
    url: "/user/uploadPassword",
    data: data,
    method: "post",
  });
}
