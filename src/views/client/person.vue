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
          <p class="meetTime">庆祝我们相遇的第1111天</p>
          <p class="info">杀不死我的,只能让我变得更强大</p>
        </div>
        <div class="setting">
          <router-link to="/home">
            <button>设置</button>
          </router-link>
        </div>
      </div>
      <div class="myPerson">
        <div class="personTop">
          <div class="topUl">
            <ul>
              <router-link to="/home" active-class="active">
                <li>
                  收藏集
                  <div class="label"></div>
                </li>
              </router-link>
              <router-link to="/user/concern" active-class="active">
                <li>
                  关注
                  <div class="label"></div>
                </li>
              </router-link>
              <router-link to="/user/fan" active-class="active">
                <li>
                  粉丝
                  <div class="label"></div>
                </li>
              </router-link>
              <router-link to="/home" active-class="active">
                <li>
                  作品
                  <div class="label"></div>
                </li>
              </router-link>
              <router-link to="/home" active-class="active">
                <li>
                  我的点赞
                  <div class="label"></div>
                </li>
              </router-link>
            </ul>
          </div>
          <!-- 资源搜索 -->
          <div class="search">
            <el-input type="search" placeholder="搜索用户作品" />
            <button class="searchIt">
              <i class="iconfont icon-sousuo1"></i>
            </button>
          </div>
        </div>
        <!-- 个人主页的导航栏 -->
        <div class="mainShow">
          <!-- 展示内容区 -->
          <router-view></router-view>
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
    .userInfo {
      display: flex;
      flex-direction: column;
      gap: 5px;
      .userName {
        font-weight: 600;
      }
    }
    .setting {
      background-color: var(--jjext-color-brand);
      height: 35px;
      border-radius: 4px;

      a:hover {
        background-color: var(--jjext-color-brand) !important;
      }
      button {
        background-color: transparent;
        border: none;
        width: 100%;
        cursor: pointer;
        height: 100%;
        color: #fff;
      }
    }
    .meetTime {
      font-size: 14px;
      color: #ccc;
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
  .search {
    position: relative;
  }
  .searchIt {
    background-color: transparent;
    border: none;
    position: absolute;
    height: 100%;
    right: 0;
    padding: 0 10px;
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
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
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
  position: sticky;
  top: 20px;
  max-height: 300px;

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
.label {
  width: 80%;
  text-align: center;
  height: 2px;
  background-color: transparent;
  border-radius: 1px;
  margin-top: -3px;
}

.active {
  .label {
    background-color: rgb(0 94 255);
  }
}
</style>
