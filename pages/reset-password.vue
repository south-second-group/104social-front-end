<script lang="ts" setup>
import { reactive } from 'vue'
import { auth } from '../apis/repositories/auth'

export interface ResetPasswordObj {
  newPassword: string
  confirmNewPassword: string
}

const resetPasswordObj = reactive<ResetPasswordObj>({
  newPassword: '',
  confirmNewPassword: '',
})

const newPasswordError = ref('')
const confirmNewPasswordError = ref('')
const toastMessage = ref('')
const toastType = ref('') // 'success' or 'error'

const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

async function ResetPassword() {
  if (!validateResetPassword())
    return

  try {
    const response = await auth.resetPassword(resetPasswordObj)
    if (response.status === true) {
      toast('密碼重設成功！正在跳轉...', 'success')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
    else {
      toast(response.message || '密碼重設未成功，請檢查數據', 'error')
    }
  }
  catch (error) {
    const errorMessage = error.response._data.message
    toast(errorMessage, 'error')
  }
}

function validateResetPassword() {
  let isValid = true
  newPasswordError.value = ''
  confirmNewPasswordError.value = ''

  if (!resetPasswordObj.newPassword) {
    newPasswordError.value = '新密碼不能為空'
    isValid = false
  }
  else if (resetPasswordObj.newPassword.length < 6) {
    newPasswordError.value = '密碼需要6碼以上'
    isValid = false
  }

  if (!resetPasswordObj.confirmNewPassword) {
    confirmNewPasswordError.value = '確認新密碼不能為空'
    isValid = false
  }
  else if (resetPasswordObj.newPassword !== resetPasswordObj.confirmNewPassword) {
    confirmNewPasswordError.value = '兩次密碼不一致'
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

function toggleShowNewPassword() {
  showNewPassword.value = !showNewPassword.value
}

function toggleShowConfirmNewPassword() {
  showConfirmNewPassword.value = !showConfirmNewPassword.value
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
          重設密碼
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          class="space-y-6"
          @submit.prevent="ResetPassword"
        >
          <div>
            <label
              for="password"
              class="block text-start text-sm font-medium leading-6"
            >
              請設定您的新密碼
            </label>

            <div class="relative mt-2">
              <input
                id="newPassword"
                v-model="resetPasswordObj.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                name="newPassword"
                autocomplete="newPassword"
                :class="{ 'border-red-500': newPasswordError }"
                placeholder="請設定您的新密碼"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="toggleShowNewPassword"
              >
                <span v-if="showNewPassword">隱藏</span>
                <span v-else>顯示</span>
              </button>
              <p
                v-if="newPasswordError"
                class="mt-1 text-xs text-red-500"
              >
                {{ newPasswordError }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-start text-sm font-medium leading-6"
            >
              確認新密碼
            </label>

            <div class="relative mt-2">
              <input
                id="confirmNewPassword"
                v-model="resetPasswordObj.confirmNewPassword"
                :type="showConfirmNewPassword ? 'text' : 'password'"
                name="confirmNewPassword"
                autocomplete="confirmNewPassword"
                :class="{ 'border-red-500': confirmNewPasswordError }"
                placeholder="請設定您的新密碼"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
                @click="toggleShowConfirmNewPassword"
              >
                <span v-if="showConfirmNewPassword">隱藏</span>
                <span v-else>顯示</span>
              </button>
              <p
                v-if="confirmNewPasswordError"
                class="mt-1 text-xs text-red-500"
              >
                {{ confirmNewPasswordError }}
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="btn-linear-md block w-full"
              style="width:100%;max-width: 100vw;"
            >
              <p>送出</p>
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
