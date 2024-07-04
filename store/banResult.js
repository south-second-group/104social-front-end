import { defineStore } from 'pinia'

export const useBanResultStore = defineStore('banResult', {
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
              blackListProfile: {
                ...item.blackListProfile,
                userStatus: {
                  ...item.blackListProfile.userStatus,
                  commentCount: item.blackListProfile.userStatus.commentCount - 1,
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
        this.result = this.result.filter(item => item.userId !== resultItemId)
    },
  },
  persist: true,
})
