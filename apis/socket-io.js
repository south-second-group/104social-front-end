import { io } from 'socket.io-client'

const baseUrl = import.meta.env.MODE === 'development' ? 'http://localhost:3001' : process.env.BASE_API_URL

export const socket = ref(null)

export const chatHistoryList = ref([])

export function initializeSocket(userId) {
  socket.value = io(baseUrl, {
    extraHeaders: {
      credentials: true,
      userid: userId,
    },
  })
  // socket.value.on('chatHistory', (data) => {
  //   console.log(data)
  //   chatHistoryList.value.push(data)
  // });

  socket.value.on('connect', () => {
    // console.log('Connected to server')
    // roomId.value.forEach(i => {
    //   socket.value.emit('join', { roomId: i });
    // })
    // socket.value.emit('join', { roomId: roomId.value });
  })

  socket.value.on('disconnect', () => {
    // console.log('Disconnected from server')
  })

  // socket.value.on('connect_error', (error) => {
  // console.error('Connection error:', error)
  // })
}
