// src/store/index.js
import { defineStore } from "pinia";
const regx = "$ s*<U+[0-9A-Fa-f]{4}>s* $";
import unicodeChange from "../../views/client/api/chatgroup/utils";
export const useMainStore = defineStore({
  id: "chat",
  state: () => ({
    emjo: [],
    nowText: "",
  }),
  getters: {
    // 使用 state 访问状态
    getnowText():string {
      return this.nowText;
    },
  },

  actions: {
    clickEmoji(text: string) {
      console.log(unicodeChange.unicodeChange, "111");
      this.nowText += `${unicodeChange.unicodeChange(text)}`;
      console.log(this.nowText);
    },
    getTextnew() {
      const returnText = this.nowText;
      return {
        returnText,
      };
    },
  },
});
