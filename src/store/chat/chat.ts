// src/store/index.js
import { defineStore } from "pinia";
const regx = "$ s*<U+[0-9A-Fa-f]{4}>s* $";
import unicodeChange from "../../views/client/api/chatgroup/utils";
const useMainStore = defineStore({
  id: "chat",
  state: () => ({
    emjo: [],
    nowText: "",
    groupId: 1,
    userID: [1],
    groupName: "我是群聊",
    notice: "1111",
    userId: [1, 2, 3],
    //存放选中消息状态
    checkedmessage: [],
    showCheckedflag: false,
  }),
  actions: {
    clickEmoji(text: string) {
      this.nowText += `${unicodeChange.unicodeChange(text)}`;
    },
    getTextnew() {
      const returnText = this.nowText;
      return {
        returnText,
      };
    },
  },
});
export default useMainStore;
