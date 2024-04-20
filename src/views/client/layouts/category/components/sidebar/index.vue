<template>
  <div class="class">
    <!-- 大分类 -->
    <div class="categoryName">
      <div class="attribute">
        <b></b>
        <p>蜡笔小新</p>
      </div>

      <span class="more">更多></span>
    </div>
    <div class="labels">
      <button>蜡笔小新</button>
      <button>蜡笔小新</button>
      <button>蜡笔小新</button>
      <button>蜡笔小新</button>
      <button>蜡笔小新</button>
      <button>蜡笔小新</button>
    </div>
  </div>
</template>
<script setup lang="ts" name="labels"></script>
<style>
.categoryName {
  height: 40px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: #aaa;
  align-items: center;
  font-size: 14px;
  .attribute {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  b {
    width: 2px;
    height: 15px;
    display: block;
    background-color: #ED4857;
  }
}
.more{
  font-size: 13px;
}
.labels {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5px;
  button {
    background-color: #38393e;
    color: #aaa;
    height: 20px;
    font-size: 12px;
    border-radius: 3px;
    border: none;
    cursor: pointer;
  }
}
</style>
