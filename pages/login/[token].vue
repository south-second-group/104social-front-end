<script setup>
import { auth } from '@/apis/repositories/auth'

definePageMeta({
  layout: 'login',
})

const router = useRouter()
const route = useRoute()

const state = reactive({
  account: '',
  password: '',
})

// 處理valid
function validate(state) {
  const errors = []
  if (!state.account)
    errors.push({ path: 'account', message: '帳號不能為空' })
  else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.account))
    errors.push({ path: 'account', message: '信箱格式錯誤' })

  if (!state.password)
    errors.push({ path: 'password', message: '密碼不能為空' })
  else if (state.password.length < 8)
    errors.push({ path: 'password', message: '密碼需要8碼以上' })
  return errors
}

// 點擊登入按鈕
async function login() {
  try {
    const response = await auth.login(state)
    if (response.status === true) {
      toast('登入成功！正在跳轉...', 'success')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

// Google登入
function handleGoogleLogin() {
  window.location.href = process.env.GOOGLE_LOGIN_LOCATION
}

// toast
const toastMessage = ref('')
const toastType = ref('')
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// 切換密碼可見/不可見
const showPassword = ref(false)
const passwordInputType = ref('password')
function toggleShowPassword() {
  showPassword.value = !showPassword.value
  passwordInputType.value = showPassword.value ? 'text' : 'password'
}

// token
const token = ref(route.params.token)

useAsyncData(async () => {
  if (token.value) {
    try {
      const res = await auth.googleWriteCookie(token.value)
      if (res.status) {
        localStorage.setItem('avatar', res.data.avatar)
        toast('登入成功！正在跳轉...', 'success')
        setTimeout(() => {
          router.push('/')
        }, 1500)
      }
    }
    catch (error) {
      toast('登入成功！正在跳轉...', 'success')
    }
  }
})
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row">
    <LoginImage />
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
          登入
        </h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="login"
        >
          <UFormGroup
            label="帳號"
            name="account"
          >
            <UInput
              v-model="state.account"
              placeholder="請輸入Email"
            />
          </UFormGroup>

          <UFormGroup
            label="密碼"
            name="password"
          >
            <div class="relative">
              <UInput
                v-model="state.password"
                :type="passwordInputType"
                placeholder="請輸入密碼"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                @click="toggleShowPassword"
              >
                <span v-if="showPassword"><icon-heroicons:eye-slash /></span>
                <span v-else><icon-heroicons:eye /></span>
              </button>
            </div>
          </UFormGroup>

          <p class="text-right text-sm text-gray-500">
            <NuxtLink
              to="/forget-password"
              class="font-semibold text-primary-dark"
            >
              忘記密碼?
            </NuxtLink>
          </p>

          <button
            type="submit"
            class="btn-linear-md"
            style="width:100%;max-width: 100vw;"
          >
            <p>登入</p>
          </button>
        </UForm>

        <p class="text-B3 my-4 text-center text-gray-500">
          還沒有帳號? <NuxtLink
            to="login"
            class="font-semibold text-primary-dark"
          >
            立即註冊
          </NuxtLink>
        </p>

        <div class="flex flex-col items-center justify-center">
          <div class="w-full">
            <div class="mb-4 flex items-center">
              <div class="flex-1 border-t-2 border-gray-200"></div>
              <span class="px-4 text-sm text-gray-600">快速登入</span>
              <div class="flex-1 border-t-2 border-gray-200"></div>
            </div>
            <div class="flex justify-between">
              <button
                type="button"
                class="btn-withIcon-gray-outline me-3 flex w-1/2 items-center"
                @click.prevent="handleGoogleLogin"
              >
                <img
                  src="~assets/img/login/googleIcon.png"
                  alt="Google Image"
                  class="pe-2"
                > Google 登入
              </button>
              <button class="btn-withIcon-gray-outline flex w-1/2 items-center">
                <img
                  src="~assets/img/login/lineIcon.png"
                  alt="Line Image"
                  class="pe-2"
                > Line 登入
              </button>
            </div>
          </div>
        </div>
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

<style lang="scss" scoped>
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
.btn-withIcon-gray-outline {
  padding: 6px 18px;
  border: 2px solid #e4e4e7;
  border-radius: 999px;
  justify-content: center;
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
