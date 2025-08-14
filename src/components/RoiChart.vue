
<template>
  <div ref="chart" style="height: 300px; width: 100%;"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue'
import { useModelStore } from '../store/modelStore'

const chart = ref(null)
const myChart = ref(null) // 保存实例
const modelStore = useModelStore()

const props = defineProps({
  sportType: {
    type: String,
    default: 'football'
  }
})

const updateChart = () => {
  if (!myChart.value) return
  myChart.value.setOption({
    xAxis: {
      type: 'category',
      data: modelStore.roiData[props.sportType].map(item => item.invest)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: modelStore.roiData[props.sportType].map(item => item.value),
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  })
}

onMounted(() => {
  myChart.value = echarts.init(chart.value)
  updateChart()
})

// 监听 sportType 变化
watch(
  () => props.sportType,
  () => {
    updateChart()
  }
)

</script>
