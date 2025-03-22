<template>
  <div class="attention-list">
    <div class="attention-item">
      <div class="avatar">
        <img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="" />
      </div>
      <div class="at-con">
        <div class="user-name">22222</div>
        <div class="at-bot">
          <div class="at-text">关注了你</div>
          <div class="at-time">2022/07/29</div>
        </div>
      </div>
      <div class="at-right">
        <button>回关</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {};
</script>
<script setup lang="ts">
import { ref, defineEmits } from "vue";
const emit = defineEmits(["update"]);
const sendDataToParent = () => {
  emit("update", 3);
};
sendDataToParent();
</script>

<style lang="scss" scoped>
.attention-list {
  width: 700px;
  height: 100%;
  margin: auto;
  padding-top: 10px;
  .attention-item {
    width: 100%;
    height: 70px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    .avatar {
      width: 50px;
      height: 50px;
      margin: 0 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .at-con {
      width: 500px;
      .at-bot {
        display: flex;
        .at-time{
            margin-left: 5px;
        }
      }
    }
    .at-right {
      button {
        border: 1px solid #67c23a;
        width: 60px;
        height: 30px;
        border-radius: 3px;
        color: #53ad26;
        background-color: #ddf6d0;
      }
    }
  }
}
</style>
