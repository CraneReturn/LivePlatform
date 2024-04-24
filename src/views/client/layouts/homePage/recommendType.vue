<template>
    <div class="recommedTypeCenter">
        <p class="titelCommnt anchorpersontitle">
            推荐分类
        </p>
        <div class="recommedTypeMain">
            <ul>
                <li v-for="(item,index) in recommedType" :key="index" class="showTypeList">
                    <div class="centerTyperecommed">
                        <div class="topShowSvgType">
                        <img src="@/assets/images/viedoImg/5.jpg" alt="" srcset="">
                    </div>
                    <div class="recommedTypeName">
                        <p>
                            英雄联盟
                        </p>
                        <p>
                            <svg t="1713687858789" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="20" height="20"><path d="M859.995 460.963c-1.197 10.478-1.197 21.854 0 33.527v88.305c0 160.751-110.161 296.657-258.34 336.17v-52.982c0-49.693-40.112-89.805-89.505-89.805h-0.3c-49.394 0-89.805 40.112-89.805 89.805v52.982c-148.179-39.812-258.04-175.719-258.04-336.17V431.328c39.814 32.33 93.098 91.302 89.805 172.726 33.227-153.267 99.085-176.318 154.764-239.48 72.444-82.321 93.996-172.726 52.386-259.538C641.17 167.6 687.868 409.476 672.901 536.7c64.959-115.251 146.682-146.083 187.094-154.166v78.429z" fill="#FF7B15" p-id="1602"></path></svg>
                            <span class="recommedNumberFire">
                                666
                            </span>
                        </p>

                    </div>
                    </div>
                    <div class="floatshowType">
                       <strong>
                        <p class="floatTypeName">
                            英雄联盟
                        </p>
                        <p class="floatTypeAbout">
                            <span>直播111</span>
                            <span>
                                视频222
                            </span>
                        </p>
                       </strong>
                       <div class="floatTypeImg">
                        <img src="@/assets/images/viedoImg/5.jpg" alt="">
                       </div>
                       <p>
                        hahahaha哈哈哈哈手游哈哈哈哈
                       </p>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
  </template>

    <script setup lang="ts">
import { reactive } from "vue";

    const recommedType=reactive([{},{}, {},{},{},{},{},{},{}])
  </script>
    <style lang="scss">
  @import "@/views/client/styles/homePage/recommedType.scss";
  @import "@/styles/component/component.scss";
  </style>