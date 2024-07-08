import { io } from 'socket.io-client'

const baseUrl
  = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : process.env.BASE_API_URL
export const socket = ref(null)

export const chatHistoryList = ref([])
export const newNotification = ref({})

export function initializeSocket(userId) {
  socket.value = io(process.env.BASE_API_URL, {
    extraHeaders: {
      userid: userId,
    },
  })
  socket.value.on('chatHistory', (data) => {
    // console.log(data)
    chatHistoryList.value = data
    chatHistoryList.value.forEach((i) => {
      socket.value.emit('join', {
        roomId: i.roomId,
      })
    })
  })
  socket.value.on('notification', handelNotification)
  socket.value.on('message', handleMessage)
  // socket.value.on('chatRoomList', handleChatRoomList)

  function handleMessage(data) {
    // console.log('handleMessage',data)
    chatHistoryList.value.forEach((i) => {
      if (!data.createdAt) {
        const date = new Date()
        data.createdAt = date.toISOString()
      }
      if (data.roomId === i.roomId) {
        i.messages.push(data)
        i.unreadCount++
      }
    })
  }
  function handelNotification(data) {
    newNotification.value = data
    // console.log(newNotification.value)
  }
}
