<template>
    <section class="toggle-button" @click="togglePlayerState">
        <svg
            t="1713854967342"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5234"
            width="26"
            height="26"
        >
            <path
                d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                fill="#666666"
                p-id="5235"
            ></path>
            <path
                d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                fill="#666666"
                p-id="5236"
            ></path>
        </svg>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Player } from "../models/Player";

const playerState = ref(false);

const togglePlayerState = () => {
    playerState.value = !playerState.value;

    playerState.value ? Player.pause() : Player.play();
};

</script>

<style lang="scss">
.toggle-button {
    position: absolute;
    bottom: 0;
    left: 16px;
}
</style>
