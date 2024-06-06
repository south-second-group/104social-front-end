import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const isUserLoggedIn = useStorage('name')

  if (!isUserLoggedIn)
    navigateTo('/login')
})
