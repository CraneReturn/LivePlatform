<template>
  <div class="membersList">
    <div class="listTop">
      <svg
        @click.stop="navigateToMain"
        t="1716021690443"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2761"
        width="200"
        height="200"
      >
        <path
          d="M671.807 927.804l-415.632-415.804 415.632-415.803 63.445 63.616-352.017 352.209 352.017 352.102z"
          fill="#515151"
          p-id="2762"
        ></path>
      </svg>
      <span>群聊成员 4</span>
    </div>
    <div class="listMain">
        <div class="search">
            <input
              type="text"
              v-model="searchname"
              @input="inputChange"
              name=""
              id=""
            />
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
              @click="reinput()"
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
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    navigateToMain() {
      this.$router.push("/mainMation");
    },
  },
};
</script>
<script lang="ts" setup>
</script>

<style lang="scss">
.membersList {
  width: 100%;
  height: 100%;
  border-left: 1px solid #d1efe2;
  background-color: #f5f5f5;
  padding: 20px;
  .listTop {
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    align-items: center;
    display: flex;
    svg {
      width: 15px;
      height: 15px;
    }
  }
  .listMain{
    .search{
        display: flex;
        height: 30px;
        svg{
            height: 30px;
            width: 30px;
        }
    }
  }
}
</style>