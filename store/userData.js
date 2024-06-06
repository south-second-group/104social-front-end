import { useStorage } from '@vueuse/core'

export const useUserDataStore = defineStore('userData', () => {
  const userData = ref(null)

  function setUserData(data) {
    userData.value = data
  }

  function deleteUserData() {
    userData.value = null
  }

  // NOTE：討論看怎麼整合
  const name = ref(null)
  const email = ref(null)

  const setName = (newName) => {
    name.value = newName
    useStorage('name', newName)
  }

  const setEmail = (newEmail) => {
    email.value = newEmail
    useStorage('email', newEmail)
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
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserDataStore, import.meta.hot))
