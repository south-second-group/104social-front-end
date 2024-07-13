<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'william'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          陳威良 <span class=" font-montserrat">William</span>
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑七 角色端建置負責人</p>
          <p>里程碑八 專題簡報製作人</p>
          <p>里程碑九 線下專題發表人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              主持每週會議，確認每個人的開發進度，討論技術內容和需要協助的地方，適時提供想法、建議或技術經驗
            </li>
            <li class="text-gray-700">
              確認進度後，規劃每個人下個開發目標，分配開發議題，避免個人負責過多項目
            </li>
            <li class="text-gray-700">
              每週進行教練會議，報告本週團隊和團員開發進度
            </li>
            <li class="text-gray-700">
              上線驗收前，與團員確認開發進度，提醒最後更新時間，進行最後測試，確認上線網站正常
            </li>
            <li class="text-gray-700">
              專案結束前，統籌簡報內容和提供角色配音想法，製作簡報並在最後與大家分享開發成果
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              團隊帳號建置： <br>
              Google、GitHub、Mongo atlas、Vercel、Render
            </li>
            <li>
              專案初始建置：
              <ul class="list-disc space-y-2 pl-5">
                <li>
                  <NuxtLink
                    target="blank"
                    to="https://github.com/south-second-group/104social-front-end/tree/main"
                  >
                    前端專案
                  </NuxtLink> (Nuxt / Tailwind / Nuxt UI / Pinia)
                </li>
                <li>
                  <NuxtLink
                    target="blank"
                    to="https://github.com/roceil/104_Backend/tree/main"
                  >
                    後端專案
                  </NuxtLink> (Express / TypeScript / MongoDB / Mongoose / Swagger)
                </li>
              </ul>
            </li>
            <li>
              專案部署雲端：
              <ul class="list-disc space-y-2 pl-5">
                <li>前端專案部署 Vercel</li>
                <li>
                  後端專案部署 Zeabur (原為 Render，因休眠問題改用 Zeabur)
                </li>
              </ul>
            </li>
            <li>
              前端畫面切版：<br>邀約/評價/收藏/拒絕往來列表、評價內頁、配對設定、配對結果、登入註冊動畫、關於我們頁、Tailwind設定檔、<NuxtLink
                target="_blank"
                to="/demo/FigmaDemoPage"
              >
                Utils
                各種元件（按鈕、彈窗、卡片）
              </NuxtLink>
            </li>
            <li>
              前端串接 API：<br><NuxtLink
                target="_blank"
                to="https://github.com/south-second-group/104social-front-end/blob/main/composables/useGetGenerativeModelGP.js"
              >
                Gemini
                API
              </NuxtLink>、首頁搜尋、首頁精選、搜尋對象頁、條件設定、配對設定、配對結果、評價列表
            </li>
            <li>
              後端開發 API：<br><NuxtLink
                target="_blank"
                to="https://github.com/roceil/104_Backend/blob/main/src/controllers/searchController.ts"
              >
                關鍵字和標籤搜尋
              </NuxtLink>、會員條件設定、配對設定、配對結果、評價列表、精選會員、扣除點數、可能也喜歡推薦
            </li>
            <li>
              QA 功能測試：<br>全站功能測試，若有問題，回報問題後，提供想法、解決方案、嘗試協助解決
            </li>
            <li>
              SEO 搜尋優化：
              <ul class="list-disc space-y-2 pl-5">
                <li>提交 Google search console / Microsoft Webmaster Tools</li>
                <li>使用 HTML 標記驗證</li>
                <li>產生 sitemap</li>
                <li>設定首頁 Meta 參數</li>
                <li>調整搜尋結果</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>前端</h3>
          <p class=" font-montserrat">
            Nuxt 3 | Tailwind CSS | Pinia | Nuxt UI | GitHub Action | ESLint |
            vee-validate | Gemini API | SEO | Husky | Git
          </p>
          <h3>後端</h3>
          <p class=" font-montserrat">
            Express 4 | MongoDB / mongoose | Socket.io | Google Login |
            TypeScript | JWT | GitHub Action | ESLint | Swagger | NewebPay |
            Firebase Storage | Docker | Nginx | Husky | Git
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>前端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>效能優化</li>
            <li>Vitest 單元測試</li>
            <li>Playwright 端對端測試</li>
            <li>i18n 國際化</li>
            <li>細節：搜尋頁無需登入、卡片內頁介面細節、精選文章功能、統一管理載入或提示狀態、是否刊登和持續配對邏輯、管理者後台</li>
          </ul>
          <h3>後端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>負載平衡</li>
            <li>Jest 單元測試</li>
            <li>Docker 容器化技術</li>
            <li>GCP 雲端部署</li>
            <li>細節：熱門標籤統計、配對/刊登/資料揭露邏輯、搜尋/配對資料邏輯、卡片內頁取得各列表單筆資料、近期刊登列表、管理者後台</li>
          </ul>
        </div>

        <div>
          <h2>技術支援分享</h2>
          <h3>Websocket (通知、聊天) </h3>
          <p>
            <NuxtLink
              target="_blank"
              to="/demo/WsDemoPage"
            >
              DEMO
            </NuxtLink>
            <span>(需輸入 Swagger 文件中的</span>
            <a
              target="_blank"
              href="https://one04social-back-end.onrender.com/api-doc/#/test%20Users/post_api_test_v1_user_login"
            > 登入 API </a>
            <span>的 token )</span>
          </p>
          <p>
            前端
            <a
              href="https://github.com/south-second-group/104social-front-end/blob/main/pages/demo/WsDemoPage.vue"
            >GitHub</a>
          </p>
          <p>
            後端
            <a href="https://github.com/south-second-group/104social-back-end/blob/main/service/ws.ts">GitHub</a>
          </p>
          <h3>藍新金流</h3>
          <p>
            <a href="https://github.com/south-second-group/104social-back-end/blob/main/routes/payment.ts">GitHub</a>
          </p>
          <h3>Firebase Storage 圖庫</h3>
          <p>
            <a href="https://github.com/south-second-group/104social-back-end/blob/main/service/firebase.ts">GitHub</a>
          </p>
          <h3>Google 第三方登入</h3>
          <p>
            <a href="https://github.com/south-second-group/104social-back-end/blob/main/routes/auth.ts">GitHub</a>
          </p>
        </div>

        <div>
          <h2 class="font-montserrat">
            Contributions to main, excluding merge commits（Apr 14, 2024 – Jul 2, 2024）
          </h2>
          <div class=" flex flex-col justify-center gap-3 md:flex-row">
            <div class="md:w-1/2 ">
              <p>
                <a
                  target="_blank"
                  class=" font-montserrat !underline"
                  href="https://github.com/south-second-group/104social-front-end/graphs/contributors"
                >front-end</a>
              </p>
              <img
                class="  h-64 w-full rounded-md"
                src="public/about/william-frontend.jpg"
                alt="william-frontend"
              >
            </div>
            <div class="md:w-1/2 ">
              <p>
                <a
                  target="_blank"
                  class=" font-montserrat !underline"
                  href="https://github.com/roceil/104_Backend/graphs/contributors"
                >back-end</a>
              </p>
              <img
                class="  h-64 w-full rounded-md"
                src="public/about/william-backend.jpg"
                alt="william-backend"
              >
            </div>
          </div>
        </div>

        <h3 class=" mt-20 text-center">
          聯絡信箱
        </h3>
        <p class="text-center">
          <a
            class=" font-montserrat"
            href="mailto:snowman12320@gmail.com"
          >snowman12320@gmail.com</a>
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
  transition: all 300ms ease-in-out;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
}

.main {
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
