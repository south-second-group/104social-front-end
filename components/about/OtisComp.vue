<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'otis'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          陳仕濠 Otis
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑二 題目確認、使用者故事、網站地圖、使用技術討論</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              參與團隊討論使用者故事、網站地圖、API 規劃
            </li>
            <li class="text-gray-700">
              研究 socket 相關知識，並與後端討論合作開發
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              前端切版: 首頁、尋找對象、站內通知與聊天室
            </li>
            <li>
              串接聊天室 (socket.io-client) 與聊天室 UI 介面處理
            </li>
            <li>
              串接通知功能 API 與使用 socket 達成及時通知效果
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>前端</h3>
          <p>
            Nuxt 3 | Tailwind CSS | Pinia | Nuxt UI | GitHub Action | ESLint | Husky | Git | socket.io-client
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>前端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>聊天室使用者介面操作回饋</li>
            <li>收到 / 已讀通知訊息畫面狀態優化</li>
          </ul>
        </div>

        <h3 class=" mt-20 text-center">
          聯絡信箱
        </h3>
        <p class="text-center">
          <a href="">-</a>
        </p>
      </main>
    </article>
  </transition>
</template>

<style lang="scss" scoped>
.article {
  background: linear-gradient(#fff 0 0) padding-box,
    linear-gradient(to right, #fe839a, #4a72ff) border-box !important;
  border: 2px solid transparent !important;
}

.slide-enter-active,
.slide-leave-active {
  // transition: all 1s ease-in-out;
  // overflow: hidden;
}
.slide-enter,
.slide-leave-to {
  // max-height: 0;
  // opacity: 0;
}
.slide-enter-to,
.slide-leave {
  // max-height: 1000px;
  // opacity: 1;
}

.main {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
  }

  h2 {
    color: #2980b9;
    margin-top: 30px;
  }

  h3 {
    color: #27ae60;
  }

  ul {
    padding-left: 20px;

    li {
      margin-bottom: 5px;
    }

    ul {
      margin-top: 5px;
    }
  }

  p {
    margin-bottom: 10px;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  div {
    margin-bottom: 30px;
  }
}
</style>
