<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'eric'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          稚庭 Eric
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑五 API 規格負責人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              因應前端需求建立相關 API
            </li>
            <li class="text-gray-700">
              與組員討論技術項目協作推進進度
            </li>
            <li class="text-gray-700">
              研究 socket 相關知識，撰寫房間相關邏輯
            </li>
            <li class="text-gray-700">
              討論搜尋列表框架，建立搜尋初版邏輯
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              搜尋列表
            </li>
            <li>
              撰寫新增大量使用者資料測試用腳本
            </li>
            <li>
              聊天室後端建置(sokcet.io)
            </li>
            <li>
              部署雲主機測試環境測試跨網域資料
            </li>
            <li>
              建立收藏相關model
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>前端</h3>
          <p>
            Nuxt 3 | Tailwind CSS | Pinia | Nuxt UI | GitHub Action | ESLint |
            vee-validate | Gemini API | SEO | Husky | Git
          </p>
          <h3>後端</h3>
          <p>
            Express 4 | MongoDB / mongoose | Socket.io | Google Login |
            TypeScript | JWT | GitHub Action | ESLint | Swagger | NewebPay |
            Firebase Storage | Docker | Nginx | Husky | Git
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>後端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>聊天室性能優化</li>
            <li>大量使用者負載</li>
            <li>聊天室群組</li>
            <li>伺服器部屬docker</li>
            <li>協助優化搜尋列表邏輯</li>
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
