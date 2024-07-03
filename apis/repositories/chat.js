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

export const chatAPI = {
  addChatList,
}
