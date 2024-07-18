<!-- 开播选择 -->
<!-- 定时开播 -->
<!-- 开播录屏 -->
<template>
  <div class="label">
    <!-- 开播录屏 -->
    <div class="record">
      <h2>录屏设置</h2>
      <div class="chosen">
        <el-switch v-model="record" />
        <h3>开播时录屏</h3>
      </div>
    </div>
    <div class="record">
      <h2>时间设置</h2>
      <div class="timeSetting">
        <el-radio-group v-model="radio">
          <el-radio :value="3">立即开播</el-radio>
          <el-radio :value="6">定时开播</el-radio>
        </el-radio-group>
        <!-- 定时开播时间 -->
        <el-time-picker
          v-if="radio === 6"
          v-model="scheduledTime"
          :disabled-hours="disabledHours"
          :disabled-minutes="disabledMinutes"
          :disabled-seconds="disabledSeconds"
          placeholder="placeholder"
        />
      </div>
    </div>
    <div class="userOprate">
      <el-button type="success">进入直播间</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const record = ref(false);
const radio = ref(3); // 默认为立即开播
const scheduledTime = ref<Date | null>(null);
let now: Date;
const disabledHours = () => {
  now = new Date();
  const currentHour = now.getHours();
  const twoHoursLater = currentHour + 2;
  return makeRange(0, twoHoursLater);
};

const disabledMinutes = (hour: number) => {
  if (hour === now.getHours() + 2) {
    return makeRange(0, now.getMinutes());
  }
};

const disabledSeconds = (hour: number, minute: number) => {
  if (hour === now.getHours() + 2 && minute === now.getMinutes()) {
    return makeRange(0, now.getSeconds());
  }
};

const makeRange = (start: number, end: number) => {
  const result: number[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
</script>
<style lang="scss" scoped>
.label {
  padding: 20px;
  .chosen {
    padding: 10px 5px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
h3 {
  font-size: 15px;
}
.timeSetting {
  display: flex;
  justify-content: space-between;
  align-items: end;
}
.el-radio-group {
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: normal;
}
.userOprate {
  margin-top: 30px;
  display: flex;
}
</style>
