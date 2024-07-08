<script setup>
import { chatHistoryList } from '../apis/socket-io.js'
import { chatAPI } from '~/apis/repositories/chat'

const ChatRoomStatus = useChatRoomStatusStore()

const roomId = ref('')
const roomIdList = ref([])
const isOpen = ref(false)

const isShowChat = ref(false)
const isShowChatList = ref(true)
const slideOverHeight = ref('auto')
const memberList = ref([])

function backToChatList() {
  isShowChat.value = false
  setTimeout(() => {
    isShowChatList.value = true
  }, 600)
}

async function handleOpenChat(chat) {
  memberList.value = chat.members
  roomId.value = chat.roomId
  chatHistoryList.value.forEach((i) => {
    if (i.roomId === chat.roomId)
      i.unreadCount = 0
  })
  await chatAPI.markAllRead(chat.roomId)
  isShowChatList.value = false
  isShowChat.value = true
}

onMounted(() => {
  slideOverHeight.value = `${window.innerHeight}px`
})

// 監視 chatHistoryList 的變化
watch(chatHistoryList, (newValue, oldValue) => {
  if (newValue.length > 0)
    roomIdList.value = chatHistoryList.value.map(i => i.roomId)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[3000] md:bottom-[60px] md:right-[60px]">
    <UButton
      color="white"
      class=" no-border-no-shadow rounded-full bg-primary-dark p-2.5 hover:bg-primary-dark md:p-3"
      @click="ChatRoomStatus.toggleSlideOver()"
    >
      <icon-heroicons-chat-bubble-left-ellipsis
        class="size-5 text-white md:size-9"
      />
    </UButton>

    <USlideover
      v-model="ChatRoomStatus.isSlideOverOpen"
      prevent-close
      class="z-[5000]"
    >
      <div
        class="flex flex-1 flex-col bg-[#FFF5F5] p-4"
        :style="{ height: slideOverHeight }"
      >
        <div class="chat-room-header flex items-center justify-between">
          <div :class="{ 'opacity-0': isShowChatList }">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-arrow-small-left"
              class="no-border-no-shadow -my-1 bg-[#FFF5F5] hover:bg-[#FFF5F5]"
              :disabled="isShowChatList"
              @click="backToChatList"
            />
          </div>
          <p class="text-xl font-bold text-primary-dark">
            {{ isShowChat ? memberList.length === 1 ? memberList[0].username : '聊天' : '聊天' }}
          </p>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="no-border-no-shadow -my-1 bg-[#FFF5F5] hover:bg-[#FFF5F5]"
            @click="ChatRoomStatus.toggleSlideOver()"
          />
        </div>
        <chat-roomChatListPreview
          v-if="isShowChatList"
          @open-chat="handleOpenChat"
        />
        <transition name="slide">
          <chat-roomChat
            v-if="isShowChat"
            :room-id="roomId"
            :member-list="memberList"
          />
        </transition>
      </div>
    </USlideover>
  </div>
</template>

<style scoped>
.chatRoomSize {
  height: calc(100vh - 120px);
}

@media screen and (max-width: 768px) {
  .chatRoomSize {
    height: 95vh;
  }
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
