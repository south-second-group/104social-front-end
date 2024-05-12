import { useBaseFetch } from '../instance'
import type { ResetPasswordObj } from '~/pages/reset-password.vue'
import type { ForgetPasswordObj } from '~/pages/forget-password.vue'
import type { SignUpObj } from '~/pages/sign-up.vue'
import type { LoginObj } from '~/pages/login.vue'

// 重設密碼
async function resetPassword(data: ResetPasswordObj) {
  const url = '/api/v1/reset-password'
  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newPassword: data.newPassword,
      confirmNewPassword: data.confirmNewPassword,
    }),
  })
}

// 忘記密碼
async function forgetPassword(data: ForgetPasswordObj) {
  return useBaseFetch('/api/v1/forget-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account: data.account,
    }),
  })
}

// 註冊
async function signUp(data: SignUpObj) {
  return useBaseFetch('/api/v1/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      username: data.username,
    }),
  })
}

// 登入
async function login(data: LoginObj) {
  return useBaseFetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account: data.account,
      password: data.password,
    }),
  })
}

// 驗證登入狀態
async function verify() {
  return useBaseFetch('/api/v1/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const auth = {
  resetPassword,
  forgetPassword,
  signUp,
  login,
  verify,
}
