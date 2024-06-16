import { useBaseFetch } from '../instance'

// 取得收藏
async function getCollections() {
  return useBaseFetch('/api/v1/collections', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 新增收藏
async function addCollection(body) {
  return useBaseFetch('/api/v1/collections', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

export const collectionApi = {
  getCollections,
  addCollection,
}
