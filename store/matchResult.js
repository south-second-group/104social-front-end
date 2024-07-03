import { defineStore } from 'pinia'

export const useMatchResultStore = defineStore('matchResult', {
  state: () => {
    return {
      result: [],
      resultTotal: 0,
      isLoading: false,
      tempInvitationTableId: null, // 邀約後數值更新後，彈窗組件由於重新渲染，導致數值重置 > 存pinia 和 用二元運算 判斷用props
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
