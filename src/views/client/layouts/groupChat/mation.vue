<template>
  <div class="mation" :class="{ aaa: maexend }">
    <router-view @exend-affiche="exendAffiche"></router-view>
  </div>
</template>
<script lang="ts">
export default {
  props: ["maexend","isexend"],
  methods: {
    closeAffiche() {
      this.$emit("close-affiche");
    },
    exendAffiche(){
      this.$emit("exend-affiche");
      console.log(778);
    }
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
  width: 28%;
  height: 100%;
  transition: all 0.18s linear;
  transform: translateX(100%);
}
</style>