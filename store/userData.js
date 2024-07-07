export const useUserDataStore = defineStore('userData', () => {
  const userData = ref(null)

  function setUserData(data) {
    userData.value = data
  }

  function deleteUserData() {
    userData.value = null
  }

  const name = ref(null)
  const email = ref(null)
  const userId = ref(null)
  const isSubscribe = ref(null)

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
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserDataStore, import.meta.hot))
