<template>
  <div
    class="centerViedo"
    @mouseenter="hoverFlag = true"
    @mouseleave="hoverFlag = false"
  >
    <div class="centerViedoshow">
      <div :class="{ hoverShow: hoverFlag }" class="arrowList">
        <div class="leftArrow">
          <div class="leftArrowRadius arrowRadius" @click="leftCalors">
            <svg
              t="1713511459069"
              class="icon arrowIcon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1000"
              width="60"
              height="60"
            >
              <path
                d="M262.144 405.504l255.68-170.432a128 128 0 0 1 198.976 106.496v340.864a128 128 0 0 1-199.008 106.496l-255.648-170.432a128 128 0 0 1 0-212.992z"
                p-id="1001"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </div>
        <div class="rightArrow">
          <div class="rigtArrowRadius arrowRadius" @click="rightCalors">
            <svg
              t="1713512108616"
              class="icon arrowIcon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1039"
              width="60"
              height="60"
            >
              <path
                d="M761.856 405.504l-255.68-170.432A128 128 0 0 0 307.2 341.568v340.864a128 128 0 0 0 199.008 106.496l255.648-170.432a128 128 0 0 0 0-212.992z"
                p-id="1040"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <ul>
        <li class="listShow leftShow">
          <img class="listFlgur" :src="viedoObjArr[index%5].img" />
        </li>
        <li class="listShow middleShow middleChange" :class="{middleChanges:middlechangeFlag}">
          <img class="listFlgur" :src="viedoObjArr[(index+1)%5].img" />
        </li>
        <li class="listShow rightShow">
          <img class="listFlgur" :src="viedoObjArr[(index+2)%5].img" />
        </li>
        <li class="listShow listOther">
          <img class="listFlgur" :src="viedoObjArr[(index+3)%5].img" />
        </li>
        <li class="listShow listOther" >
          <img class="listFlgur" :src="viedoObjArr[(index+4)%5].img" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
};
</script>
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
const hoverFlag = ref<boolean>(false);
let setTime = ref<any>();
let index=ref<any>(0);
let middlechangeFlag=ref<boolean>(false)
const viedoObjArr = ref([
  {
    viedo: "",
    img: "/src/assets/images/viedoImg/1.jpg",
  },
  {
    viedo: "",
    img: "/src/assets/images/viedoImg/2.jpg",
  },
  {
    viedo: "",
    img: "/src/assets/images/viedoImg/3.jpg",
  },
  {
    viedo: "",
    img: "/src/assets/images/viedoImg/4.jpg",
  },
  {
    viedo: "",
    img: "/src/assets/images/viedoImg/5.jpg",
  },
]);
onMounted(()=>{
    caroulsPlayer()
})
const caroulsPlayer=(()=>{
    middlechangeFlag.value=false
    setTime.value=setInterval(()=>{
        rightCalors()
        middlechangeFlag.value=true
    },3000)
})
caroulsPlayer()
const leftCalors=(()=>{
    middlechangeFlag.value=true
    if(setTime){
        clearTimeout(setTime.value)
    }
  if(index.value==0){
    index.value=4
  }
  index.value--
})
const rightCalors=(()=>{
    middlechangeFlag.value=true
    if(setTime){
        clearTimeout(setTime.value)
    }
    index.value++; 
})
</script>
<style lang="scss">
@import "@/views/client/styles/homePage/homePageTop.scss";
@import "@/views/client/styles/homePage/centerViedo.scss";
@import "@/styles/component/component.scss";
</style>
