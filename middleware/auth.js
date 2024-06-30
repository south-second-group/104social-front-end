import { memberAPI } from '../apis/repositories/member'

export default defineNuxtRouteMiddleware((_to, _from) => {
  (async () => {
    try {
      await memberAPI.getUserData()
    }
    catch (error) {
      return navigateTo('/login')
    }
  })()
})
