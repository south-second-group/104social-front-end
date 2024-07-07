import { useBaseFetch } from '../instance'

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

export const happyStoryAPI = {
  uploadCoverImage,
  uploadMultipleImage,
}
