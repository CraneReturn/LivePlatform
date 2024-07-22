// store.ts
import { createPinia } from "pinia";
import {userStore}  from "./user/index";
import { useMainStore } from "./chat/chat";
import getters  from "./getter";

const pinia = createPinia();

// 使用 pinia.use 方法注册模块和 getters
// pinia.use(userStore);
// pinia.use(useMainStore);
pinia.use(getters);

export default pinia;
