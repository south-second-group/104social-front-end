import { useBaseFetch } from '../instance'

// 取得會員通知訊息
async function getUserNotifications() {
  return useBaseFetch('/api/v1/user/notifications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const notificationsAPI = {
  getUserNotifications,
}
