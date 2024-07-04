import { defineStore } from 'pinia'

export const useCollectionsResultStore = defineStore('collectionsResult', {
  state: () => {
    return {
      result: [],
      resultTotal: 0,
      isLoading: false,
    }
  },
  actions: {
    updateInviteResultList(userId, updateKey) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.collectedUserId === userId)
            return { ...item, ...updateKey }

          return item
        })
      }
    },
    updateInviteResultListCommentsCount(userId) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.collectedUserId === userId) {
            return {
              ...item,
              collectedUsers: {
                ...item.collectedUsers,
                userStatus: {
                  ...item.collectedUsers.userStatus,
                  commentCount: item.collectedUsers.userStatus.commentCount - 1,
                },
              },
            }
          }
          return item
        })
      }
    },
    deleteInviteResult(resultItemId) {
      if (Array.isArray(this.result))
        this.result = this.result.filter(item => item._id !== resultItemId)
    },
  },
  persist: true,
})
