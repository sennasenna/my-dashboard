
<template>
    <div class="table-container max-h-96 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-900">
      <table class="min-w-full">
      <thead class="bg-gray-50 dark:bg-gray-800 sticky top-0">
        <tr>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{ $t('bet_table.matchtime') }}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.league')}}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.home_team')}}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.away_team')}}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.betcontent')}}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.bettime')}}</th>
          <th class="border-b px-4 py-2 text-left font-medium text-gray-900 dark:text-gray-100 dark:border-gray-600">{{$t('bet_table.betresult')}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bet in bets" :key="bet.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ dayjs(bet.match_time).format("YYYY-MM-DD HH:mm") }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ bet.league }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ bet.home_team }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ bet.away_team }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ bet.bet_content }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ dayjs(bet.bet_time).format("YYYY-MM-DD HH") }}</td>
          <td class="border-b px-4 py-2 dark:border-gray-600 dark:text-gray-100">{{ bet.result || '-'}}</td>
        </tr>
      </tbody>
    </table>

  </div>


</template>

<script setup>

import { onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'

const bets = ref([])
const props = defineProps({
  fetchApi: {
    type: Function,
    required: true
  },
  apiParams: {
    type: Object,
    default: () => ({})
  }
})

async function loadData() {
  bets.value = await props.fetchApi(props.apiParams)
}

onMounted(loadData)

// 如果参数变化，重新加载
watch(() => props.apiParams, loadData, { deep: true })

</script>
