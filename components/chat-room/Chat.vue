<script setup>
const text = ref('')

const chatData = ref([
  {
    isUser: true,
    message: 'Hi~',
    timestamp: '下午 06:03',
  },
  {
    isUser: true,
    message: '我住台北，你是哪裡人?我住台北，你是哪裡人?',
    timestamp: '下午 06:04',
  },
  {
    isUser: true,
    message: '在嗎?',
    timestamp: '下午 06:10',
  },
  {
    isUser: false,
    message: '我也住台北',
    timestamp: '下午 08:10',
  },
  {
    isUser: true,
    message: '喔喔!',
    timestamp: '下午 08:10',
  },
  {
    isUser: false,
    message: '我要去洗澡了',
    timestamp: '下午 08:12',
  },
])

function formatTime(date) {
  let hours = date.getHours()
  const minutes = (`0${date.getMinutes()}`).slice(-2)
  const period = hours >= 12 ? '下午' : '上午'
  hours = hours % 12
  hours = hours || 12
  hours = (`0${hours}`).slice(-2)
  return `${period} ${hours}:${minutes}`
}

function scrollToBottom() {
  nextTick(() => {
    const chatContainer = document.querySelector('.chat-container')
    if (chatContainer)
      chatContainer.scrollTop = chatContainer.scrollHeight
  })
}

function sendMessage() {
  if (text.value === '')
    return

  const currentDate = new Date()
  const message = {
    isUser: true,
    message: text.value,
    timestamp: formatTime(currentDate),
  }
  chatData.value = [...chatData.value, message]
  text.value = ''
  scrollToBottom()
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

  contentHeight.value = `${window.innerHeight - inputHeight.value - chatRoomHeaderHeight.value
    }px`
}

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
    <!-- 對話內容 -->
    <div class="flex h-full flex-col">
      <div class="chat-container h-full overflow-y-auto">
        <!-- 這是一則訊息 -->
        <div
          v-for="message in chatData"
          :key="message.message"
          class="mb-6 flex  items-center gap-2"
          :class="{ 'flex-row-reverse': message.isUser }"
        >
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[65%]">
            <p class="mb-text-base text-start text-sm text-zinc-950">
              {{ message.message }}
            </p>
          </div>
          <p class="self-end text-xs text-zinc-400 md:text-sm">
            {{ message.timestamp }}
          </p>
        </div>
        <!-- 一則訊息結束 -->
        <div
          class="mb-6 flex  items-center gap-2"
          :class="{ 'flex-row-reverse': false }"
        >
          <UAvatar
            size="md"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div class="max-w-[190px] rounded-lg bg-neutral-200 px-3 py-2 sm:max-w-[65%]">
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
