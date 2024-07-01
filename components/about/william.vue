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
          陳威良 William
        </h1>

        <div class="">
          <h2>專案角色</h2>
          <p>里程碑七 角色端建置負責人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              主持每週團內會議，確認每個人的開發進度，討論技術內容和需要協助的地方，適時提供想法、建議或技術經驗
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
              專案建置：
              <ul>
                <li>前端專案 (Nuxt / Tailwind / Nuxt UI / Pinia)</li>
                <li>
                  後端專案 (Express / TypeScript / MongoDB / Mongoose / Swagger)
                </li>
              </ul>
            </li>
            <li>
              專案部署：
              <ul>
                <li>前端專案部署 Vercel</li>
                <li>
                  後端專案部署 Zeabur (原為 Render，因休眠問題改用 Zeabur)
                </li>
              </ul>
            </li>
            <li>
              搜尋優化：
              <ul class="list-decimal space-y-2 pl-5">
                <li>提交 Google search console / Microsoft Webmaster Tools</li>
                <li>使用 HTML 標記驗證</li>
                <li>產生 sitemap</li>
                <li>設定首頁 Meta 參數</li>
                <li>調整搜尋結果</li>
              </ul>
            </li>
            <li>
              前端切版：<br>邀約/評價/收藏/拒絕往來列表、評價內頁、配對設定、配對結果、登入註冊動畫、Tailwind設定檔、Utils
              各種元件（按鈕、彈窗、卡片）
            </li>
            <li>
              前端串接 API：<br>Gemini
              API、首頁搜尋、首頁精選、搜尋對象頁、條件設定、配對設定、配對結果、評價列表
            </li>
            <li>
              後端開發 API：<br>關鍵字和標籤搜尋、會員條件設定、配對設定、配對結果、評價列表、精選會員、扣除點數、可能也喜歡推薦
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>前端</h3>
          <p>
            Nuxt 3 | Tailwind 3 | Pinia | Nuxt UI | Github Action | Eslint |
            vee-validate | Gemini API | SEO
          </p>
          <h3>後端</h3>
          <p>
            Express 4 | MongoDB / mongoose | Socket.io | Google Login |
            TypeScript | JWT | Github Action | Eslint | Swagger | NewebPay |
            FireBase Storage
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>前端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>效能優化</li>
            <li>Vitest 單元測試</li>
            <li>Playwright E2E測試</li>
          </ul>
          <h3>後端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>JEST 單元測試</li>
            <li>Docker 容器化技術</li>
            <li>GCP 雲端部署</li>
          </ul>
        </div>

        <div>
          <h2>技術支援分享</h2>
          <h3>Websocket (通知、聊天)</h3>
          <p>
            前端：<a
              href="https://github.com/south-second-group/104social-back-end/blob/main/service/ws.ts"
            >https://github.com/south-second-group/104social-back-end/blob/main/service/ws.ts</a>
          </p>
          <p>
            後端：<a
              href="https://github.com/south-second-group/104social-front-end/blob/main/pages/demo/WsDemoPage.vue"
            >https://github.com/south-second-group/104social-front-end/blob/main/pages/demo/WsDemoPage.vue</a>
          </p>
          <h3>藍新金流</h3>
          <p>
            <a
              href="https://github.com/south-second-group/104social-back-end/blob/main/routes/payment.ts"
            >https://github.com/south-second-group/104social-back-end/blob/main/routes/payment.ts</a>
          </p>
          <h3>FireBase Storage 圖庫</h3>
          <p>
            <a
              href="https://github.com/south-second-group/104social-back-end/blob/main/service/firebase.ts"
            >https://github.com/south-second-group/104social-back-end/blob/main/service/firebase.ts</a>
          </p>
          <h3>Google 第三方登入</h3>
          <p>
            <a
              href="https://github.com/south-second-group/104social-back-end/blob/main/routes/auth.ts"
            >https://github.com/south-second-group/104social-back-end/blob/main/routes/auth.ts</a>
          </p>
          <h3 class=" mt-20 text-center">
            聯絡信箱
          </h3>
          <p class=" text-center">
            snowman12320@gmail.com
          </p>
        </div>
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
