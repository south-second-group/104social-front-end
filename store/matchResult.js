import { defineStore } from 'pinia'

export const useMatchResultStore = defineStore('matchResult', {
  state: () => {
    return {
      result: [],
    }
  },
  persist: true,
})
