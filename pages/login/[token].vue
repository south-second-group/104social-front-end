<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth } from '../../apis/repositories/auth'

export interface LoginObj {
  account: string
  password: string
}

const loginObj = reactive<LoginObj>({
  account: '',
  password: '',
})

const accountError = ref('')
const passwordError = ref('')
const showPassword = ref(false)
const router = useRouter()

const toastMessage = ref('')
const toastType = ref('') // 'success' or 'error'

async function login() {
  if (!validateLogin())
    return

  try {
    const response = await auth.login(loginObj)
    if (response.status === true) {
      localStorage.setItem('name', response.data.name)
      toast('登入成功！正在跳轉...', 'success')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    }
    else {
      toast(response.message || '登入失敗，請檢查數據', 'error')
    }
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}
function validateLogin() {
  let isValid = true
  accountError.value = ''
  passwordError.value = ''

  if (!loginObj.account) {
    accountError.value = '信箱欄位不能為空'
    isValid = false
  }
  else if (!/\S[^\s@]*@\S+\.\S+/.test(loginObj.account)) {
    accountError.value = '信箱格式錯誤'
    isValid = false
  }

  if (!loginObj.password) {
    passwordError.value = '密碼不能為空'
    isValid = false
  }
  else if (loginObj.password.length < 6) {
    passwordError.value = '密碼需要6碼以上'
    isValid = false
  }

  return isValid
}
function handleGoogleLogin() {
  window.location.href = 'https://104-dev.zeabur.app/api/v1/google'
}
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value
}
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type // 'success' 或 'error'
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000) // 隐藏 toast 信息
}

const route = useRoute()
const token = ref<null | string>(null)

token.value = route.params.token as string

const res = await auth.googleWriteCookie(token.value)

// 監聽 token 有沒有值，有的話就跳轉回首頁
onMounted(() => {
  if (res.status) {
    localStorage.setItem('name', res.data.name)
    localStorage.setItem('avatar', res.data.avatar)
    toast('登入成功！正在跳轉...', 'success')
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
})
</script>

<template>
  <div class="flex h-screen">
    <div
      class="flex h-screen w-2/3 flex-col items-center"
    >
      <img
        src="~assets/img/login/login.png"
        alt="Login Image"
        class="size-full"
      >
    </div>

    <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-1 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">
          登入
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          class="space-y-6"
          @submit.prevent="login"
        >
          <div>
            <label
              for="account"
              class="block text-start text-sm font-medium leading-6"
            >
              帳號
            </label>

            <div class="mt-2">
              <input
                id="account"
                v-model="loginObj.account"
                name="account"
                type="email"
                autocomplete="account"
                :class="{ 'border-red-500': accountError }"
                placeholder="請輸入 Email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <p
                v-if="accountError"
                class="mt-1 text-xs text-red-500"
              >
                {{ accountError }}
              </p>
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6"
            >
              密碼
            </label>
            <div class="relative mt-2">
              <input
                id="password"
                v-model="loginObj.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                :class="{ 'border-red-500': passwordError }"
                placeholder="請輸入密碼"
                class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                @click="togglePasswordVisibility"
              >
                <span>{{ showPassword ? '隱藏' : '顯示' }}</span>
              </button>
              <p
                v-if="passwordError"
                class="mt-1 text-xs text-red-500"
              >
                {{ passwordError }}
              </p>
            </div>
          </div>

          <p class=" text-right text-sm text-gray-500">
            <router-link
              to="forget-password"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              忘記密碼?
            </router-link>
          </p>

          <div>
            <button
              type="submit"
              class="btn-linear-md block w-full"
              style="width:100%;max-width: 100vw;"
            >
              <p>登入</p>
            </button>
          </div>

          <p class=" text-center text-sm text-gray-500">
            還沒有帳號? <router-link
              to="sign-up"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              立即註冊
            </router-link>
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
                  class="mr-2 w-1/2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  @click="handleGoogleLogin"
                >
                  Google 登入(未實作)
                </button>
                <button class="ml-2 w-1/2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                  Line 登入(未實作)
                </button>
              </div>
            </div>
          </div>
        </form>
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

    <!-- Google token -->
    <img
      :src="`http://localhost:3001/api/v1/google/check-auth/${token}`"
      alt="google-check-auth"
      class="hidden"
    >
  </div>
</template>

<style scoped>
    .input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 0.375rem;
        transition: border-color 0.3s;
    }

    .input:focus {
        border-color: #4a56e2; /* Indigo focus ring */
    }

    .border-red-500 {
        border-color: #f87171; /* Red border for errors */
    }

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
        display: block; /* 或者根据需要通过JavaScript控制显示 */
    }

    .toast.success {
        background-color: #4CAF50; /* 绿色背景 */
    }

    .toast.error {
        background-color: #F44336; /* 红色背景 */
    }
    .input-class {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
</style>
