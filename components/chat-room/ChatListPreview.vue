<script setup>
const emit = defineEmits(['openChat'])
const roomId = ref(['667915e9d837a875701fc2d3', '667a6c3ef04c405b02b2151e'])
const q = ref('')
function openChat(roomId) {
  emit('openChat', roomId)
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
      v-if="true"
      class="rounded-xl bg-white"
    >
      <chat-roomChatPreview @click="openChat(roomId[0])" />
      <chat-roomChatPreview @click="openChat(roomId[1])" />
      <!-- <chat-roomChatPreview @click="openChat(roomId)" /> -->
    </ul>
    <div
      v-if="false"
      class="flex size-full items-center justify-center"
    >
      <p
        class="text-xl font-bold text-primary-dark"
      >
        Oops！查無此人
      </p>
    </div>
    <div
      v-if="false"
      class="flex h-full flex-col items-center justify-center rounded-xl bg-white"
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
