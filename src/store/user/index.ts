import { defineStore } from "pinia";
import { getToken, removeToken, setToken } from "../../utils/auth";
import { getuserInfo, login, register } from "@/views/client/api/login/login";
import defultHead from "@/assets/images/userPhoto/defaultHead.png";
// 存储用户信息
type user = {
  token: string;
  userId: number;
  userType: string;
  userName: string;
  avatar: string;
  introduction:string
};

export const userStore = defineStore("user", {
  state: (): user => {
    return {
      token: getToken(),
      userId: 0,
      userType: "",
      userName: "",
      avatar: "",
      introduction:''
    };
  },
  actions: {
    // 封装login
    Login(obj: object) {
      console.log(obj);

      return new Promise<void>((resolve, reject) => {
        login(obj)
          .then((res) => {
            console.log(res);
            setToken(res.data);
            this.token = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    Register(obj: object) {
      return new Promise<void>((resolve, reject) => {
        register(obj)
          .then((res) => {
            setToken(res.data);
            this.token = res.data;
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    userInfo() {
      return new Promise<void>((resolve, reject) => {
        getuserInfo()
          .then((response) => {
            this.userId = response.data.userId;
            this.userName=response.data.nickname;
            this.userType=response.data.sex
            this.introduction=response.data.intr
            if (response.data.avatar) this.avatar = response.data.avatar;
            else this.avatar = defultHead;
            if (response.data.userName) this.userName = response.data.userName;
            else this.userName = "用户";
            resolve();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    Logout() {
      return new Promise(() => {
        this.token = "";
        removeToken();
      });
    },
  },
});
