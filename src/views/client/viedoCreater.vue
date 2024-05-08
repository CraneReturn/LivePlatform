<template>
  <div class="viedoCreaterMain">
              {{ unicodeChange("[<U+1F609>]")}}
                {{ unicodeChange("[<U+0031-fe0f-20e3>][<U+1f469-200d-2764-fe0f-200d-1f48b-200d-1f469>]")}}
                
    <div class="viedoCreaterMainCenter">
      <keep-alive>
        <uploadNailVue />
      </keep-alive>
      <RouterView />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import uploadNailVue from "./layouts/viedoUpload/uploadNail.vue";
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
<style>
@import "@/views/client/styles/viedoUpload/viedoCreate.scss";
@import "@/styles/component/component.scss";
</style>