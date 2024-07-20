import { defineStore } from "pinia";
import { getToken, setToken } from "../../utils/auth";
import { login, register } from "@/views/client/api/login/login";
// 存储用户信息
type user = {
  token: string;
  userId: number;
  userType: string;
  userName: string;
  avatar: string;
};

export const userStore = defineStore("user", {
  state: (): user => {
    return {
      token: getToken(),
      userId: 0,
      userType: "",
      userName: "",
      avatar: "",
    };
  },
  actions: {
    // 封装login
    Login(obj: object) {
        console.log('6666');
        
      return new Promise<void>((resolve, reject) => {
        login(obj)
          .then((res) => {
            console.log(res,'4444');
            
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
      console.log(obj);
      return new Promise<void>((resolve, reject) => {
        register(obj)
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
  },
});
