import {
  io,
} from 'socket.io-client'

const baseUrl
  = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : process.env.BASE_API_URL
export const socket = ref(null)

export const chatHistoryList = ref([])

export function initializeSocket(userId) {
  socket.value = io(baseUrl, {
    extraHeaders: {
      userid: userId,
    },
  })

  // socket.value.on('connect', () => {
  //   console.log('Connected to server')
  // })

  // socket.value.on('disconnect', () => {
  //   console.log('Disconnected from server')
  // })

  socket.value.on('chatHistory', (data) => {
    chatHistoryList.value = data
    chatHistoryList.value.forEach((i) => {
      socket.value.emit('join', {
        roomId: i.roomId,
      })
    })
  })

  socket.value.on('message', handleMessage)

  function handleMessage(data) {
    chatHistoryList.value.forEach((i) => {
      if (data.roomId === i.roomId) {
        i.messages.push(data)
        i.unreadCount++
      }
    })
  }

  // socket.value.on('connect_error', (error) => {
  //   console.error('Connection error:', error)
  // })
}
