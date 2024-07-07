import { useBaseFetch, useSSRFetch } from '../instance'

// 上傳封面圖片
async function uploadCoverImage(data) {
  return useBaseFetch('/api/v1/happiness-cover-image', {
    method: 'POST',
    headers: {},
    body: data,
  })
}

// 上傳生活照片
async function uploadMultipleImage(data) {
  return useBaseFetch('/api/v1/happiness-multiple-image', {
    method: 'POST',
    headers: {},
    body: data,
  })
}

// 建立幸福案例
async function createHappyStory(data) {
  return useBaseFetch('/api/v1/happiness-example', {
    method: 'POST',
    headers: {},
    body: data,
  })
}

// 取得特定幸福案例 By ID
async function getHappyStoryById(id) {
  return useSSRFetch(`/api/v1/happiness-example/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

// 取得所有幸福案例
async function getHappyStory() {
  return useSSRFetch('/api/v1/happiness-example', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const happyStoryAPI = {
  uploadCoverImage,
  uploadMultipleImage,
  createHappyStory,
  getHappyStoryById,
  getHappyStory,
}
