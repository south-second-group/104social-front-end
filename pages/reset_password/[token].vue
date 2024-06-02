<script setup>
import { auth } from '../../apis/repositories/auth'

definePageMeta({
  layout: 'LoginLayout',
})

const route = useRoute()

// 獲取 token
const token = route.params.token

const state = reactive({
  newPassword: '',
  confirmNewPassword: '',
})

const router = useRouter()
const toastMessage = ref('')
const toastType = ref('')
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)

// 處理valid
function validate(state) {
  const errors = []
  if (!state.newPassword)
    errors.push({ path: 'newPassword', message: '密碼不能為空' })
  else if (state.newPassword.length < 8)
    errors.push({ path: 'newPassword', message: '密碼需要8碼以上' })
  else if (!/(?=.*[A-Za-z])(?=.*\d{7,})/.test(state.newPassword))
    errors.push({ path: 'newPassword', message: '密碼格式為至少 1 碼英文及 7 碼數字' })

  if (!state.confirmNewPassword)
    errors.push({ path: 'confirmNewPassword', message: '確認新密碼不能為空' })
  else if (state.confirmNewPassword !== state.newPassword)
    errors.push({ path: 'confirmNewPassword', message: '兩次密碼不一致' })
  else if (!/(?=.*[A-Za-z])(?=.*\d{7,})/.test(state.confirmNewPassword))
    errors.push({ path: 'confirmNewPassword', message: '密碼格式為至少 1 碼英文及 7 碼數字' })

  return errors
}

// 點擊送出按鈕
async function resetPassword() {
  try {
    const response = await auth.resetPassword(state, token)
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

// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

function toggleShowNewPassword() {
  showNewPassword.value = !showNewPassword.value
}

function toggleShowConfirmNewPassword() {
  showConfirmNewPassword.value = !showConfirmNewPassword.value
}
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row">
    <LoginImage />

    <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-1 lg:px-8">
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
          重設密碼
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="resetPassword"
        >
          <UFormGroup
            label="請設定您的新密碼"
            name="newPassword"
          >
            <div class="relative">
              <UInput
                v-model="state.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="請設定您的新密碼"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                @click="toggleShowNewPassword"
              >
                <span v-if="showNewPassword"><icon-heroicons:eye-slash /></span>
                <span v-else><icon-heroicons:eye /></span>
              </button>
            </div>
          </UFormGroup>

          <UFormGroup
            label="確認新密碼"
            name="confirmNewPassword"
          >
            <div class="relative">
              <UInput
                v-model="state.confirmNewPassword"
                :type="showConfirmNewPassword ? 'text' : 'password'"
                placeholder="請再次輸入密碼"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                @click="toggleShowConfirmNewPassword"
              >
                <span v-if="showConfirmNewPassword"><icon-heroicons:eye-slash /></span>
                <span v-else><icon-heroicons:eye /></span>
              </button>
            </div>
          </UFormGroup>

          <button
            type="submit"
            class="btn-linear-md"
            style="width:100%;max-width: 100vw;"
          >
            <p>發送</p>
          </button>
        </UForm>
        <p class="text-B3 my-4 text-center text-gray-500">
          已有帳號? <NuxtLink
            to="login"
            class="font-semibold text-primary-dark"
          >
            立即登入
          </NuxtLink>
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
  background-color: #4CAF50;
}

.toast.error {
  background-color: #F44336;
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
