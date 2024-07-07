import { defineStore } from 'pinia'

export const useBeInviteResultStore = defineStore('beInviteResult', {
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
          if (item.userId === userId)
            return { ...item, ...updateKey }

          return item
        })
      }
    },
    updateInviteResultListCommentsCount(userId) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.userId === userId) {
            return {
              ...item,
              profileByUser: {
                ...item.profileByUser,
                userStatus: {
                  ...item.profileByUser.userStatus,
                  commentCount: item.profileByUser.userStatus.commentCount - 1,
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
