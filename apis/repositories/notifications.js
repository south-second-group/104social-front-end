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

// 已讀一則通知訊息
async function readNotification(body) {
  return useBaseFetch('/api/v1/user/notifications/read', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

// 已讀全部通知訊息
async function readAllNotifications() {
  return useBaseFetch('/api/v1/user/notifications/read-all', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const notificationsAPI = {
  getUserNotifications,
  readNotification,
  readAllNotifications,
}
