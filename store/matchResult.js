import { defineStore } from 'pinia'

export const useMatchResultStore = defineStore('matchResult', {
  state: () => {
    return {
      result: [],
      resultTotal: 0,
    }
  },
  persist: true,
})
