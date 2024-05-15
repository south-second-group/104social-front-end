<script setup>
const { copy, copied } = useClipboard();

// const host = 'ws://localhost:3000/ws';
// const host = 'wss://node-ironman-sample-2023.onrender.com/ws';
const host = 'wss://one04social-back-end-ws.onrender.com/ws';
const message = ref('');
const uuid = ref('');
const list = ref([]);
const inviteList = ref([]);
const messageRef = ref(null);
const open = ref(true);

let ws;

onMounted(() => {
  ws = new WebSocket(host);
  ws.onopen = (res) => {
    console.warn('連線成功：', res);
  };

  ws.onmessage = (res) => {
    const data = JSON.parse(res.data);
    // console.warn(data);

    if (data.context === 'user') uuid.value = data.uuid;

    if (data.context === 'message') {
      const now = new Date();
      data.localDate = now.toLocaleDateString();
      data.localTime = now.toLocaleTimeString();
      list.value.push(data);
    }

    if (data.context === 'invite') {
      const index = inviteList.value.findIndex(
        (notification) => notification.from === data.from
      );

      if (index !== -1) inviteList.value.splice(index, 1);
      else inviteList.value.push(data);
    }
  };
});

function sendMessage() {
  ws.send(
    JSON.stringify({
      context: 'message',
      content: message.value,
    })
  );

  message.value = '';
  scrollToBottom();
}

async function scrollToBottom() {
  console.warn(messageRef.value.scrollHeight);
  console.warn(messageRef.value.scrollTop);
  await nextTick();
  messageRef.value.scrollTop = messageRef.value.scrollHeight;
  console.warn(messageRef.value.scrollTop);
}

function invite() {
  const to = prompt('請輸入要邀請的用戶 UUID');
  ws.send(
    JSON.stringify({
      context: 'invite',
      to,
    })
  );
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
      <div class="overflow-y-auto p-4">
        <div class="space-y-10 text-start">
          <div>
            <h1 class="text-H3 text-center">WS</h1>
            <h2 class="text-H4 mb-5">訊息</h2>
            <ul id="list" ref="messageRef" class="h-52 overflow-y-auto">
              <li
                v-for="item in list"
                :key="item.time"
                :class="{ 'text-end': item.uuid === uuid }"
              >
                <span>{{ item.uuid.substring(0, 8) }}</span
                >：
                <span>{{ item.content }}</span>
                <p class="text-B4 text-gray-400">
                  {{ item.localTime }}
                </p>
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
            <button type="button" class="btn-linear-sm" @click="sendMessage">
              <p>送出</p>
            </button>
            <p>
              uuid:
              <span @click="copy(uuid)" class="cursor-copy">{{ uuid }}</span>
            </p>
          </div>
          <hr />
          <div class="space-y-5">
            <h2 class="text-H4">邀請列表</h2>
            <ul id="inviteList" class="h-32">
              <li
                v-for="notification in inviteList"
                :key="notification.from"
                class="list-decimal"
              >
                <span>來自 {{ notification.from.substring(0, 8) }} 邀請</span>
                <span>{{ notification.time }}</span>
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

<style>
#list {
  list-style: none;
  padding: 0;
  width: 100%;
  min-width: 100%;
}

.align-right {
  text-align: right;
}

.align-left {
  text-align: left;
}
</style>
