<template>
  <div class="footer">
    <div class="userHead">
      <div class="avater">
        <img
          src="https://img0.baidu.com/it/u=4004819410,1131625318&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          alt=""
        />
      </div>
      <div class="userInfo">
        <p class="userName">超级无敌霸王龙战士</p>
        <p class="liveNumber">1.5万本场点赞</p>
      </div>
    </div>
    <div class="frequency">
      <div class="frequen">
        <p>分辨率设置:</p>
        <el-select v-model="value" placeholder="分辨率设置" small>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="codeRate">
        <p>码率设置:</p>
        <el-select v-model="value" placeholder="码率设置" small>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <div class="liveSwitch">
      <el-button type="primary">开始直播</el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>
<style lang="scss" scoped>
.footer {
  margin-top: 5px;
  height: 100px;
  display: grid;
  background-color: rgba(#fff, 0.6);
  padding: 10px;
  align-items: center;
  border-radius: 5px;
  grid-template-columns: 3.5fr 6fr 2fr;
}
.userHead {
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-size: 14px;
  }
  .userName {
    color: #fff;
  }
  .liveNumber {
    margin-top: 10px;
    font-size: 12px;
  }
}
.avater {
  height: 65px;
  width: 65px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.frequency {
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 14px;
  }
  .frequen,
  .codeRate {
    display: flex;
    align-items: center;
    gap: 5px;
  }
}
:deep(.el-select) {
  width: 100px;
}
.liveSwitch {
  display: flex;
  justify-content: right;
}
</style>
