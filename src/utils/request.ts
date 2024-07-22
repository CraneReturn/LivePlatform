import axios from "axios";
import { tansParams } from "./comment";
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";
import cache from "./cache";
import { getToken } from "./auth";
const baseApiUrl = import.meta.env.VITE_APP_CONTEXT_PATH;
const errorCode: { [key: string]: string } = {
  "401": "认证失败，无法访问系统资源",
  "403": "当前操作没有权限",
  "404": "访问资源不存在",
  default: "系统未知错误，请反馈给管理员",
};
//重新登录
export let isRelogin = { show: false };

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: "http://47.109.85.211:8080",
  // 超时
});
service.interceptors.request.use(
  (config) => {
    //是否需要设置token
    const isToken = (config.headers || {}).isToken === false;
    //是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (getToken() && !isToken) {
      config.headers["token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    if (
      !isRepeatSubmit &&
      (config.method === "post" || config.method === "put")
    ) {
      const requestObj = {
        url: config.url,
        data:
          typeof config.data == "object"
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = cache.session.getJSON("sessionObj");
      if (sessionObj == undefined || sessionObj == null || sessionObj == "") {
        cache.session.setJSON("sessionObj", requestObj);
      } else {
        const sessionUrl = sessionObj.url;
        const sessionData = sessionObj.data;
        const sessionTime = sessionObj.time;
        console.log(sessionUrl);

        const interval = 1000;
        if (
          sessionData === requestObj.data &&
          requestObj.time - sessionTime < interval &&
          sessionUrl == requestObj.url
        ) {
          const message = "数据正在处理 请勿重复提交";
          console.warn(`[${sessionUrl}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          cache.session.setJSON("sessionObj", requestObj);
        }
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);
service.interceptors.response.use(
  (res) => {
    const code = res.data.code || 20000;
    //获取错误信息
    const codeStr = String(code);
    const msg = errorCode[code] || res.data.errMsg || errorCode["default"];
    if (
      res.request.responseType == "blob" ||
      res.request.responseType == "arraybuffer"
    ) {
      return res.data;
    }
    if (code === 40100) {
      if (!isRelogin.show) {
        isRelogin.show = true;
        ElMessageBox.confirm(
          "登录状态已过期，您可以继续留在该页面，或者重新登录",
          "系统提示",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            isRelogin.show = false;
            // store.dispatch('LogOut').then(() => {
            //     location.href = process.env.VUE_APP_CONTEXT_PATH + "index";
            // })
            location.href = baseApiUrl;
          })
          .catch(() => {
            isRelogin.show = false;
          });
      }
    } else if (code == 51000) {
      ElMessage({ message: msg, type: "error" });
      return Promise.reject(new Error(msg));
    } else if (code === 601) {
      ElMessage({ message: msg, type: "warning" });
      return Promise.reject("error");
    } else if (code == 500) {
      ElNotification({
        title: msg,
        type: "error",
      });
      return Promise.reject(`${msg}`);
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    ElMessage({ message: message, type: "error", duration: 5 * 1000 });
    return Promise.reject(error);
  }
);
export default service;
