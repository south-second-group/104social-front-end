<script setup>
import { auth } from '../apis/repositories/auth'

const isSignUpPage = defineModel()

const state = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const toastMessage = ref('')
const toastType = ref('')

// 處理valid
function validate(state) {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: '信箱不能為空' })
  else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.email))
    errors.push({ path: 'email', message: '信箱格式錯誤' })

  if (!state.password)
    errors.push({ path: 'password', message: '密碼不能為空' })
  else if (state.password.length < 8)
    errors.push({ path: 'password', message: '密碼需要8碼以上' })
  else if (!/(?=.*[A-Za-z])(?=.*\d{7,})/.test(state.password))
    errors.push({ path: 'password', message: '密碼格式為至少 1 碼英文及 7 碼數字' })

  if (!state.confirmPassword)
    errors.push({ path: 'confirmPassword', message: '確認密碼不能為空' })
  else if (state.confirmPassword !== state.password)
    errors.push({ path: 'confirmPassword', message: '兩次密碼不一致' })
  else if (!/(?=.*[A-Za-z])(?=.*\d{7,})/.test(state.confirmPassword))
    errors.push({ path: 'confirmPassword', message: '密碼格式為至少 1 碼英文及 7 碼數字' })

  if (!state.username)
    errors.push({ path: 'username', message: '姓名不能為空' })

  return errors
}

// 點擊註冊按鈕
async function signUp() {
  try {
    const response = await auth.signUp(state)
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

// toast
function toast(message, type) {
  toastMessage.value = message
  toastType.value = type
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
</script>

<template>
  <div class="flex h-screen flex-col lg:flex-row">
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
          註冊
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="signUp"
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

          <UFormGroup
            label="密碼"
            name="password"
          >
            <div class="relative">
              <UInput
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
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

          <UFormGroup
            label="確認密碼"
            name="confirmPassword"
          >
            <div class="relative">
              <UInput
                v-model="state.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="請再次輸入密碼"
              />
              <button
                type="button"
                class="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                @click="toggleShowConfirmPassword"
              >
                <span v-if="showConfirmPassword"><icon-heroicons:eye-slash /></span>
                <span v-else><icon-heroicons:eye /></span>
              </button>
            </div>
          </UFormGroup>

          <UFormGroup
            label="姓名"
            name="username"
          >
            <UInput
              v-model="state.username"
              type="text"
              placeholder="請輸入姓名"
            />
          </UFormGroup>

          <button
            type="submit"
            class="btn-linear-md"
            style="width:100%;max-width: 100vw;"
          >
            <p>立即註冊</p>
          </button>

          <p class="text-B3 text-center text-gray-500">
            已有帳號? <button
              type="button"
              class="font-semibold text-primary-dark"
              @click="isSignUpPage = !isSignUpPage"
            >
              立即登入
            </button>
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
  z-index: 9999;
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
