<script setup>
import { chatHistoryList } from '../apis/socket-io.js'

const emit = defineEmits(['openChat'])
const q = ref('')
function openChat(roomId) {
  emit('openChat', roomId)
}

const chatList = ref(null)

watch(chatHistoryList, (newValue) => {
  chatList.value = useSort(newValue)
}, { immediate: true })

watch(q, (newValue) => {
  chatList.value = q.value === '' ? chatHistoryList.value : useFilter(newValue)
})

function useSort(list) {
  list.forEach((chat) => {
    const now = new Date()
    if (chat.messages.length > 1)
      chat.latestUpDate = chat.messages[chat.messages.length - 1].createdAt
    else if (!Object.prototype.hasOwnProperty.call(chat, 'latestUpDate'))
      chat.latestUpDate = now
  })
  const sortList = list.sort((a, b) => {
    const aDate = new Date(a.latestUpDate)
    const bDate = new Date(b.latestUpDate)
    return bDate - aDate
  })
  return sortList
}

function useFilter(keyword) {
  const search = []
  chatHistoryList.value.forEach((i) => {
    i.members.forEach((n) => {
      if (n.username.includes(keyword))
        search.push(i)
    })
  })
  return search
}
</script>

<template>
  <div class="my-4">
    <UInput
      v-model="q"
      class=""
      size="xl"
      name="q"
      placeholder="搜尋"
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          v-show="q !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="q = ''"
        />
      </template>
    </UInput>
  </div>
  <div class="overflow-y-auto">
    <ul
      v-if="chatList?.length !== 0"
      class="rounded-xl bg-white"
    >
      <chat-roomChatPreview
        v-for="chat in useSort(chatList)"
        :key="chat.roomId"
        :chat="chat"
        @click="openChat(chat)"
      />
    </ul>
    <div
      v-if="chatList?.length === 0 && q !== ''"
      class="flex size-full items-center justify-center"
    >
      <p class="text-xl font-bold text-primary-dark">
        Oops！查無此人
      </p>
    </div>
    <div
      v-if="chatList?.length === 0 && q === ''"
      class="flex h-full flex-col items-center justify-center rounded-xl"
    >
      <NuxtImg
        src="/chatRoom/No-Result-Found.png"
        alt=""
        class="mx-auto size-[300px]"
      />
      <p class="mb-2 text-xl font-bold text-zinc-400">
        尚未有聊天記錄
      </p>
      <p class="text-xl font-bold text-zinc-400">
        快去尋找對象吧！
      </p>
    </div>
  </div>
</template>
