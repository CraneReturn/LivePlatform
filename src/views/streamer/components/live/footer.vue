<template>
  <div class="footer">
    <div class="frequency">
      <el-select v-model="value" placeholder="Select" style="width: 240px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="beauty"></div>
    <div class="record"></div>
  </div>
</template>
<script setup lang="ts">
    import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>
</script>
<style lang="scss" scoped>
.footer {
  height: 100px;
}
</style>
