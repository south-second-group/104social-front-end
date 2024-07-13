<script setup>
const props = defineProps({
  hoveredTab: String,
})
</script>

<template>
  <transition name="slide">
    <article
      v-if="props.hoveredTab === 'cc'"
      class="article container mt-6 flex justify-center rounded-md pt-6"
    >
      <main class="main text-left">
        <h1 class="text-H3">
          群嘉
        </h1>

        <div>
          <h2>專案角色</h2>
          <p>里程碑二 線稿進度負責人</p>
        </div>

        <div>
          <h2>主要職責</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li class="text-gray-700">
              線稿分配
            </li>
            <li class="text-gray-700">
              線稿進度追蹤
            </li>
          </ul>
        </div>

        <div>
          <h2>開發項目</h2>
          <ul class="list-decimal space-y-2 pl-5">
            <li>
              建立個人資料、邀約、被邀約、黑名單、評價model
            </li>
            <li>
              建立後端專案的swagger
            </li>
            <li>
              建立邀約與被邀約的即時通知(sokcet.io)
            </li>
            <li>
              建立個人資料、邀約、被邀約、黑名單、評價的後端邏輯
            </li>
            <li>
              調整通知、收藏API
            </li>
          </ul>
        </div>

        <div>
          <h2>使用技術</h2>
          <h3>後端</h3>
          <p>
            Express 4 | MongoDB / mongoose | Socket.io | Google Login | TypeScript | JWT | GitHub Action | ESLint | Swagger | NewebPay | Firebase Storage | Docker | Nginx | Husky | Git
          </p>
        </div>

        <div>
          <h2>優化目標</h2>
          <h3>後端</h3>
          <ul class="list-decimal space-y-2 pl-5">
            <li>後台管理系統</li>
            <li>unit test</li>
            <li>後端專案容器化</li>
            <li>Kubernetes 與  ELK Stack</li>
          </ul>
        </div>

        <h3 class=" mt-20 text-center">
          聯絡信箱
        </h3>
        <p class="text-center">
          <a href="mailto:a121515222@gmail.com">a121515222@gmail.com</a>
        </p>
        <h3 class=" mt-3 text-center">
          GitHub
        </h3>
        <p class="text-center">
          <a href="https://github.com/a121515222">https://github.com/a121515222</a>
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
