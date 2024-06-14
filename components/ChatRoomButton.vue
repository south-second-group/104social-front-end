<script setup>
const isOpen = ref(false)
const isShowChat = ref(false)
const isShowChatList = ref(true)
const chatId = ref('')
const slideOverHeight = ref('auto')

function backToChatList() {
  isShowChat.value = !isShowChat.value
  setTimeout(() => {
    isShowChatList.value = !isShowChat.value
  }, 600)
}
function handleOpenChat(n) {
  isShowChatList.value = false
  chatId.value = n
  isShowChat.value = true
}

onMounted(() => {
  slideOverHeight.value = `${window.innerHeight}px`
})
</script>

<template>
  <div class="fixed bottom-4 right-4  z-[4000] md:bottom-[60px] md:right-[60px]">
    <UButton
      color="white"
      class=" no-border-no-shadow rounded-full bg-primary-dark p-2.5 hover:bg-primary-dark md:p-3"
      @click="isOpen = true"
    >
      <icon-heroicons-chat-bubble-left-ellipsis class="size-5 text-white md:size-9" />
    </UButton>

    <USlideover
      v-model="isOpen"
      prevent-close
      class="z-[5000]"
    >
      <div
        class=" flex flex-1 flex-col bg-[#FFF5F5] p-4"
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
            聊天
          </p>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="no-border-no-shadow -my-1 bg-[#FFF5F5] hover:bg-[#FFF5F5]"
            @click="isOpen = false"
          />
        </div>

        <chat-roomChatListPreview
          v-if="isShowChatList"
          @open-chat="handleOpenChat"
        />
        <transition name="slide">
          <chat-roomChat
            v-if="isShowChat"
            :chat-id="chatId"
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
