export const useUserDataStore = defineStore('userData', () => {
  const userData = ref(null)

  function setUserData(data) {
    userData.value = data
  }

  const name = ref(null)
  const email = ref(null)
  const userId = ref(null)
  const isSubscribe = ref(null)
  const token = ref(null)

  const setName = (newName) => {
    name.value = newName
  }

  const setEmail = (newEmail) => {
    email.value = newEmail
  }

  const setUserId = (newUserId) => {
    userId.value = newUserId
  }

  const setIsSubscribe = (newIsSubscribe) => {
    isSubscribe.value = newIsSubscribe
  }

  const setToken = (newToken) => {
    token.value = newToken
  }

  function deleteUserData() {
    userData.value = null
    name.value = null
    email.value = null
    userId.value = null
    isSubscribe.value = null
    token.value = null
  }

  return {
    userData,
    setUserData,
    deleteUserData,
    name,
    setName,
    email,
    setEmail,
    userId,
    setUserId,
    isSubscribe,
    setIsSubscribe,
    token,
    setToken,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserDataStore, import.meta.hot))
