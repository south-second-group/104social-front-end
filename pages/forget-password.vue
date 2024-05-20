<script lang="ts" setup>
import { reactive } from 'vue'
import { auth } from '../apis/repositories/auth'

export interface ForgetPasswordObj {
  account: string
}

const forgetPasswordObj = reactive<ForgetPasswordObj>({
  account: '',
})

const accountError = ref('')
const toastMessage = ref('')
const toastType = ref('') // 'success' or 'error'

async function ForgetPassword() {
  if (!validateForgetPassword())
    return

  try {
    const response = await auth.login(forgetPasswordObj)
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

function validateForgetPassword() {
  let isValid = true
  account.value = ''

  if (!forgetPasswordObj.account) {
    accountError.value = '信箱欄位不能為空'
    isValid = false
  }
  else if (!/\S[^\s@]*@\S+\.\S+/.test(forgetPasswordObj.account)) {
    accountError.value = '信箱格式錯誤'
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
</script>

<template>
  <div class="flex h-screen">
    <div
      class="flex h-screen w-2/3 flex-col items-center"
    >
      <img
        src="~assets/img/login/login.png"
        alt="login.png"
        class=" size-full"
      >
    </div>

    <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-1 lg:px-8">
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
        <form
          class="space-y-6"
          @submit.prevent="ForgetPassword"
        >
          <div>
            <label
              for="account"
              class="block text-start text-sm font-medium leading-6"
            >
              信箱
            </label>

            <div class="mt-2">
              <input
                id="account"
                v-model="forgetPasswordObj.account"
                name="account"
                type="email"
                autocomplete="account"
                :class="{ 'border-red-500': accountError }"
                placeholder="請輸入信箱"
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
            <button
              type="submit"
              class="btn-linear-md block w-full"
              style="width:100%;max-width: 100vw;"
            >
              <p>發送</p>
            </button>
          </div>
        </form>
        <p class="mt-3 text-center text-sm text-gray-500">
          已有帳號? <router-link
            to="login"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            立即登入
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
