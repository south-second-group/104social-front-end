<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const name = ref('請先登入')
const router = useRouter()

onMounted(() => {
  const storedName = localStorage.getItem('name')
  name.value = storedName || '請先登入'
})

function logout() {
  localStorage.removeItem('name')
  localStorage.removeItem('token')
  name.value = '請先登入' // 重置狀態
  router.push('/')
}
</script>

<template>
  <div class="item-center py-12 text-center">
    <div>
      <!-- 根據 name 的值顯示不同訊息 -->
      <h1 v-if="name === '請先登入'">
        歡迎來到104緣來如此首頁，請先登入
      </h1>
      <h1 v-else>
        登入成功，歡迎 {{ name }}
      </h1>
    </div>
    <div v-if="name === '請先登入'">
      <RouterLink
        to="/login"
        class="mr-5 mt-5 inline-block px-3 py-4 ring-1"
      >
        登入
      </RouterLink>
      <RouterLink
        to="/sign-up"
        class="mt-5 inline-block px-3 py-4 ring-1"
      >
        註冊
      </RouterLink>
    </div>
    <div v-else>
      <RouterLink
        to="/reset-password"
        class="mt-5 inline-block px-3 py-4 ring-1"
      >
        重設密碼
      </RouterLink>
      <button
        class="mt-5 inline-block cursor-pointer px-3 py-4 ring-1"
        @click="logout"
      >
        登出
      </button>
    </div>
    <!-- 威廉建立的元件 -->
    <FigmaDemo />
  </div>
</template>
