<template>
  <!-- 作品描述 -->
  <div class="describe">
    <h2>开播描述</h2>
    <p class="tip">开播描述能帮助用户了解直播内容，为您带来更多流量</p>
    <div class="describeIt">
      <el-input
        v-model="title"
        maxlength="30"
        placeholder="填写直播标题"
        show-word-limit
        type="text"
        @input="changeTitle"
      />
      <div
        class="describeInput"
        contenteditable="true"
        spellcheck="false"
        aria-placeholder="添加直播简介"
        role="textbox"
        aria-multiline="true"
        ref="inputElement"
        @input="changeDescribe"
      >
        {{ content }}
      </div>
      <!-- 推荐话题 -->
      <div class="recommented">
        <div class="add">
          <button>#添加话题</button>
        </div>
        <div class="recomTip">
          <p class="intro">推荐话题</p>
          <div class="mainTip">
            <button>#推荐话题</button>
            <button>#推荐话题</button>
            <button>#推荐话题</button>
            <button>#推荐话题</button>
            <button>#推荐话题</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let title = ref("");
const content = ref<string | null>("");

let inputElement = ref<HTMLDivElement | null>(null);
import { defineEmits } from "vue";
const emit = defineEmits(["title", "label"]);
function changeTitle(value: string) {
  emit("title", value);
}
function changeDescribe() {
  if (inputElement.value) {
    inputElement.value.ariaPlaceholder = "";
    content.value = inputElement.value.textContent;
  }
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-input__inner {
    font-weight: 600;
    &::placeholder {
      letter-spacing: 1px;
      font-weight: 500;
    }
  }
  .el-textarea__inner {
    padding: 10px 11px;
    &::placeholder {
      letter-spacing: 1px;
    }
  }
}
.el-input {
  --el-input-border: transparent;
  --el-fill-color-blank: transparent;
  --el-input-hover-border-color: transparent;
  font-size: 14.5px;
  --el-input-border-color: transparent;
  --el-input-focus-border-color: transparent;
  margin-top: 10px;
}
::v-deep {
  .el-input .el-input__count {
    position: absolute;
    right: 20px;
  }
}
.describe {
  padding: 20px;
  .tip {
    font-size: 13px;
    color: #ccc;
  }
}
.describeInput {
  height: auto !important;
  margin: 10px;
  max-width: 100%;
  min-height: 129px;
  max-height: 200px;
  border-top: 1px solid #ccc;
  padding-top: 5px;
  font-size: 15px;
  line-height: 1.6;
  word-break: break-all;
  outline: none;
  position: relative;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  span {
    font-size: 15px;
    color: #606266;
  }
}
.describeInput::after {
  content: attr(aria-placeholder);
  font-size: 15px;
}
.describeIt {
  overflow: hidden;
  font-size: 15px;
  background-color: #f2f2f4;
  border-radius: 5px;
}
.recommented {
  .add {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    button {
      background-color: transparent;
      border: none;
      font-size: 14px;
      cursor: pointer;
      color: #6b7075;
      font-weight: 600;
    }
  }
  .recomTip {
    position: relative;
    display: flex;
    .intro {
      font-size: 13px;
      line-height: 52px;
      padding: 0 15px;
      display: block;
      color: #ccc;
    }
    .mainTip {
      display: flex;
      align-items: center;
      button {
        height: 25px;
        line-height: 22px;
        border: none;
        padding: 2px 8px;
        cursor: pointer;
        color: rgb(37 38 50);
        background-color: #f5f5f6;
        font-size: 13px;
        box-shadow: 0 0 1px #ccc;
        margin: 0 5px;
        border-radius: 10px;
      }
    }
  }
}
</style>
