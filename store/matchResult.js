import { defineStore } from 'pinia'

export const useMatchResultStore = defineStore('matchResult', {
  state: () => {
    return {
      result: [],
      resultTotal: 0,
      isLoading: false,
    }
  },
  actions: {
    updateMatchResultList(userId, updateKey) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.userInfo._id === userId)
            return { ...item, ...updateKey }
          return item
        })
      }
    },
    updateMatchResultListCommentsCount(userId) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
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
    },
  },
  persist: true,
})
