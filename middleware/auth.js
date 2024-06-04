import { auth } from '../apis/repositories/auth'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  try {
    await auth.verifys()
  }
  catch (_error) {
    console.log(1)
    return navigateTo('/login')
  }
})
