<script setup>
const isShowChat = ref(false)
const isShowChatList = ref(true)
const chatId = ref('')
function toggleToChatList() {
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
</script>

<template>
  <div class="fixed bottom-4 right-4 z-[2000] md:bottom-[60px] md:right-[60px]">
    <UPopover :popper="{ placement: 'top-end', offsetDistance: -50 }">
      <UButton
        color="white"
        class="no-border-no-shadow rounded-full bg-primary-dark p-2.5 hover:bg-primary-dark md:p-3"
      >
        <icon-heroicons-chat-bubble-left-ellipsis class="size-5 text-white md:size-9" />
      </UButton>
      <template #panel="{ close }">
        <div class="chatRoomSize w-[95vw] bg-primary-light px-3 pb-3 pt-5 md:w-[636px] md:px-10 md:pb-10">
          <div class="flex h-full flex-col">
            <div class="flex items-center justify-between">
              <UButton
                v-if="isShowChat"
                class="no-border-no-shadow bg-inherit"
                @click="toggleToChatList"
              >
                <icon-heroicons-arrow-small-left class="size-6 text-zinc-950" />
              </UButton>
              <div
                v-else
                class="size-6"
              ></div>
              <p class="text-xl font-bold text-primary-dark">
                聊天
              </p>
              <UButton
                class="no-border-no-shadow bg-inherit"
                @click="close"
              >
                <icon-heroicons-chevron-double-down
                  class="size-6 text-zinc-950"
                />
              </UButton>
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
        </div>
      </template>
    </UPopover>
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
  transition: all 0.4s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
