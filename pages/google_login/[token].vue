<script setup>
import { auth } from '../../apis/repositories/auth'

const message = ref('')
const router = useRouter()
const route = useRoute()

async function ChangeAccountStatus() {
  const token = route.params.token
  try {
    const res = await auth.redirect(token)
    if (res.status === true)
      message.value = 'Google 登入成功，即將回到登入頁...'
    setTimeout(() => {
      router.push('/')
    }, 3000)
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
