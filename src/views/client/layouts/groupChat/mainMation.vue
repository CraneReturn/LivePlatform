<template>
  <div class="mationmain">
      <div class="members">
        <div class="toptitle">
          <span>群聊成员</span>
          <span>
            <span class="number">查看4位群聊成员</span>
            <svg @click.stop="navigateToList()"
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

      <div class="newnotice">
        <p>群公告</p>
        <span>
          <p>
            由于经中央政府决定，在2022年12月6日早上开启放空警报，所有用户不能在群/频道发送娱乐游戏，关于明星的一切，包括照片资料视频等此日禁止发布颜色违规内容
            上午集体默哀，明天群内将全体禁止发送娱乐游戏，关于明星的一切，包括照片资料视频等
          </p>
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

      <div class="userGroupName">
        <p>群聊名称</p>
        <input type="text" />
      </div>

      <div class="groupRemarks">
        <p>群聊备注</p>
        <input type="text" placeholder="填写备注" />
      </div>
    </div>
</template>
<script lang="ts">
export default {
  methods: {
    navigateToList() {
      this.$router.push('/membersList');
    }
  }
};
</script>
<script lang="ts" setup>
</script>

<style lang="scss">
@import "@/views/client/styles/groupChat/mainMation.scss";
</style>