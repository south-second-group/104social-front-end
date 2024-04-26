<script lang="ts" setup>
import { reactive } from 'vue'
import { auth } from '../apis/repositories/auth'

export interface LoginObj {
  account: string
  password: string
}

const loginObj = reactive<LoginObj>({
  account: '',
  password: '',
})

async function login() {
  const { message } = await auth.login(loginObj) as { message: string }

  alert(message)
}
</script>

<template>
  <div class="flex min-h-full w-1/3 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
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
            for="email"
            class="block text-start text-sm font-medium leading-6"
          >Email address</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="loginObj.account"
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
              v-model="loginObj.password"
              name="password"
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
        Not a member?
        <router-link
          to="sign-up"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          signup!
        </router-link>
      </p>
      <router-link
        to="/"
        class="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        回首頁驗證 Token
      </router-link>
    </div>
  </div>
</template>
