import "@/styles/main.css";
import "animate.css";
import "@/styles/variables.scss";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// @ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
const app = createApp(App);
// 创建你的 pinia 实例
const pinia = createPinia();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus, { locale: zhCn }).use(pinia).mount("#app");

export {};
