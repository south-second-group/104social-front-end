export function state() {
  return {
    isLoggedIn: false,
    toastMessage: '',
    toastType: '',
  }
}

export const mutations = {
  SET_LOGGED_IN(state, status) {
    state.isLoggedIn = status
  },
  SET_TOAST_MESSAGE(state, { message, type }) {
    state.toastMessage = message
    state.toastType = type
  },
  CLEAR_TOAST_MESSAGE(state) {
    state.toastMessage = ''
    state.toastType = ''
  },
}

export const actions = {
  checkLoginStatus({ commit }) {
    const status = !!localStorage.getItem('name')
    commit('SET_LOGGED_IN', status)
  },
  async logout({ commit }) {
    try {
      const response = await auth.logout()
      if (response.status === true) {
        localStorage.removeItem('name')
        commit('SET_LOGGED_IN', false)
        commit('SET_TOAST_MESSAGE', { message: '登出成功！', type: 'success' })
        setTimeout(() => {
          commit('CLEAR_TOAST_MESSAGE')
        }, 3000)
      }
    }
    catch (error) {
      const errorMessage = error.response
      commit('SET_TOAST_MESSAGE', { message: errorMessage, type: 'error' })
      setTimeout(() => {
        commit('CLEAR_TOAST_MESSAGE')
      }, 3000)
    }
  },
  toast({ commit }, { message, type }) {
    commit('SET_TOAST_MESSAGE', { message, type })
    setTimeout(() => {
      commit('CLEAR_TOAST_MESSAGE')
    }, 3000)
  },
}

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
  toastMessage: state => state.toastMessage,
  toastType: state => state.toastType,
}
