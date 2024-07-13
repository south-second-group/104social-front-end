<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'eva'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          龔玉惠 Eva
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑四 與設計師核對設計稿負責人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              與設計師確認設計稿，確保設計符合需求和標準。
            </li>
            <li class="text-gray-700">
              主持當週會議，準備會議議程,包括設計稿的確認狀況、確保所有議題都得到充分討論。
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              撰寫前端專案 README
            </li>
            <li>
              前端切版：<br>登入、註冊、忘記密碼、重設密碼、儲值/訂閱方案列表、結帳頁
            </li>
            <li>
              前端串接 API：<br>登入、登出、註冊、忘記密碼、我的邀約、我的收藏、拒絕往來列表
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>前端</h3>
          <p>
            Nuxt 3 | Tailwind CSS | Pinia | Nuxt UI | GitHub Action | ESLint |
            vee-validate | Gemini API | SEO | Git
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>前端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>提示視窗添加被邀請者資訊，提高使用者體驗</li>
            <li>line登入邏輯</li>
            <li>會員圖片從僅限單張，調整為一次上傳多張，且可指定顯示的大頭照</li>
            <li>Vitest 單元測試</li>
            <li>Playwright E2E測試</li>
          </ul>
        </div>

        <h3 class=" mt-20 text-center">
          聯絡信箱
        </h3>
        <p class="text-center">
          <a href="mailto:evaevakung33@gmail.com">evaevakung33@gmail.com</a>
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
