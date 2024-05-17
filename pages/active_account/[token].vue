<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '../../apis/repositories/auth'

const message = ref('身分驗證中...')
const router = useRouter()
const route = useRoute()

async function ChangeAccountStatus() {
  const token = route.params.token as string
  try {
    const response = await auth.changeAccountStatus(token)
    if (response.status === true) {
      message.value = '帳號啟用成功，已完成會員驗證！即將回到登入頁...'
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    }
    else {
      message.value = '帳戶啟用失敗，請重新註冊，即將回到註冊頁...'
      setTimeout(() => {
        router.push('/sign-up')
      }, 3000)
    }
  }
  catch (error) {
    message.value = '伺服器錯誤，無法完成身分驗證。請稍後重試...'
    console.error('錯誤訊息:', error)
  }
}
onMounted(() => {
  ChangeAccountStatus()
})
</script>

<template>
  <div class="h-screen py-5 text-center">
    <div class="active-account flex justify-center">
      <div class="container">
        <h1>{{ message }}</h1>
      </div>
    </div>
  </div>
</template>
