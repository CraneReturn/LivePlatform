<template>
  <div id="myChart" class="echarsForm adminUserEchars"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { reactive, ref, onMounted } from "vue";
const initeCharts = () => {
  let myChart = echarts.init(document.getElementById("myChart"));
  // 绘制图表
  myChart.setOption(state.option);
};
const state = reactive({
  option: {
    title: {
      text: "用户年龄",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["20岁以下", "20-30岁", "30-40岁", "40-50岁", "50岁以上"],
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ["pie", "funnel"],
          option: {
            funnel: {
              x: "25%",
              width: "50%",
              funnelAlign: "left",
              max: 1548,
            },
          },
        },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    calculable: true,
    series: [
      {
        name: "用户年龄",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "20岁以下" },
          { value: 310, name: "20-30岁" },
          { value: 234, name: "30-40岁" },
          { value: 135, name: "40-50岁" },
          { value: 1548, name: "50岁以上" },
        ],
      },
    ],
  },
});
onMounted(() => {
  initeCharts();
});
</script>

<style>
</style>