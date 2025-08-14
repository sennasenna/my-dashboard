<template>
  <div ref="chart" style="height: 300px;"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
import { useModelStore } from '../store/modelStore'

const chart = ref(null)
const modelStore = useModelStore()

onMounted(() => {
  const myChart = echarts.init(chart.value)

  const option = {
    series: [
      {
        name: '命中率',
        type: 'pie',
        radius: '70%',
        data: [
          { value: modelStore.hitRate, name: '命中' },
          { value: 100 - modelStore.hitRate, name: '未命中' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }

  myChart.setOption(option)
})
</script>
