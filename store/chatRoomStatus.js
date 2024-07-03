export const useChatRoomStatusStore = defineStore('chatRoomStatus', () => {
  const isSlideOverOpen = ref(false)

  function toggleSlideOver() {
    isSlideOverOpen.value = !isSlideOverOpen.value
  }

  return {
    isSlideOverOpen,

    toggleSlideOver,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
