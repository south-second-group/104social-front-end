<script setup>
const { copy } = useClipboard()

const token = ref('')
const host = ref('')
let ws

const open = ref(true)
const uuid = ref('')
const name = ref('')

const message = ref('123')
const messageList = ref([])
const messageRef = ref(null)
const toID = ref('') // 要傳送訊息的對象，也等於單獨的聊天室

const inviteList = ref([])

// 開始監聽後端WS
onMounted(async () => {
  token.value = await prompt('請輸入用戶 token')
  // host.value = `ws://localhost:3000/ws?token=${token.value}`
  host.value = `wss://one04social-back-end.onrender.com/ws?token=${token.value}`

  ws = new WebSocket(host.value)
  ws.onopen = (_res) => {
    console.warn('前端 WS 連線成功：', _res)
  }

  ws.onmessage = (res) => {
    const data = JSON.parse(res.data)
    // console.warn('各種訊息攔截：',data);

    if (data.context === 'user') {
      uuid.value = data.uuid
      name.value = data.name
    }

    if (data.context === 'message')
      messageList.value.push(data)

    if (data.context === 'invite') {
      const index = inviteList.value.findIndex(
        notification => notification.from === data.from,
      )

      if (index !== -1)
        inviteList.value.splice(index, 1)
      else inviteList.value.push(data)
    }
  }
})

// 觸發後端WS
function sendMessage() {
  toID.value = prompt('請輸入要傳送訊息的用戶 ID')

  ws.send(
    JSON.stringify({
      context: 'message',
      content: message.value,
      from: uuid.value,
      to: toID.value,
    }),
  )

  // message.value = '';
  scrollToBottom()
}

// 待修
// 傳訊自動至底
// 六角講師的 https://github.com/ayugioh2003/demo-websocket-client/blob/main/src/views/ChatView.vue
async function scrollToBottom() {
  // console.warn(messageRef.value.scrollHeight);
  // console.warn(messageRef.value.scrollTop);
  await nextTick()
  messageRef.value.scrollTop = messageRef.value.scrollHeight
  // console.warn(messageRef.value.scrollTop);
}

function invite() {
  const to = prompt('請輸入要邀請的用戶 ID')
  ws.send(
    JSON.stringify({
      context: 'invite',
      to,
    }),
  )
}
</script>

<template>
  <UPopover
    v-model:open="open"
    :popper="{ placement: 'top-end' }"
    class="absolute bottom-4 right-4"
  >
    <UButton
      size="xl"
      color="white"
      label=""
      trailing-icon="i-heroicons-chat-bubble-left-ellipsis"
    />

    <template #panel>
      <div class="h-[800px] overflow-y-scroll p-4">
        <div class="space-y-10 text-start">
          <div>
            <h1 class="text-H3 text-center">
              WS ({{ name }})
            </h1>
            <h2 class="text-H4 mb-5">
              訊息
            </h2>
            <ul
              id="messageList"
              ref="messageRef"
              class="h-72 overflow-y-auto"
            >
              <li
                v-for="item in messageList"
                :key="item.time"
                :class="{
                  'text-end': item.uuid === uuid,
                }"
                class="mb-2"
              >
                <!-- 聊天室id 就是傳訊單一對象toID -->
                <!-- v-if="item.uuid === toID || item.uuid === uuid" -->
                <div
                  class="flex justify-start"
                  :class="{
                    ' flex-row-reverse gap-3': item.uuid === uuid,
                  }"
                >
                  <div>
                    <!-- <p class="text-B4">{{ item.name }}</p> -->
                    <img
                      :src="item.photo"
                      class="mr-2 inline-block size-10 rounded-full border border-gray-500 align-middle"
                    >
                  </div>
                  <div>
                    <span>{{ item.content }}</span>
                    <p class="text-B4 text-gray-400">
                      {{ new Date(item.createdAt).toLocaleTimeString() }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <UInput
              v-model="message"
              icon=""
              size="lg"
              color="white"
              :trailing="false"
              placeholder="職業、興趣、星座..."
              class="search-sm inline-block dark:shadow-primary"
            />
            <button
              type="button"
              class="btn-linear-sm"
              @click="sendMessage"
            >
              <p>送出</p>
            </button>
            <p>
              會員ID:
              <span
                class="cursor-copy"
                @click="copy(uuid)"
              >{{ uuid }}</span>
            </p>
          </div>
          <hr>
          <div class="space-y-5">
            <h2 class="text-H4">
              邀請列表
            </h2>
            <ul
              id="inviteList"
              class="h-32"
            >
              <li
                v-for="notification in inviteList"
                :key="notification.from"
                class="flex list-decimal"
              >
                <img
                  :src="notification.photo"
                  class="mr-2 inline-block size-10 rounded-full border border-gray-500 align-middle"
                >
                <div class="inline-block">
                  <span>來自 {{ notification.name }} ({{
                    notification.from.substring(0, 8)
                  }}) 邀請</span>
                  <span class="text-B4 block pl-5 text-end text-gray-400">{{
                    new Date(notification.createdAt).toLocaleString()
                  }}</span>
                </div>
              </li>
            </ul>
            <button
              type="button"
              class="btn-withIcon-outline inline-block"
              @click="invite"
            >
              <p>邀請/收回</p>
            </button>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style lang="scss" scoped>
#list {
  list-style: none;
  padding: 0;
  width: 100%;
  min-width: 100%;
}
</style>
