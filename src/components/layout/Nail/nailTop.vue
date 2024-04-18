<template>
    <div class="nailTop">
        <div class="nailTopCenter">
            <div class="leftNailTopBtn">
                <ul>
                    <li :class="{ showStatusColor: $route.path == '/' }">
                        首页
                    </li>
                    <li>分类</li>
                    <li>直播视频</li>
                </ul>
                <div class="searchNailInput">
                    <div class="searchContainer">
                        <input type="text" placeholder="搜索直播" />
                        <div class="searchradius"></div>
                    </div>
                </div>
            </div>
            <div class="userNail">
                <div class="Usermessage">
                    <span class="nailMessage">
                        <svg
                            t="1713424853378"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="8656"
                            width="25"
                            height="25"
                        >
                            <path
                                d="M896 806.976v-320A384.32 384.32 0 0 0 544.128 104.64V5.056h-64v99.52A384.32 384.32 0 0 0 128 487.008v320H16v64h322.464a175.744 175.744 0 0 0 347.072 0H1008v-64z m-384 147.968a111.904 111.904 0 0 1-108-83.968h216A111.904 111.904 0 0 1 512 954.944zM192 806.976v-320a320 320 0 0 1 640 0v320z"
                                fill="#8a8a8a"
                                p-id="8657"
                            ></path>
                            <path
                                d="M436.576 244.8a257.984 257.984 0 0 0-149.248 124.864 32 32 0 0 0 56.64 29.824 193.408 193.408 0 0 1 111.872-93.664 32 32 0 0 0-19.264-61.024z"
                                fill="#8a8a8a"
                                p-id="8658"
                            ></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div></div>
</template>

<script>
export default {};
</script>
<script setup lang="ts"></script>
<style lang="scss">
@import "@/assets/style/homePage/homePageTop.scss";
@import "@/assets/style/component/component.scss";
</style>
