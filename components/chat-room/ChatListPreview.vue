<script setup>
const emit = defineEmits(['openChat'])
const q = ref('')
function openChat(n) {
  emit('openChat', n)
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
  <div class="h-full overflow-auto">
    <ul
      v-if="true"
      class="size-full overflow-hidden rounded-xl bg-white"
    >
      <chat-roomChatPreview @click="openChat('01')" />
      <chat-roomChatPreview @click="openChat('02')" />
      <!-- <chat-roomChatPreview @click="openChat('03')" />
      <chat-roomChatPreview @click="openChat('04')" /> -->
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
