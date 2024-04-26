<template>
  <div class="signleCategory">
    <div class="signleImage">
      <img
        src="https://img2.baidu.com/it/u=1083951767,2525250965&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt="CSDN"
      />
    </div>
    <p>咸蛋超人</p>
  </div>
</template>
<script setup lang="ts" name="Signle"></script>
<style lang="scss">
.signleCategory {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  width: 150px;
  height: 220px;
  padding: 13px 10px;
  background-color: white;
  gap: 10px;
  .signleImage {
    width: 100%;
    img {
      width: 100%;
    }
  }
  p {
    font-size: 16px;
  }
}
</style>
