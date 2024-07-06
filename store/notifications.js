export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  function setNotifications(data) {
    notifications.value = data
  }

  function deleteNotifications() {
    notifications.value = []
  }

  return {
    notifications,
    setNotifications,
    deleteNotifications,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationsStore, import.meta.hot))
