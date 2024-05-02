<template>
  <div class="inforMax">
    <div class="inforTop">
      <div class="groupName">柒总没有钱</div>
      <span
        ><svg
          t="1714641807092"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5427"
          width="200"
          height="200"
        >
          <path
            d="M164.3 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
            p-id="5428"
            fill="#65bb96"
          ></path>
          <path
            d="M512.3 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
            p-id="5429"
            fill="#65bb96"
          ></path>
          <path
            d="M860.4 512.2m-100 0a100 100 0 1 0 200 0 100 100 0 1 0-200 0Z"
            p-id="5430"
            fill="#65bb96"
          ></path></svg
      ></span>
    </div>
    <div class="inforMain">
      <div class="chatmain">
        <div class="inforList"></div>
        <div class="inforSend">
          <input placeholder="发送消息" type="text" />
        </div>
      </div>
      <div class="inforSider">
        <div class="notoce">
          <div class="title">
            <span>群公告</span>
            <span
              ><svg
                t="1714652077129"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6694"
                width="200"
                height="200"
              >
                <path
                  d="M704 429.714286l-312.685714-340.114286a53.394286 53.394286 0 0 0-36.571429-16.457143 52.297143 52.297143 0 0 0-38.4 16.457143 53.028571 53.028571 0 0 0 0 76.8l312.685714 340.114286c5.485714 5.485714 5.485714 10.971429 0 10.971428l-318.171428 340.114286A52.297143 52.297143 0 0 0 292.571429 896a53.394286 53.394286 0 0 0 16.457142 38.4A73.142857 73.142857 0 0 0 347.428571 950.857143a50.834286 50.834286 0 0 0 38.4-16.457143l312.685715-340.114286a106.422857 106.422857 0 0 0 5.485714-164.571428z"
                  p-id="6695"
                  fill="#65bb96"
                ></path></svg
            ></span>
          </div>
          <div class="noticemain">
            <span class="noticetxt">
              由于经中央政府决定，在2022年12月6日早上开启放空警报，所有用户不能在群/频道发送娱乐游戏，关于明星的一切，包括照片资料视频等此日禁止发布颜色违规内容
              上午集体默哀，明天群内将全体禁止发送娱乐游戏，关于明星的一切，包括照片资料视频等
            </span>
          </div>
        </div>
        <div class="member" @click.stop>
          <div class="title" v-if="!isearch">
            <span>群成员</span>
            <span @click="research()"
              ><svg
                t="1714653715024"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="7950"
                width="200"
                height="200"
              >
                <path
                  d="M950.784 899.584l-168.448-167.936c64.512-74.752 99.84-168.96 99.84-268.8 0-110.08-43.008-212.992-120.32-290.816S581.12 51.2 471.552 51.2c-110.08 0-212.992 43.008-290.816 120.32-77.824 77.824-120.832 181.248-120.832 291.328s43.008 212.992 120.32 290.816c77.824 77.824 181.248 120.32 290.816 120.32 90.624 0 177.152-29.184 248.32-82.944l169.984 169.984c8.192 8.192 19.456 12.8 30.72 12.8s22.016-4.096 30.72-12.8c16.896-16.896 16.896-44.544 0-61.44zM146.432 462.848C146.432 283.648 292.352 138.24 471.04 138.24c179.2 0 324.608 145.92 324.608 324.608 0 179.2-145.408 324.608-324.608 324.608s-324.608-145.92-324.608-324.608z"
                  fill="#65bb96"
                  p-id="7951"
                ></path></svg
            ></span>
          </div>
          <div class="search" v-if="isearch">
            <input type="text" name="" id="" />
            <svg
              t="1714653715024"
              class="sericon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7950"
              width="200"
              height="200"
            >
              <path
                d="M950.784 899.584l-168.448-167.936c64.512-74.752 99.84-168.96 99.84-268.8 0-110.08-43.008-212.992-120.32-290.816S581.12 51.2 471.552 51.2c-110.08 0-212.992 43.008-290.816 120.32-77.824 77.824-120.832 181.248-120.832 291.328s43.008 212.992 120.32 290.816c77.824 77.824 181.248 120.32 290.816 120.32 90.624 0 177.152-29.184 248.32-82.944l169.984 169.984c8.192 8.192 19.456 12.8 30.72 12.8s22.016-4.096 30.72-12.8c16.896-16.896 16.896-44.544 0-61.44zM146.432 462.848C146.432 283.648 292.352 138.24 471.04 138.24c179.2 0 324.608 145.92 324.608 324.608 0 179.2-145.408 324.608-324.608 324.608s-324.608-145.92-324.608-324.608z"
                fill="#65bb96"
                p-id="7951"
              ></path>
            </svg>
            <svg
              v-if="isput"
              t="1714654685810"
              class="canicon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8999"
              width="200"
              height="200"
            >
              <path
                d="M103.34374999 866.46875001l354.65625001-354.65625001L103.34374999 157.0625c-14.90625001-14.90625001-14.90625001-39.09375001 2e-8-54 14.90625001-14.90625001 39.09375001-14.90625001 54 0L512 457.71874999 866.75 103.0625c14.90625001-14.90625001 39.09375001-14.90625001 54 0 14.90625001 14.90625001 14.90625001 39.09375001 0 54L566 511.71874999 920.75 866.46875001c14.90625001 14.90625001 14.90625001 39.09375001 0 53.99999998-7.50000001 7.40625001-17.25 11.15625001-27 11.15625001s-19.50000001-3.75-27-11.15625001L512.09375001 565.71875001 157.34374999 920.375c-7.50000001 7.40625001-17.25 11.15625001-26.99999998 11.15625001-9.75 0-19.50000001-3.75-27-11.15625001-14.90625001-14.90625001-14.90625001-39 0-53.90625001z"
                fill="#515151"
                p-id="9000"
              ></path>
            </svg>
          </div>
          <ul class="userList">
            <li class="selectChat">
              <div class="avatar">
                <img src="@/assets/images/userPhoto/userphotojpg.jpg" alt="" />
              </div>
              <div class="username">柒总没有钱</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isearch: false,
      isput: false,
    };
  },
  methods: {
    research() {
      this.isearch = true;
    },
    cansearch() {
      // 点击文档时执行的操作
      const member = this.$el.querySelector(".member");
      if (!(member && member.contains(event.target))) {
        // 点击的不是输入框以外的地方
        this.isearch = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.cansearch);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.cansearch);
  },
};
</script>
<script lang="ts" setup>
</script>

<style lang="scss">
.inforMax {
  background-color: #ffffff;
  width: 80%;
  height: 100vh;
  border-left: 1px #d1efe2 solid;
  .inforTop {
    width: 80%;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    border-bottom: 1px #d1efe2 solid;
    position: fixed;
    top: 0;
    span {
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      svg {
        width: 100%;
        height: 20px;
      }
    }
    .groupName {
      color: #353641;
      height: 30px;
      line-height: 30px;
    }
  }
  .inforMain {
    height: 100%;
    width: 100%;
    display: flex;
    .chatmain {
      width: 75%;
      .inforSend {
        width: 60%;
        height: 60px;
        padding: 10px;
        position: fixed;
        bottom: 5px;
        input {
          width: 660px;
          outline: none;
          height: 40px;
          padding: 10px;
          border-radius: 8px;
          border: #71c7a2 1px solid;
          background-color: #e8f9f2;
        }
      }
    }
    .inforSider {
      width: 25%;
      margin-top: 70px;
      border-left: 1px #d1efe2 solid;
      .notoce {
        border-bottom: #d1efe2 1px solid;
        padding: 10px;
        .noticemain {
          padding: 10px;
          font-size: 13px;
          color: #747477;
          span {
            width: 100%;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 5;
          }
        }
      }
      .title {
        width: 100%;
        display: flex;
        justify-content: space-between;
        span {
          height: 30px;
          display: flex;
          align-items: center;
          svg {
            height: 15px;
            width: 15px;
          }
        }
      }
      .member {
        padding: 10px;
        .search {
          padding: 0 10px;
          height: 30px;
          position: relative;
          input {
            width: 100%;
            height: 30px;
            border: none;
            position: relative;
            background-color: #eef6f2;
            border-radius: 5px;
            outline: #89d6b4 1px solid;
            padding-left: 30px;
          }
          .sericon {
            height: 18px;
            width: 18px;
            position: absolute;
            left: 15px;
            top: 6px;
          }
          .canicon {
            height: 12px;
            width: 12px;
            position: absolute;
            right: 18px;
            top: 8px;
          }
        }
        .userList {
          width: 100%;
          padding: 10px;
          display: block;
          li {
            display: flex;
            width: 100%;
            margin: 5px 0;
            .avatar {
              width: 25px;
              height: 25px;
              margin: 2px;
              img {
                width: 25px;
                border-radius: 50%;
              }
            }
            .username {
              height: 25px;
              line-height: 25px;
              font-size: 13px;
              margin-left: 8px;
              color: #747477;
            }
          }
        }
      }
    }
  }
}
</style>