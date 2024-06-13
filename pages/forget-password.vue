<script setup>
import { auth } from '../apis/repositories/auth'

definePageMeta({
  layout: 'LoginLayout',
})

const state = reactive({
  email: '',
})

const toastMessage = ref('')
const toastType = ref('')

// 處理valid
function validate(state) {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: '信箱不能為空' })
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email))
    errors.push({ path: 'email', message: '信箱格式錯誤' })

  return errors
}

// 點擊發送按鈕
async function forgetPassword() {
  try {
    const response = await auth.forgetPassword(state)
    if (response.status === true)
      toast('重設密碼信件已寄出', 'success')
    else
      toast(response.message || '重設密碼未成功，請檢查數據', 'error')
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row">
    <LoginImage class="hidden sm:block" />
    <div class="flex min-h-full w-full flex-col justify-center px-6 py-1 lg:w-1/3 lg:px-8">
      <div class="mb-3 flex justify-center">
        <NuxtLink to="/">
          <NuxtImg
            src="/logo.png"
            alt="104 緣來如此"
            class="w-[100px] lg:w-[150px]"
          />
        </NuxtLink>
      </div>
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">
          忘記密碼
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="mb-5">
          請輸入您的註冊帳號時輸入的電子信箱地址，
          我們會透過電子郵件向您寄送重設密碼的連結。
        </div>
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="forgetPassword"
        >
          <UFormGroup
            label="信箱"
            name="email"
          >
            <UInput
              v-model="state.email"
              type="text"
              placeholder="請輸入Email"
            />
          </UFormGroup>

          <button
            type="submit"
            class="btn-linear-md"
            style="width:100%;max-width: 100vw;"
          >
            <p>發送</p>
          </button>

          <p class="text-B3 text-center text-gray-500">
            已有帳號? <NuxtLink
              to="login"
              class="font-semibold text-primary-dark"
            >
              立即登入
            </NuxtLink>
          </p>
        </UForm>
      </div>
    </div>
    <!-- Alert 通知 -->
    <div class="flex h-screen">
      <div
        v-if="toastMessage"
        class="toast"
        :class="[toastType === 'success' ? 'success' : 'error']"
      >
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast.show {
  display: block;
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
  display: block;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}
</style>
