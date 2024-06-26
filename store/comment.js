import { defineStore } from 'pinia'

export const useCommentStore = defineStore('comment', {
  state: () => {
    return {
      result: [],
      resultTotal: 0,
      isLoading: false,
    }
  },
  actions: {
    updateCommentList(userId, updateKey) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.userInfo._id === userId)
            return { ...item, ...updateKey }
          return item
        })
      }
    },
    deleteCommentList(userId) {
      if (Array.isArray(this.result))
        this.result = this.result.filter(item => item.userInfo._id !== userId)
    },
    updateCommentListCommentsCount(userId) {
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
