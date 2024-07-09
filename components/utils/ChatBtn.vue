<script setup>
import { chatHistoryList } from '../apis/socket-io.js'
import { chatAPI } from '~/apis/repositories/chat'

// const { userId } = defineProps({
//   userId: String,
// })

const props = defineProps({
  userId: String,
})

const ChatRoomStatus = useChatRoomStatusStore()

async function addChatList() {
  ChatRoomStatus.toggleSlideOver()
  try {
    const res = await chatAPI.addChatList({ receiverId: props.userId })
    if (res.status) {
      const { data } = res
      if (!data.roomId) {
        let username = ''
        let photo = ''
        data.members.forEach((i) => {
          if (i.id === props.userId) {
            username = i.username
            photo = i.photo
          }
        })
        const newChat = {
          members: [{
            username,
            photo,
            id: props.userId,
          }],
          messages: [],
          roomId: data._id,
          unreadCount: 0,
          latestUpDate: data.updatedAt,
        }
        chatHistoryList.value.unshift(newChat)
      }
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <svg
    class="cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    width="1.2em"
    height="1.2em"
    viewBox="0 0 24 24"
    @click="addChatList"
  >
    <defs>
      <linearGradient
        id="gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop
          offset="0%"
          style="stop-color: #fe839a; stop-opacity: 1"
        />
        <stop
          offset="100%"
          style="stop-color: #4a72ff; stop-opacity: 1"
        />
      </linearGradient>
    </defs>
    <path
      fill="none"
      stroke="url(#gradient)"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M8.625 9.75a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0H8.25m4.125 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0H12m4.125 0a.375.375 0 1 1-.75 0a.375.375 0 0 1 .75 0m0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227c1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332a48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741z"
    />
  </svg>
</template>
