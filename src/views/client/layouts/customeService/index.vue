<!-- 用户端客服中心 -->
<template>
  <div class="kefu">
    <div class="customImage">
      <h1>xx直播，诚心为您服务</h1>
      <p>您诚挚的建议是我们努力的动力</p>
      <div class="userSearch">
        <div class="search">
          <el-input placeholder="输入你要解决的问题" v-model="search" />
          <button><i class="iconfont icon-sousuo"></i></button>
        </div>
      </div>
    </div>
    <div class="customTable">
      <div class="customAuto">
        <h1 class="title">自助服务</h1>
        <div class="auto">
          <el-carousel trigger="click" height="250px" autoplay="none">
            <el-carousel-item v-for="item in 4" :key="item">
              <img
                src="https://image.meiye.art/pic_gdmi9HpzqvDVwWbYHKc41?imageMogr2/thumbnail/560x/interlace/1"
                alt=""
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="customPersonal">
        <div class="report"></div>
        <div class="person">
          <h1 class="title">人工客服</h1>
          <div class="personCustom">
            <div class="personIn">
              <div class="personHead">
                <img
                  src="https://image.meiye.art/pic_gdmi9HpzqvDVwWbYHKc41?imageMogr2/thumbnail/560x/interlace/1"
                  alt=""
                />
              </div>
              <div class="personMessage">
                <div class="personName"><h1>小巴</h1></div>
                <div class="personInfo">
                  <p>找不到答案？使用人工客服反馈</p>
                  <p class="infoText">小巴会在24小时内处理您的留言</p>
                </div>
              </div>
            </div>
            <el-divider />
            <div class="userOprate">
              <button class="question">问题咨询</button>
              <button class="suggest">反馈建议</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commonProblem">
      <div class="common">
        <div class="title">
          <h1>常见问题</h1>
          <button class="allProblems">
            全部问题<i class="iconfont icon-youjiantou"></i>
          </button>
        </div>
        <div class="problemType">
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
          <button>充值消费</button>
        </div>
        <el-divider />
        <div class="problems">
          <div class="problem">
            <i></i>
            <p class="problemText">直播佣金计算公式</p>
          </div>
          <div class="problem">
            <i></i>
            <p class="problemText">直播佣金计算公式</p>
          </div>
          <div class="problem">
            <i></i>
            <p class="problemText">直播佣金计算公式</p>
          </div>
          <div class="problem">
            <i></i>
            <p class="problemText">直播佣金计算公式</p>
          </div>
          <div class="problem">
            <i></i>
            <p class="problemText">直播佣金计算公式</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
</script>
<style lang="scss" scoped>
@import url("//at.alicdn.com/t/c/font_4515498_x1t0sazzfdj.css");
.el-carousel__container {
  img {
    width: 100%;
    height: 100%;
  }
}
.kefu {
  background-color: #f3f6f7;
}
.customImage {
  background-image: url("https://image.meiye.art/pic_gdmi9HpzqvDVwWbYHKc41?imageMogr2/thumbnail/560x/interlace/1");
  background-size: 100% 100%;
  height: 250px;
  width: 100%;
  position: relative;
  h1,
  p {
    position: absolute;
    top: 60px;
    left: 40px;
    font-weight: 600;
    letter-spacing: 10px;
    font-size: 23px;
  }
  p {
    top: 100px;
    font-weight: 400;
    letter-spacing: unset;
    font-size: 20px;
    color: #fff;
    font-family: cursive;
  }
  .userSearch {
    width: 270px;
    position: absolute;
    bottom: 60px;
    left: 40px;
    .search {
      position: relative;
      button {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 40px;
        background-color: transparent;
        border-radius: 2px;
        cursor: pointer;
        border: none;
        .iconfont {
          color: var(--el-color-info);
        }
      }
    }
  }
}
.customTable {
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px;
  padding-bottom: 50px;
  padding-top: 0;
  height: 350px;
  margin-top: -30px;
  position: relative;
  z-index: 10;
  display: flex;
  gap: 10px;
  .customAuto {
    border-radius: 2px;
    background-color: #fff;
    width: 85%;
    height: 100%;
    box-shadow: 1px 2px 2px #3333332f;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 18px;
      padding: 5px 10px;
    }
    .auto {
      padding: 10px;
      padding-top: 0;
      width: 100%;
    }
  }
  .customPersonal {
    width: 35%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .report {
      border-radius: 2px;
      height: 100px;
      background-color: #fff;
      box-shadow: 1px 2px 2px #3333332f;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .person {
      height: 200px;
      padding: 5px 10px;
      background-color: #fff;
      box-shadow: 1px 2px 2px #3333332f;
      border-radius: 2px;
      .title {
        font-size: 18px;
        padding: 2px 0;
      }
      .personCustom {
        display: flex;
        flex-direction: column;
        .personHead {
          width: 64px;
          height: 64px;
          img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
          }
        }
        .personIn {
          display: flex;
          gap: 15px;
          align-items: center;
          h1 {
            font-size: 20px;
            font-weight: 800;
          }
          .personInfo {
            font-size: 14px;
            color: var(--el-color-info);
          }
        }
        .el-divider {
          margin: 12px 0;
        }
        .userOprate {
          display: flex;
          gap: 15px;
          justify-content: flex-end;
          button {
            background-color: var(--el-color-success);
            border: none;
            border-radius: 4px;
            color: #fff;
            width: 80px;
            height: 30px;
            cursor: pointer;
          }
          .suggest {
            background-color: #fff;
            border: 1px solid var(--el-color-success);
            color: var(--el-color-success);
          }
        }
      }
    }
  }
}
.commonProblem {
  max-width: 1250px;
  margin: 0 auto;
  padding: 60px;
  padding-top: 0;
  .common {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 1px 2px 5px #3333332f;
    padding: 10px;
    padding-bottom: 35px;
    .title {
      display: flex;
      justify-content: space-between;
      h1 {
        font-size: 18px;
      }
      button {
        background-color: transparent;
        color: var(--el-color-info);
        border: none;
        cursor: pointer;
        font-size: 13px;
        .iconfont {
          font-size: 12px;
        }
      }
    }
    .problemType {
      button {
        background-color: transparent;
        margin: 10px 8px 0 0;
        cursor: pointer;
        border: 1px solid var(--el-color-info);
        border-radius: 2px;
        padding: 5px 10px;
      }
    }
    .problems {
      padding: 10px;
      padding-top: 0;
      .problem {
        height: 20px;
        line-height: 20px;
        display: inline-flex;
        width: 50%;
        gap: 5px;
        align-items: center;
        i {
          background-color: var(--el-color-info);
          height: 4px;
          border-radius: 50%;
          width: 4px;
        }
        .problemText {
          font-size: 16px;
          cursor: pointer;
          transition-duration: 0.25s;
        }
        .problemText:hover {
          color: var(--el-color-success-light-8);
        }
      }
    }
  }
}
@media screen and (max-width: 1100px) {
  .personInfo {
    .infoText {
      display: none;
    }
  }
  .userOprate{
    button{
      font-size: 11px;
    }
  }
}
</style>
