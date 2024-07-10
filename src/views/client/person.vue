<template>
  <div class="main">
    <div class="person">
      <!-- 用户头像和用户基本信息 -->
      <div class="userHead">
        <!-- 用户头像 -->
        <div class="avatar">
          <img
            src="https://q3.itc.cn/q_70/images03/20240519/1b4e7565b46241b68288ae482412a866.jpeg"
            alt="用户头像"
          />
        </div>
        <div class="userInfo">
          <h2 class="userName">鲲缡</h2>
          <!-- 用户简介 -->
          <!-- 用户进入时长 -->
          <p>庆祝我们相遇的第1111天</p>
          <p>杀不死我的,只能让我变得更强大</p>
        </div>
        <div class="setting">
          <el-button>设置</el-button>
        </div>
      </div>
      <div class="myPerson">
        <div class="personTop">
          <div class="topUl">
            <ul>
              <li>收藏集</li>
              <li>关注</li>
              <li>粉丝</li>
              <li>作品</li>
              <li>我的点赞</li>
            </ul>
          </div>
          <!-- 资源搜索 -->
          <div class="search">
            <el-input type="text" placeholder="搜索用户作品"/>
            <button ><i class="iconfont icon-sousuo1"></i></button>
          </div>
        </div>
        <!-- 个人主页的导航栏 -->
        <div class="mainShow">
          <!-- 展示内容区 -->
        </div>
      </div>
    </div>
    <div class="sider">
      <!-- 侧边栏 -->
      <!-- 关注和粉丝 -->
      <div class="concernUser">
        <div class="concern">
          <p>关注</p>
          <p class="concernNumber number">11</p>
        </div>
        <b></b>
        <div class="fans">
          <p>粉丝</p>
          <p class="fansNumber number">12</p>
        </div>
      </div>
      <div class="moreInfo">
        <!-- 收藏信息 -->
        <!-- 作品管理 -->
        <!-- 创建时间 -->
        <div class="collect flex">
          <p>收藏集</p>
          <p class="collectNumber">2</p>
        </div>
        <div class="manage flex">
          <p>作品管理</p>
          <p class="managetNumber">10</p>
        </div>
        <div class="creatTime flex">
          <p>开始时间</p>
          <p class="managetNumber">2022-05-33</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
@import url(http://at.alicdn.com/t/c/font_4515498_kgflfyz9p7.css);
.main {
  max-width: 1000px;
  background-color: #f5f5f5;
  margin: 20px auto;
  display: grid;
  grid-template-columns: 16fr 6fr;
  gap: 15px;
}
.person {
  .userHead {
    border-radius: 4px;
    padding: 20px;
    background-color: #fff;
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 5fr 1fr;
    align-items: center;
    .avatar {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .myPerson {
    border-radius: 4px;
  }
  .personTop {
    padding: 0 15px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .topUl {
    ul {
      list-style: none;
      display: flex;
      height: 60px;
      padding: 0;

      li {
        padding: 0 20px;
        line-height: 60px;
        cursor: pointer;
      }
    }
  }
  .mainShow {
    min-height: 350px;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
.sider {
  .concernUser {
    padding: 10px 0;
    background-color: #fff;
    border-radius: 4px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    .concern,
    .fans {
      width: 50%;
      text-align: center;
      p {
        font-weight: 500;
        font-size: 17px;
      }
      .number {
        font-weight: 700;
      }
    }
    b {
      height: 40px;
      width: 1px;
      display: block;
      background-color: #f5f5f5;
    }
  }
  .moreInfo {
    margin-top: 20px;
    .flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 45px;
      padding: 10px;
      font-size: 15px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
