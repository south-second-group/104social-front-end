import { useBaseFetch } from '../instance'
import type { SignUpObj } from '~/pages/sign-up.vue'
import type { LoginObj } from '~/pages/login.vue'

async function signUp(data: SignUpObj) {
  return useBaseFetch('/api/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      account: data.account,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }),
  })
}

async function login(data: LoginObj) {
  return useBaseFetch('/api/login', {
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

async function verify() {
  return useBaseFetch('/api/verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const auth = {
  signUp,
  login,
  verify,
}
