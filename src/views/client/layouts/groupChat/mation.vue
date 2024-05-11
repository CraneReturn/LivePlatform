<template>
  <div class="mation" :class="{ aaa: maexend }">
    <div class="mationmain">
      <div class="members">
        <div class="toptitle">
          <span>群聊成员</span>
          <span>
            <span class="number">查看4位群聊成员</span>
            <svg
              t="1714826781239"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5352"
              width="200"
              height="200"
            >
              <path
                d="M390.948571 897.462857a53.028571 53.028571 0 0 1-38.765714-16.091428 54.491429 54.491429 0 0 1 0-77.531429l288.914286-288.914286-288.914286-288.914285a54.491429 54.491429 0 0 1 0-77.531429 55.222857 55.222857 0 0 1 77.531429 0l365.714285 365.714286-365.714285 365.714285a54.125714 54.125714 0 0 1-38.765715 17.554286z"
                fill="#afaeae"
                p-id="5353"
              ></path>
            </svg>
          </span>
        </div>
        <ul>
          <li class="user">
            <div class="avatar">
              <img src="@/assets/images/userPhoto/userphotojpg.jpg" />
            </div>
            <span class="nickname"> 九是玩儿 </span>
          </li>
          <li class="user">
            <div class="avatar">
              <img src="@/assets/images/userPhoto/userphotojpg.jpg" />
            </div>
            <span class="nickname"> 翠花 </span>
          </li>
          <li class="user">
            <div class="avatar">
              <img src="@/assets/images/userPhoto/userphotojpg.jpg" />
            </div>
            <span class="nickname"> 长泽同学 </span>
          </li>
          <li class="user">
            <div class="avatar">
              <img src="@/assets/images/userPhoto/userphotojpg.jpg" />
            </div>
            <span class="nickname"> 抓狂干 </span>
          </li>
          <li class="user">
            <div class="avatar">
              <svg
                t="1715067585123"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5357"
                width="200"
                height="200"
              >
                <path
                  d="M512 1024c-281.6 0-512-230.4-512-512s230.4-512 512-512 512 230.4 512 512S793.6 1024 512 1024zM512 51.2C256 51.2 51.2 256 51.2 512S256 972.8 512 972.8 972.8 768 972.8 512 768 51.2 512 51.2z"
                  fill="#7a7a7a"
                  p-id="5358"
                ></path>
                <path
                  d="M774.4 537.6 249.6 537.6C236.8 537.6 224 524.8 224 512s12.8-25.6 25.6-25.6l531.2 0c12.8 0 25.6 12.8 25.6 25.6S787.2 537.6 774.4 537.6z"
                  fill="#7a7a7a"
                  p-id="5359"
                ></path>
              </svg>
            </div>
            <span class="nickname"> 移除 </span>
          </li>
        </ul>
      </div>
      <div class="groupName">
        <p>群聊名称</p>
        <input type="text" />
      </div>

      <div class="groupName notice">
        <p>群公告</p>
        <span>
            
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: ["maexend"],
  methods: {
    closeAffiche() {
      this.$emit("close-affiche");
    },
  },
};
</script>
<script lang="ts" setup>


</script>

<style lang="scss">
.aaa {
  transform: translateX(0) !important;
}
li {
  list-style: none;
}
.mation {
  position: absolute;
  padding-top: 70px;
  right: 0;
  width: 330px;
  height: 100%;
  transition: all 0.18s linear;
  transform: translateX(100%);
  .mationmain {
    width: 100%;
    height: 100%;
    border-left: 1px solid #d1efe2;
    background-color: #f5f5f5;
    padding: 20px;
    .members {
      width: 100%;
      height: 136px;
      background-color: #fff;
      border-radius: 6px;
      .toptitle {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        span {
          display: flex;
          font-size: 13px;
          height: 13px;
          line-height: 13px;
          svg {
            height: 13px;
            width: 13px;
          }
        }
        .number {
          font-size: 12px;
          color: #b6b0b0;
        }
      }
      ul {
        display: grid;
        padding: 20px 10px;
        grid-template-columns: repeat(5, 50px);
        grid-column-gap: 5px;
        .user {
          width: 50px;
          font-size: 11px;
          .avatar {
            width: 100%;
            text-align: center;
            img,
            svg {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          .nickname {
            width: 50px;
            white-space: nowrap;
            overflow: hidden;
            display: inline-block;
            text-overflow: ellipsis;
            color: #b6b0b0;
            text-align: center;
          }
        }
      }
    }
    .groupName{
        margin-top: 30px;
        p{
            font-size: 14px;
            color: #b6b0b0;
            padding-left: 20px;
            margin-bottom: 6px;
        }
        input{
            border: none;
            width: 100%;
            height: 40px;
            border-radius: 8px;
            outline: 1px solid #71c7a2;
            padding: 13px;
        }
    }
  }
}
</style>