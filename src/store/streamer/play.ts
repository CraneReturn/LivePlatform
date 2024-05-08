import { defineStore } from "pinia";
// 创造全局事件用于存储直播的信息
export type PiniaStream = {
  muted: boolean;
  volume: number;
  playing: boolean;
};

export const useStreamerStore = defineStore("streamer", {
  state: (): PiniaStream => {
    return {
      muted: true,
      volume: 50,
      playing: false,
    };
  },
  actions: {
    setMuted(res: PiniaStream["muted"]) {
      this.muted = res;
    },
    setPlay(res: PiniaStream["playing"]) {
      this.playing = res;
    },
    setVolume(res: PiniaStream["volume"]) {
      this.volume = res;
    },
  },
});
