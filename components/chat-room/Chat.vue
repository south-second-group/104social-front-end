<script setup>
import { chatHistoryList, socket } from '../apis/socket-io.js'

const props = defineProps(['roomId', 'memberList'])
const memberStore = useMemberStore()
const userDataStore = useUserDataStore()
const { userData } = storeToRefs(userDataStore)
const user = userData.value.userId
const text = ref('')
const { roomId, memberList } = props
const messages = ref([])
let typingTimeout
const typingAnimate = ref(false)

// 監視輸入中狀態
watch(text, (newValue) => {
  if (newValue) {
    if (typingTimeout)
      clearTimeout(typingTimeout)
    socket.value.emit('typing', { roomId, userId: user })

    typingTimeout = setTimeout(() => {
      socket.value.emit('stopTyping', { roomId, userId: user })
    }, 5000)
  }
  else {
    socket.value.emit('stopTyping', { roomId, userId: user })
    typingAnimate.value = false
  }
})

socket.value.on('typing', (data) => {
  if (memberList[0].id === data.userId)
    typingAnimate.value = true
  scrollToBottom()
})

socket.value.on('stopTyping', (data) => {
  if (memberList[0].id === data.userId)
    typingAnimate.value = false
})

function useFormattedTime(data) {
  const date = new Date(data)
  const now = new Date()

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    let hours = date.getHours()
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const period = hours >= 12 ? '下午' : '上午'
    hours = hours % 12
    hours = hours || 12
    return `${period} ${hours}:${minutes}`
  }
  else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  }
}

function scrollToBottom() {
  nextTick(() => {
    const chatContainer = document.querySelector('.chat-container')
    if (chatContainer)
      chatContainer.scrollTop = chatContainer.scrollHeight

    socket.value.emit('isRead', { roomId })
  })
}

// 計算畫面高度與聊天畫高度
const contentHeight = ref('auto')
const inputHeight = ref(0)
const chatRoomHeaderHeight = ref(0)
function getChatViewHeight() {
  const inputElement = document.querySelector('.input-container')
  if (inputElement)
    inputHeight.value = inputElement.offsetHeight

  const headerElement = document.querySelector('.chat-room-header')
  if (headerElement)
    chatRoomHeaderHeight.value = headerElement.offsetHeight

  contentHeight.value = `${
    window.innerHeight - inputHeight.value - chatRoomHeaderHeight.value
  }px`
}

// 處理 socket.io
// 推送新訊息
function sendMessage() {
  if (text.value.trim()) {
    socket.value.emit('chat', { message: text.value, roomId })
    handlePushMessage(text.value)
    text.value = ''
    scrollToBottom()
  }
}

function handlePushMessage(text) {
  const date = new Date()
  const newMessage = {
    message: text,
    senderId: user,
    createdAt: date.toISOString(),
  }
  messages.value.push(newMessage)
}

watch(chatHistoryList, (newValue) => {
  if (roomId) {
    const room = newValue.find(i => i.roomId === roomId)
    messages.value = room ? room.messages : []
    scrollToBottom()
  }
}, { deep: true, immediate: true })

onMounted(() => {
  getChatViewHeight()
  scrollToBottom()
})
</script>

<template>
  <div
    class="mt-5 rounded-xl bg-white p-3 md:px-5 md:py-4"
    :style="{ height: contentHeight }"
  >
    <div class="flex h-full flex-col">
      <div class="chat-container h-full overflow-y-auto">
        <div
          v-for="message in messages"
          :key="message._id"
          class="mb-6 flex items-center gap-2"
          :class="{ 'flex-row-reverse': message.senderId === user }"
        >
          <!-- <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          /> -->
          <NuxtImg
            :src="message.senderId === user ? memberStore.personalPhoto.photo || '/chatRoom/default.png' : memberList[0].photo || '/chatRoom/default.png'"
            alt="Avatar"
            class="size-9 rounded-full object-cover"
          />
          <div
            class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[65%]"
          >
            <p
              class="mb-text-base text-wrap break-all text-start text-sm text-zinc-950"
            >
              {{ message.message }}
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm">
            {{ useFormattedTime(message.createdAt) }}
          </p>
        </div>
        <!-- 這是一則訊息 -->
        <!-- <div v-for="message in messages" :key="message" class="mb-6 flex  items-center gap-2"
          :class="{ 'flex-row-reverse': message.sender === user }">
          <UAvatar size="md" src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[65%]">
            <p class="mb-text-base text-wrap break-all text-start text-sm text-zinc-950">
              {{ message.message }}
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm"> -->
        <!-- {{ useFormattedTime(new Date()) }}
          </p>
        </div> -->
        <!-- 一則訊息結束 -->
        <div
          v-if="typingAnimate"
          class="mb-6 flex items-center gap-2"
          :class="{ 'flex-row-reverse': false }"
        >
          <!-- <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          /> -->
          <NuxtImg
            :src="memberList[0].photo || '/chatRoom/default.png'"
            alt="Avatar"
            class="size-9 rounded-full object-cover"
          />
          <div
            class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[65%]"
          >
            <utilsTypingIndicator />
          </div>
        </div>
      </div>
      <!-- 對話內容結束 -->

      <div class="input-container flex items-center gap-2">
        <UInput
          v-model="text"
          class="box w-full"
          variant="none"
          size="xl"
          placeholder="請輸入訊息"
          @keyup.enter="sendMessage"
        />
        <transition name="slide">
          <button
            v-if="text.length !== 0"
            class="btn-linear-sm block min-w-[73px]"
            @click="sendMessage"
          >
            <p class="font-bold">
              送出
            </p>
          </button>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 2px;
  opacity: 0.6;
  background: linear-gradient(90deg, #fe839a, #4a72ff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.no-border-no-shadow {
  border: none;
  box-shadow: none;
}

.slide-leave-active,
.slide-enter-active {
  transition: all 0.4s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
