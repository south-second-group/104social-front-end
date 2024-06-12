import { useBaseFetch } from '../instance'

// 取得配對設定選項
async function matchListOptions() {
  return useBaseFetch('/api/v1/match-list/options', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取得配對列表
async function matchList() {
  return useBaseFetch('/api/v1/match-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function updateMatchList(data) {
  return useBaseFetch('/api/v1/match-list', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// 取得自己的配對條件
async function getMatchListSelf() {
  return useBaseFetch('/api/v1/match-list-self', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function updateMatchListSelf(data) {
  return useBaseFetch('/api/v1/match-list-self', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// 取得配對結果
async function getMatchResult(page, sort) {
  const url = `/api/v1/match-result?page=${page}&sort=${sort}`

  return useBaseFetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const matchListApi = {
  matchListOptions,
  matchList,
  updateMatchList,
  getMatchListSelf,
  updateMatchListSelf,
  getMatchResult,
}
