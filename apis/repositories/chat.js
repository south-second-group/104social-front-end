import { useBaseFetch } from '../instance'

async function addChatList(body) {
  const url = `/api/v1/chat`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
}

async function markAllRead(roomId) {
  const url = `/api/v1/chatrooms/${roomId}/markAllRead`

  return useBaseFetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
export const chatAPI = {
  addChatList,
  markAllRead,
}
