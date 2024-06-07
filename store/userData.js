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

  const setName = (newName) => {
    name.value = newName
  }

  const setEmail = (newEmail) => {
    email.value = newEmail
  }

  return {
    userData,
    setUserData,
    deleteUserData,
    name,
    setName,
    email,
    setEmail,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserDataStore, import.meta.hot))
