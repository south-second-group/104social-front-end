export const useSearchCriteriaStore = defineStore('searchCriteria', () => {
  const selected = ref([])
  const excluded = ref([])

  function setSelectedList(data) {
    selected.value = data
  }
  function setExcludedList(data) {
    excluded.value = data
  }

  function removeSelectedTag(tag) {
    selected.value = selected.value.filter(item => item !== tag)
  }

  function removeExcludedHashtag(tag) {
    excluded.value = excluded.value.filter(item => item !== tag)
  }
  return {
    selected,
    excluded,
    setSelectedList,
    setExcludedList,
    removeSelectedTag,
    removeExcludedHashtag,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchCriteriaStore, import.meta.hot))
