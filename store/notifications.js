export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([])

  function setNotifications(data) {
    notifications.value = data
  }

  function readNotificationStore(id) {
    notifications.value.forEach((i) => {
      if (i.id === id)
        i.isRead = true
    })
  }

  function readAllNotificationStore(id) {
    notifications.value.forEach((i) => {
      i.isRead = true
    })
  }

  function deleteNotifications() {
    notifications.value = []
  }

  return {
    notifications,
    setNotifications,
    deleteNotifications,
    readNotificationStore,
    readAllNotificationStore,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationsStore, import.meta.hot))
