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
      />
      <el-input
        v-model="describe"
        maxlength="500"
        placeholder="添加直播简介"
        show-word-limit
        rows="5"
        type="textarea"
        resize="none"
      />
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
let describe = ref("");
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
.el-textarea,
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
  .el-textarea .el-input__count {
    position: absolute;
    bottom: -30px;
    right: 20px;
  }
}
.el-textarea {
  border-top: 1px solid #ccc;
}
.describe {
  max-width: 640px;
  padding: 20px;
  .tip {
    font-size: 13px;
    color: #ccc;
  }
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
