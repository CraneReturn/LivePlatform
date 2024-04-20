<template>
  <div class="search">
    <!-- 大标签  -->

    <div class="labels">
      <button>
        <i class="iconfont icon-zuojiantou"></i>
      </button>
      <div class="label">
        <span>蜡笔小偏心</span>
        <span>蜡笔小偏心</span>
        <span>蜡笔小偏心</span>
        <span>蜡笔小偏心</span>
        <span>蜡笔小偏心</span>
        <span>蜡笔小偏心</span>
      </div>
      <button>
        <i class="iconfont icon-youjiantou"></i>
      </button>
    </div>
    <!-- 左右箭头 -->
    <div class="searchInput">
      <input type="text" placeholder="分区搜索" class="searchLabel" />
      <button class="searchBtn">
        <search></search>
      </button>
    </div>
    <!-- 搜索框 -->
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@import "http://at.alicdn.com/t/c/font_4515498_eh2zq9t451l.css";
.search {
  padding: 10px 30px;
  min-height: 50px;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 200px;
  gap: 20px;
  .labels {
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    button {
      background-color: transparent;
      border: none;
      width: 24px;
      text-align: center;
      line-height: 24px;
    }
    .label {
      overflow: hidden;
      white-space: nowrap;
      span {
        font-size: 15px;
        line-height: 20px;
        padding: 0 5px;
      }
    }
  }
  .searchInput {
    position: relative;
    .searchLabel {
      width: 100%;
      outline: none;
      border-radius: 15px;
      border: 1px solid #ccc;
      text-indent: 1em;
      height: 30px;
    }
    .searchBtn {
      cursor: pointer;
      position: absolute;
      top: 0;
      border: none;
      right: 0;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      text-align: center;
      line-height: 30px;
      display: flex;
      align-items: center;
    }
    svg {
      width: 20px;
    }
  }
}
</style>
