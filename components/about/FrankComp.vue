<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'frank'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          朱哲樺 Frank
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑六 前、後端環境建置負責人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              確保前、後端環境如期建立
            </li>
            <li class="text-gray-700">
              與組員討論訂定前、後端 Git Flow
            </li>
            <li class="text-gray-700">
              建立 commit check 機制（Husky）
            </li>
            <li class="text-gray-700">
              建立 GitHub Action 進行 ESlint、Typescript 檢查
            </li>
            <li class="text-gray-700">
              負責週期內確認組員技術研究狀況及專案環境適應狀況
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              後端伺服器建置：Zeabur
            </li>
            <li>
              第三方服務串接：Firebase、Google Auth、藍新金流
            </li>
            <li>
              專案開發：
              <ul class="list-disc space-y-2 pl-5">
                <li>
                  前端專案 (Nuxt / Tailwind / Nuxt UI / Pinia)
                  <ul>
                    <li>第三方登入串接</li>
                    <li>會員中心</li>
                    <li>帳號啟用</li>
                    <li>訂閱串接</li>
                    <li>付款串接</li>
                    <li>幸福案例</li>
                  </ul>
                </li>
                <li>
                  後端專案 (Express / TypeScript / MongoDB / Mongoose / Swagger)
                  <ul>
                    <li>登入、註冊、第三方登入</li>
                    <li>藍新金流</li>
                    <li>會員中心</li>
                    <li>幸福案例</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              容器開發：
              <ul class="list-disc space-y-2 pl-5">
                <li>撰寫 Dockerfile 及docker-compose</li>
                <li>
                  配置 Nginx
                </li>
              </ul>
            </li>
            <li>
              其他開發項目：
              <ul class="list-disc space-y-2 pl-5">
                <li>Line Notify</li>
                <li>GitHub Action</li>
                <li>Husky</li>
              </ul>
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
          <h3>前端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>解耦優化</li>
            <li>Vitest 單元測試</li>
            <li>Playwright E2E測試</li>
            <li>細節：搜尋頁無需登入、卡片內頁細節、精選文章功能、統一管理載入或提示狀態</li>
          </ul>
          <h3>後端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>Redis 快取</li>
            <li>Load Balance 配置</li>
            <li>DB Read、Write 分離</li>
            <li>Jest 單元測試</li>
            <li>GCP 雲端部署（Cloud Run or VM）</li>
            <li>細節：熱門標籤統計、配對/刊登/資料揭露邏輯、搜尋/配對資料邏輯、卡片內頁取得各列表單筆資料、近期刊登列表</li>
          </ul>
        </div>

        <div>
          <h2>技術支援分享</h2>
          <p>
            JWT 實作 :
            <a
              href="https://wistful-cod-85c.notion.site/JWT-0ca9525a8a844de5a670938e9131ab79?pvs=4"
            >Notion 連結</a>
          </p>
          <p>
            NuxtUI 配置 :
            <a
              href="https://wistful-cod-85c.notion.site/NuxtUI-Icon-e5598fa99b454cc5a05758f21663ef63?pvs=4"
            >Notion 連結</a>
          </p>
          <p>
            GitHub Action 配置 :
            <a
              href="https://wistful-cod-85c.notion.site/Github-Action-4ad981c65c854445ad052df9226e8865?pvs=4"
            >Notion 連結</a>
          </p>
          <p>
            HttpOnly 配置 :
            <a
              href="https://wistful-cod-85c.notion.site/HttpOnly-c4d064814e9e4bcab23076b82dd5b8fb?pvs=4"
            >Notion 連結</a>
          </p>
          <p>
            漸層邊框元件化使用說明 :
            <a
              href="https://wistful-cod-85c.notion.site/CSS-f26bb0f8038d41149220ef0e5e60d438?pvs=4"
            >Notion 連結</a>
          </p>
        </div>

        <h3 class=" mt-20 text-center">
          聯絡信箱
        </h3>
        <p class="text-center">
          <a href="mailto:a0978006326@gmail.com">a0978006326@gmail.com</a>
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
