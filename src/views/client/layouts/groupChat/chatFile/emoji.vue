<template>
  <div class="emojiConten">
    <div class="emojiContenCenter">
        <div class="topMainEmoji">
            <div class="iconListContenCenter">
                <div class="emojiContenList">
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>  <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>

                    <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>  <span class="emojiIcon">
                        {{ unicodeChange("[<U+1F609>]")}}
                    </span>
                </div>
            </div>
        </div>
        <div class="BottonMainEmojichange">
            <div class="BottonMainEmojichangebtn">
                <div class="emojiBtnChange" @click="emojiBtnChange=true" :class="{changeemojiBtnclass:emojiBtnChange}">
                    <svg t="1714987544621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14999" width="30" height="30"><path d="M512 63.488q93.184 0 174.592 35.328t142.336 95.744 96.256 142.336 35.328 174.08q0 93.184-35.328 174.592t-96.256 142.336-142.336 96.256-174.592 35.328q-92.16 0-174.08-35.328t-142.336-96.256-95.744-142.336-35.328-174.592q0-92.16 35.328-174.08t95.744-142.336 142.336-95.744 174.08-35.328zM670.72 252.928q-34.816 0-58.88 28.672t-24.064 69.632q0 41.984 24.064 70.656t58.88 28.672 58.88-28.672 24.064-70.656q0-40.96-24.064-69.632t-58.88-28.672zM253.952 446.464l192.512 0 0-63.488-192.512 0 0 63.488zM765.952 638.976q1.024-2.048 1.024-7.168t-1.536-11.264-6.144-11.264-12.8-8.192q-23.552 28.672-58.368 51.2-29.696 19.456-75.264 35.328t-107.008 15.872-104.448-15.872-72.704-35.328q-33.792-22.528-57.344-51.2-8.192 2.048-12.288 7.168t-6.144 11.264-2.048 11.264 1.024 8.192q1.024 1.024 0.512 1.536t0.512 1.536q9.216 27.648 32.768 51.712t57.344 41.984 76.288 27.648 89.6 9.728q93.184 0 160.768-33.792t92.16-89.088q0-2.048 1.024-4.096t3.072-7.168z" p-id="15000" fill="#a5daa9"></path></svg>
                </div>
                <div class="emojiBtnChange" @click="emojiBtnChange=false" :class="{changeemojiBtnclass:!emojiBtnChange}" >
                    <svg t="1714987587578" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16179" width="30" height="30"><path d="M533.504 268.288q33.792-41.984 71.68-75.776 32.768-27.648 74.24-50.176t86.528-19.456q63.488 5.12 105.984 30.208t67.584 63.488 34.304 87.04 6.144 99.84-17.92 97.792-36.864 87.04-48.64 74.752-53.248 61.952q-40.96 41.984-85.504 78.336t-84.992 62.464-73.728 41.472-51.712 15.36q-20.48 1.024-52.224-14.336t-69.632-41.472-79.872-61.952-82.944-75.776q-26.624-25.6-57.344-59.392t-57.856-74.24-46.592-87.552-21.504-100.352 11.264-99.84 39.936-83.456 65.536-61.952 88.064-35.328q24.576-5.12 49.152-1.536t48.128 12.288 45.056 22.016 40.96 27.648q45.056 33.792 86.016 80.896z" p-id="16180" fill="#a5daa9"></path></svg>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emojiBtnChange=ref<boolean>(true)
    import emojiregex from 'emoji-regex'
const fromCodePointMehod = (codes: number[]) => {
  if (!String.fromCodePoint) {
    // String.fromCodePoint方法是有兼容性问题
    String.fromCodePoint = function fromCodePoint() {
      var chars = [],
        point,
        offset,
        units,
        i;
      for (i = 0; i < arguments.length; ++i) {
        point = arguments[i];
        offset = point - 0x10000;
        units =
          point > 0xffff
            ? [0xd800 + (offset >> 10), 0xdc00 + (offset & 0x3ff)]
            : [point];
        chars.push(String.fromCharCode.apply(null, units));
      }
      return chars.join("");
    };
  }
  return String.fromCodePoint.apply(null, codes);
};
const unicodeChange = (str: String) => {
  const emojiDecodeRegex = /\[\<U+(.*?)\>\]/g;
  return str.replace(emojiDecodeRegex, (p) => {
    const filterP = p.replace(/\[\<U\+|>]/g, "");
    var codes = filterP.split("-").map(function (value, index) {
      return parseInt(value, 16);
    });
    return fromCodePointMehod(codes);
  });
};
const encodeEmoji=(str: string) =>{
      const emojiRegex =emojiregex;
      const regex = emojiRegex();
      return str.replace(regex, (p: any) => {
        let arr = []
        for (let ch of p) {
          arr.push(ch.codePointAt(0))
        }
        return `emoji(${arr.join('-')})`  // 组合emoji用-拼接传递
      });
    }
  const deCodeEmoji=(str: string)=> {
      const emojiDecodeRegex = /emoji\((.*?)\)/g;
      return str.replace(emojiDecodeRegex, (p: string) => {
        const filterP = p.replace(/emoji\(|\)/g, '');
        var codes = filterP.split('-').map(function(value: string, index: any) {
            return parseInt(value);
        });
        return fromCodePointMehod(codes)
      });
    }
</script>

<style lang="scss">
@import "@/views/client/styles/groupChat/chatFile.scss";
</style>