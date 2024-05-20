<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { auth } from '../apis/repositories/auth'

export interface SignUpObj {
  email: string
  password: string
  confirmPassword: string
  username: string
}

const signUpObj = reactive<SignUpObj>({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
})

const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const usernameError = ref('')

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const toastMessage = ref('')
const toastType = ref('') // 'success' or 'error'

async function clickSignUp() {
  if (!validateSignUp())
    return

  try {
    const response = await auth.signUp(signUpObj)
    if (response.status === true)
      toast('會員驗證信件已寄出!已發送驗證信件到您申請指定的信箱', 'success')

    else
      toast(response.message || '註冊未成功，請檢查數據', 'error')
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

function validateSignUp() {
  let isValid = true
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  usernameError.value = ''

  if (!signUpObj.email) {
    emailError.value = '信箱欄位不能為空'
    isValid = false
  }
  else if (!/\S[^\s@]*@\S+\.\S+/.test(signUpObj.email)) {
    emailError.value = '信箱格式錯誤'
    isValid = false
  }

  if (!signUpObj.password) {
    passwordError.value = '密碼不能為空'
    isValid = false
  }
  else if (signUpObj.password.length < 6) {
    passwordError.value = '密碼需要6碼以上'
    isValid = false
  }

  if (!signUpObj.confirmPassword) {
    confirmPasswordError.value = '確認密碼不能為空'
    isValid = false
  }
  else if (signUpObj.confirmPassword !== signUpObj.password) {
    confirmPasswordError.value = '兩次密碼不一致'
    isValid = false
  }

  if (!signUpObj.username) {
    usernameError.value = '姓名不能為空'
    isValid = false
  }

  return isValid
}

function toast(message, type) {
  toastMessage.value = message
  toastType.value = type // 'success' 或 'error'
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000) // 隐藏 toast 信息
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="flex h-screen">
    <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-1 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="text-center text-2xl font-bold leading-9 tracking-tight">
          註冊
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          class="space-y-6"
          @submit.prevent="clickSignUp"
        >
          <div>
            <label
              for="email"
              class="block text-start text-sm font-medium leading-6"
            >
              信箱
            </label>
            <div class="mt-2">
              <input
                id="email"
                v-model="signUpObj.email"
                name="email"
                type="email"
                autocomplete="email"
                :class="{ 'border-red-500': emailError }"
                placeholder="請輸入Email，ex:104admin@gmail.com"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <p
                v-if="emailError"
                class="mt-1 text-xs text-red-500"
              >
                {{ emailError }}
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
                v-model="signUpObj.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                :class="{ 'border-red-500': passwordError }"
                placeholder="請輸入密碼，至少需要1個英文及7個數字"
                class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="toggleShowPassword"
              >
                <span v-if="showPassword">隱藏</span>
                <span v-else>顯示</span>
              </button>
              <p
                v-if="passwordError"
                class="mt-1 text-xs text-red-500"
              >
                {{ passwordError }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-medium leading-6"
            >
              確認密碼
            </label>
            <div class="relative mt-2">
              <input
                id="confirmPassword"
                v-model="signUpObj.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                name="confirmPassword"
                autocomplete="confirmPassword"
                :class="{ 'border-red-500': confirmPasswordError }"
                placeholder="請再次輸入密碼"
                class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="toggleShowConfirmPassword"
              >
                <span v-if="showConfirmPassword">隱藏</span>
                <span v-else>顯示</span>
              </button>
              <p
                v-if="confirmPasswordError"
                class="mt-1 text-xs text-red-500"
              >
                {{ confirmPasswordError }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6"
            >
              姓名
            </label>
            <div class="mt-2">
              <input
                id="username"
                v-model="signUpObj.username"
                name="username"
                type="text"
                autocomplete="username"
                :class="{ 'border-red-500': usernameError }"
                placeholder="請輸入姓名"
                class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <p
                v-if="usernameError"
                class="mt-1 text-xs text-red-500"
              >
                {{ usernameError }}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="btn-linear-md block w-full"
              style="width:100%;max-width: 100vw;"
            >
              <p>立即註冊</p>
            </button>
          </div>

          <p class="text-center text-sm text-gray-500">
            已有帳號? <router-link
              to="login"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              立即登入
            </router-link>
          </p>
        </form>
      </div>
    </div>
    <div
      class="flex h-screen w-2/3 flex-col items-center"
    >
      <img
        src="~assets/img/login/signUp.png"
        alt="signUp.png"
        class="size-full"
      >
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
