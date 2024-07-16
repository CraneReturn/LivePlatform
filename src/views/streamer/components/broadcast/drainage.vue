<template>
  <div class="drainage">
    <!-- 直播引流  -->
    <div class="title">
      <h2>直播相关活动</h2>
      <div class="more">更多直播活动</div>
    </div>
    <div class="activities">
      <div class="concent">
        <div class="activity">
          <h3 class="activityName">新人计划</h3>
          <button>参与</button>
        </div>
        <div class="activity">
          <h3 class="activityName">
            新人计划哈哈哈哈哈哈支持lxy支持lxy支持lxy支持lxy
          </h3>
          <button>参与</button>
        </div>
        <div class="activity">
          <h3 class="activityName">
            新人计划哈哈哈哈哈哈支持lxy支持lxy支持lxy支持lxy
          </h3>
          <button>参与</button>
        </div>
      </div>
      <div class="more">
        <button>+7</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.drainage {
  max-width: 640px;
  padding: 20px;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .more {
    font-size: 14px;
  }
}
.activities {
  display: flex;
  margin-top: 10px;
  .more {
    margin-left: 5px;
    button {
      height: 100%;
      width: 35px;

      text-align: center;
      background-color: #f2f2f4;
      border-radius: 5px;
      border: none;
    }
  }
}
.activity {
  float: left;
  width: 175px;
  cursor: pointer;
  background-color: #f2f2f4;
  margin: 0 5px;
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  h3 {
    font-size: 14px;
    font-weight: 600;
    width: 155px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 13px;
    color: var(--el-color-success-light-3);
  }
}
</style>
