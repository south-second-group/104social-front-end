<template>
  <div class="fixed bottom-[60px] right-[60px] z-[2000]">
    <UPopover :popper="{ placement: 'top-end', offsetDistance: -60 }">
      <UButton
        color="white"
        class="no-border-no-shadow rounded-full bg-primary-dark p-3 hover:bg-primary-dark"
      >
        <icon-heroicons-chat-bubble-left-ellipsis class="size-9 text-white" />
      </UButton>
      <template #panel="{ close }">
        <div class="chatRoomSize w-[636px] bg-primary-light px-10 pb-10 pt-5">
          <div class="flex h-full flex-col">
            <div class="flex items-center justify-between">
              <UButton
                class="no-border-no-shadow bg-inherit"
              >
                <icon-heroicons-arrow-small-left class="size-6 text-zinc-950" />
              </UButton>
              <p class="text-xl font-bold text-primary-dark">
                聊天
              </p>
              <UButton
                class="no-border-no-shadow bg-inherit"
                @click="close"
              >
                <icon-heroicons-chevron-double-down class="size-6 text-zinc-950" />
              </UButton>
            </div>
            <chat-roomChatListPreview v-if="false" />
            <chat-roomChat />
          </div>
        </div>
      </template>
    </UPopover>
  </div>
</template>

<style scoped>
.chatRoomSize {
  /* width: 636px; */
  height: calc(100vh - 120px);
}
.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
