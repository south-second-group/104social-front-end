import { useStorage } from '@vueuse/core'

export const useUserStore = defineStore('user', () => {
  const savedName = ref('')
  const previousNames = ref('')

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  function setNewName(name) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  const name = ref('')
  const userEmail = ref('')

  const setName = (newName) => {
    name.value = newName
    useStorage('name', newName)
  }

  return {
    savedName,
    otherNames,
    setNewName,
    name,
    setName,
    userEmail,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
