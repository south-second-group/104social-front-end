import { defineStore } from 'pinia'

export const useInviteResultStore = defineStore('inviteResult', {
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
          if (item.invitedUserId === userId)
            return { ...item, ...updateKey }

          return item
        })
      }
    },
    updateInviteResultListCommentsCount(userId) {
      if (Array.isArray(this.result)) {
        this.result = this.result.map((item) => {
          if (item.invitedUserId === userId) {
            return {
              ...item,
              profileByInvitedUser: {
                ...item.profileByInvitedUser,
                userStatus: {
                  ...item.profileByInvitedUser.userStatus,
                  commentCount: item.profileByInvitedUser.userStatus.commentCount - 1,
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
