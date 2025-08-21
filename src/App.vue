<template>

  <div class="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

    <!-- 顶部导航栏 -->
    <header class="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow flex items-center px-6 z-50">
      <!-- 图标 -->
      <img src="/src/icon/orion2.png" alt="Logo" class="h-14 w-16 mr-3" />

      <!-- 多语言-->
      <select v-model="currentLanguage" @change="changeLanguage($event.target.value)" class="fixed top-2 right-20 px-3 py-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>

      <!-- 显示模式 -->
      <button @click="toggleTheme" class="fixed top-2 right-4 p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
        <!-- 太阳图标 (亮色模式时显示) -->
        <svg v-if="!themeStore.dark" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
        </svg>

        <!-- 月亮图标 (暗色模式时显示) -->
        <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/>
        </svg>
      </button>

    </header>

    <!-- 页面主体 -->
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      <!-- 左侧侧边栏 -->
      <aside class="fixed top-0 left-0 h-screen w-48 bg-white dark:bg-gray-800 shadow-md p-4 space-y-4 border-r border-gray-300 dark:border-gray-700">
        <h2 class="text-lg font-bold mb-4">Sports</h2>
        <button
          class="w-full py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          :class="{ 'bg-gray-300 dark:bg-gray-700': selectedSport === 'football' }"
          @click="selectedSport = 'football'"
        >
          ⚽ {{ $t('football') }}
        </button>
        <button
          class="w-full py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          :class="{ 'bg-gray-300 dark:bg-gray-700': selectedSport === 'basketball' }"
          @click="selectedSport = 'basketball'"
        >
          🏀 {{ $t('basketball') }}
        </button>
      </aside>

      <!-- 右侧内容区 -->
      <main class="flex-1 p-6 space-y-6 ml-48 p-4 border-gray-300 dark:border-gray-700">
        <h1></h1>
        <!-- ROI 曲线 -->
        <section class="p-4 rounded shadow bg-white dark:bg-gray-800">
          <h2 class="text-xl font-semibold mb-4">
            {{ selectedSport === 'football' ? $t("football_roi") : $t("basketball_roi") }}
          </h2>
          <RoiChart :fetchApi="roi_chart_model.fetch_roi"
                    :apiParams="{ bookmaker_id: 0, sport:selectedSport}"/>
        </section>

        <!-- 投注记录 -->
        <section class="p-4 rounded shadow bg-white dark:bg-gray-800">
          <h2 class="text-xl font-semibold mb-4">
            {{ selectedSport === 'football' ? $t("football_comming_bets") : $t("basketball_comming_bets") }}
          </h2>
          <BetsTable :fetchApi="bets_table_model.fetch_bets"
                     :apiParams="{ cut_time: now, type: 'comming', bookmaker_id: 0, sport:selectedSport}"/>
        </section>

        <!-- 投注记录 -->
        <section class="p-4 rounded shadow bg-white dark:bg-gray-800">
          <h2 class="text-xl font-semibold mb-4">
            {{ selectedSport === 'football' ? $t("football_settled_bets") : $t("basketball_settled_bets") }}
          </h2>
          <BetsTable :fetchApi="bets_table_model.fetch_bets"
                     :apiParams="{ cut_time: now, type: 'settled', bookmaker_id: '0', sport:selectedSport}"/>
        </section>

      </main>

    </div>

    <!--底部链接-->
    <footer class="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="flex justify-between items-center">
        <div class="flex-1"></div>

        <div class="flex gap-4 text-sm text-gray-600 dark:text-gray-300">

          <!-- QQ联系 -->
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.082.339-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.507-.402-2.465-1.405-2.465-3.299 0-3.462 2.516-6.634 7.25-6.634 3.807 0 6.769 2.718 6.769 6.343 0 3.78-2.383 6.825-5.692 6.825-1.114 0-2.164-.579-2.518-1.342 0 0-.551 2.098-.686 2.61-.249.951-.924 2.144-1.375 2.87.034.011 1.032.168 1.688.168 6.624 0 11.99-5.367 11.99-11.99C24.007 5.367 18.641.001.017 0z"/>
            </svg>
            <a href="tencent://message/?uin=2502026866&Site=&Menu=yes" class="hover:text-blue-600 dark:hover:text-blue-400">
              QQ
            </a>
          </div>

          <!-- 微信联系 -->
          <div class="flex items-center gap-2 group relative">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.882-1.900 7.60.24-.5-2.973-3.684-5.616-8.342-5.616zm-2.44 5.738c0 .44-.387.8-.86.8-.476 0-.862-.36-.862-.8s.386-.8.862-.8c.473 0 .86.36.86.8zm5.986 0c0 .44-.387.8-.861.8-.475 0-.862-.36-.862-.8s.387-.8.862-.8c.474 0 .86.36.86.8z"/>
              <path d="M17.969 1.188c-1.179 0-2.319.298-3.345.825-2.217 1.139-3.644 3.11-3.644 5.336 0 3.41 2.895 6.183 6.463 6.183.792 0 1.573-.1 2.33-.285.316-.078.647-.017.907.168l1.261.737c.04.023.082.034.125.034.091 0 .165-.074.165-.164 0-.043-.016-.085-.027-.125l-.26-.983a.324.324 0 0 1 .117-.368c1.218-.92 1.926-2.32 1.926-3.802 0-2.83-2.646-5.183-5.896-5.183z"/>
            </svg>
            <span class="hover:text-green-600 dark:hover:text-green-400 cursor-pointer">
              WeChat
            </span>

            <!-- 微信二维码弹窗 -->
            <div class="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-10">
              <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 min-w-[200px]">
                <div class="text-center">
                  <p class="text-xs text-gray-600 dark:text-gray-300 mb-2">扫码添加微信</p>
                  <!-- 这里可以放二维码图片 -->
                  <div class="w-32 h-32 mx-auto bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-2">
                    <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM15 19h2v2h-2zM17 13h2v2h-2zM19 15h2v2h-2zM17 17h2v2h-2zM19 19h2v2h-2z"/>
                    </svg>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400">或微信号: your_wechat_id</p>
                </div>
                <!-- 小箭头 -->
                <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>
              </div>
            </div>
          </div>

          <!-- Telegram联系 -->
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <a href="https://t.me/yourusername" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400">
              Telegram
            </a>
          </div>

        </div>

      </div>
    </div>
  </footer>

  </div>

</template>

<script setup>
import { ref, watch } from 'vue'

/*  -- 主题状态 --  */
import { ThemeStore } from './store/ThemeStore'

const themeStore = ThemeStore()
themeStore.init()
const toggleTheme = themeStore.toggle

/* -- 语言切换 -- */
import { useI18n } from 'vue-i18n'
import { LanguageStore } from './store/LanguageStore'

const currentLanguage = ref(localStorage.getItem('locale') || 'zh')
const { locale } = useI18n()
const language_store = LanguageStore()
const changeLanguage = language_store.changeLanguage

watch(
  () => language_store.currentLocale,
  (newLang) => {
    locale.value = newLang
  },
  { immediate: true } // 页面加载时立即同步一次
)


/* -- 内容显示 -- */
const selectedSport = ref('football') // 默认显示足球

import RoiChart from './components/RoiChart.vue'
import { RoiChartModel } from './store/RoiChartStore'
const roi_chart_model = RoiChartModel()


/*  --订单显示 -- */
import BetsTable from './components/BetsTable.vue'
import { BetsTableModel } from './store/BetsTableStore'

import dayjs from 'dayjs'
const now = dayjs().format('YYYY-MM-DD HH:mm')
const bets_table_model = BetsTableModel()
</script>

<style>
/* 可选：背景过渡更顺滑 */
html {
  transition: background-color 0.3s, color 0.3s;
}
</style>
