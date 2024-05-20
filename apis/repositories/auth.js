import { useBaseFetch } from '../instance'

// 更改帳號狀態
async function changeAccountStatus(token) {
  const url = `/api/v1/activate-account/${token}`
  return useBaseFetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 重設密碼
async function resetPassword(data, token) {
  return useBaseFetch(`/api/v1/reset-password/${token}`, {
    method: 'PATCH',
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
async function forgetPassword(data) {
  return useBaseFetch('/api/v1/forget-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
    }),
  })
}

// 註冊
async function signUp(data) {
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
async function login(data) {
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

// Google 重定向
async function redirect(token) {
  const url = `/api/v1/google/redirect/${token}`
  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const auth = {
  changeAccountStatus,
  resetPassword,
  forgetPassword,
  signUp,
  login,
  verify,
  redirect,
}
