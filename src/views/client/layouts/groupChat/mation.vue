<template>
  <div class="mation" :class="{aaa:maexend}">
    <div class="mationmain">
        <div class="members">
            <div class="toptitle">
                <span>群聊成员</span>
                <span>
                    <span class="number">查看4位群聊成员</span>
                    <svg t="1714826781239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5352" width="200" height="200"><path d="M390.948571 897.462857a53.028571 53.028571 0 0 1-38.765714-16.091428 54.491429 54.491429 0 0 1 0-77.531429l288.914286-288.914286-288.914286-288.914285a54.491429 54.491429 0 0 1 0-77.531429 55.222857 55.222857 0 0 1 77.531429 0l365.714285 365.714286-365.714285 365.714285a54.125714 54.125714 0 0 1-38.765715 17.554286z" fill="#afaeae" p-id="5353"></path></svg>
                </span>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props:['maexend'],
  methods: {
   closeAffiche(){
    this.$emit('close-affiche');
   }
  },
};
</script>
<script lang="ts" setup></script>

<style lang="scss">
.aaa{
    transform: translateX(0)!important;
}
.mation{
    position: absolute;
    padding-top: 70px;
    right: 0;
    width: 330px;
    height: 100%;
    transition: all 0.18s linear;
    transform: translateX(100%);
    .mationmain{
        width: 100%;
        height: 100%;
        border-left: 1px solid #d1efe2 ;
        background-color: #f5f5f5;
        padding: 20px;
        .members{
            width: 100%;
            height: 150px;
            background-color: #fff;
            border-radius: 6px;
            .toptitle{
                padding: 10px;
                display: flex;
                justify-content: space-between;
                span{
                    display: flex;
                    font-size: 13px;
                    height: 13px;
                    line-height: 13px;
                    svg{
                        height: 13px;
                        width: 13px;
                    }
                }
                .number{
                    font-size: 12px;
                    color: #b6b0b0;
                }
            }
        }
    }
}
</style>