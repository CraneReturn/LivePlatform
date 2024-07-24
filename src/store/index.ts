// store.ts
import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(persist);

export * from "./chat/chat";
export * from "./user";
export * from "./video/videoUpload";
export * from "./getter";

export default pinia;
