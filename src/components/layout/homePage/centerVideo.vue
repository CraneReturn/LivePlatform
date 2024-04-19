<template>
    <div class="centerViedo">
        <div class="centerViedoshow">
            <ul>
                <li class="listShow">
                    <img
                        class="listFlgur"
                        src="/src/assets/images/viedoImg/1.jpg"
                    />
                </li>
                <li class="listShow middleShow">
                    <img
                        class="listFlgur"
                        src="/src/assets/images/viedoImg/2.jpg"
                    />
                </li>
                <li class="listShow">
                    <img
                        class="listFlgur"
                        src="/src/assets/images/viedoImg/3.jpg"
                    />
                </li>
                <li class="listShow">
                    <img
                        class="listFlgur"
                        src="/src/assets/images/viedoImg/2.jpg"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
export default {};
</script>
<script setup lang="ts">
import { reactive, ref } from "vue";
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
]);
</script>
<style lang="scss">
@import "@/styles/homePage/homePageTop.scss";
@import "@/styles/homePage/centerViedo.scss";
@import "@/styles/component/component.scss";
</style>
