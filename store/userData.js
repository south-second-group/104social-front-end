export const useUserDataStore = defineStore('userData', () => {
  const userData = ref(null)

  function setUserData(data) {
    userData.value = data
  }

  function deleteUserData() {
    userData.value = null
  }

  const name = ref(null)
  const setName = (newName) => {
    name.value = newName
  }

  const email = ref(null)
  const setEmail = (newEmail) => {
    email.value = newEmail
  }

  const userId = ref(null)
  const setUserId = (newUserId) => {
    userId.value = newUserId
  }

  const userToken = ref(null)
  const setUserToken = (newUserToken) => {
    userToken.value = newUserToken
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
    userToken,
    setUserToken,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserDataStore, import.meta.hot))
