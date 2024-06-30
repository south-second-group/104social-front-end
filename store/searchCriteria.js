export const useSearchCriteriaStore = defineStore(
  'searchCriteria',
  () => {
    const genderOption = ref([
      { value: 0, label: '不限' },
      { value: 1, label: '男性' },
      { value: 2, label: '女性' },
      { value: 3, label: '其他' },
      { value: 4, label: '不透露' },
    ])

    const selected = ref([])
    const excluded = ref([])
    const searchForm = reactive({
      keyWord: '',
      location: 0,
      gender: 0,
      tags: [],
      notTags: [],
    })
    const searchResultsList = ref([])

    function setSelectedList(data) {
      selected.value = data
      searchForm.tags = data
    }
    function setExcludedList(data) {
      excluded.value = data
      searchForm.notTags = data
    }

    function removeSelectedTag(tag) {
      selected.value = selected.value.filter(item => item !== tag)
      searchForm.tags = searchForm.tags.filter(item => item !== tag)
    }

    function removeExcludedHashtag(tag) {
      excluded.value = excluded.value.filter(item => item !== tag)
      searchForm.notTags = searchForm.notTags.filter(item => item !== tag)
    }

    function setSearchForm(data) {
      searchForm.value = data
    }

    function resetSearchForm() {
      searchForm.keyWord = ''
      searchForm.location = 0
      searchForm.gender = 0
      searchForm.tags = []
      searchForm.notTags = []
      selected.value = []
      excluded.value = []
    }

    function updateSearchResultsList(userId, updateKey) {
      searchResultsList.value = searchResultsList.value.map((item) => {
        if (item.userInfo._id === userId)
          return { ...item, ...updateKey }
        return item
      })
    }

    function updateSearchResultsListCommentsCount(userId) {
      searchResultsList.value = searchResultsList.value.map((item) => {
        if (item.userInfo._id === userId) {
          return {
            ...item,
            hasComment: false,
            profile: {
              ...item.profile,
              userStatus: {
                ...item.profile.userStatus,
                commentCount: item.profile.userStatus.commentCount - 1,
              },
            },
          }
        }
        return item
      })
    }

    return {
      selected,
      excluded,
      searchForm,
      searchResultsList,
      genderOption,

      setSelectedList,
      setExcludedList,
      removeSelectedTag,
      removeExcludedHashtag,
      setSearchForm,
      resetSearchForm,
      updateSearchResultsList,
      updateSearchResultsListCommentsCount,
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  },
)

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useSearchCriteriaStore, import.meta.hot),
  )
}
