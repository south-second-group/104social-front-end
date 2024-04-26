<script lang="ts" setup>
import { reactive } from 'vue'
import { auth } from '../apis/repositories/auth'

export interface SignUpObj {
  account: string
  password: string
  confirmPassword: string
}

const signUpObj = reactive<SignUpObj>({
  account: '',
  password: '',
  confirmPassword: '',
})

async function clickSignUp() {
  const { message } = await auth.signUp(signUpObj) as { message: string }

  alert(message)
}
</script>

<template>
  <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
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
          >Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="signUpObj.account"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6"
            >Password</label>
            <div class="text-sm">
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="signUpObj.password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6"
            >ConfirmPassword</label>
            <div class="text-sm">
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="signUpObj.confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="current-password"
              class="block w-full rounded-md border-0 py-1.5  text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        已經有帳號？
        <router-link
          to="login"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          立即登入
        </router-link>
      </p>
    </div>
  </div>
</template>
