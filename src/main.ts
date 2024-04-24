import "@/styles/main.css";
import "animate.css";
import "@/styles/variables.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// @ts-ignore
import lang from "element-plus/es/locale/lang/zh-cn";
import "dayjs/locale/zh-cn";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus, { locale: lang }).mount("#app");

export {};
