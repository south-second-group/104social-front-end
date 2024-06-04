import { auth } from '../apis/repositories/auth'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  try {
    await auth.verifys()
  }
  catch (_error) {
    return navigateTo('/login')
  }
})
