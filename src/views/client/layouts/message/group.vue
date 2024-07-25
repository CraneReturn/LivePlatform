<template>
  <div class="message-list">
    <div class="apply-item">
        <div class="avatar">
            <img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="">
        </div>
        <div class="apply-content">
            <div class="apply-top">
                <div class="user-name">1111</div>
                <div class="apply-time">
                    2024/07/15
                </div>
            </div>
            <div class="apply-bot">
                申请加入
                <div class="group-name">11111</div>
            </div>
        </div>
        <div class="apply-right">
            <button>同意</button>
            <button>拒绝</button>
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
  emit("update", 1);
};
sendDataToParent();
</script>

<style lang="scss" scoped>
.message-list {
  width: 700px;
  height: 100%;
  margin: auto;
  padding-top: 10px;
  .apply-item{
    width: 100%;
    height: 70px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    .avatar{
        width: 50px;
        height: 50px;
        margin: 0 5px;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .apply-content{
        width: 460px;
        margin: 0 5px;
        cursor: default;
        .apply-bot,.apply-top{
            display: flex;
            font-size: 13px;
            .group-name,.user-name{
                color: #75d644;
            }
            .group-name{
                margin-left: 5px;
            }
            .user-name{
                margin-right: 5px;
            }
            .apply-time{
                color: #8b8a8a;
            }
        }
    }
    .apply-right{
        button{
            width: 60px;
            height: 30px;
            border-radius: 5px;
            border: none;
            margin: 0 5px;
            cursor: pointer;
        }
    }
  }
}
</style>
