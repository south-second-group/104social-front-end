<script setup>
const items = [
  [
    {
      icon: 'i-heroicons-x-mark',
    },
    {
      label: '置頂',
    },
    {
      label: '關閉通知',
    },
    {
      label: '封鎖對方',
    },
    {
      label: '檢舉',
    },
  ],
]
</script>

<template>
  <li class="flex justify-between border-b-[1px] border-zinc-200 p-4">
    <div class="flex gap-5 self-center">
      <UAvatar
        size="3xl"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
      <div class="text-start">
        <p class="mb-1 text-xl font-bold text-zinc-950">
          Fatima
        </p>
        <p class="text-zinc-600">
          我要去洗澡了
        </p>
      </div>
    </div>
    <div class="flex flex-col items-end justify-end gap-3">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          color="white"
          trailing-icon="i-heroicons-ellipsis-horizontal"
          class="no-border-no-shadow"
        />
        <template #item="{ item }">
          <p class="truncate p-2">
            {{ item.label }}
          </p>
          <UIcon
            :name="item.icon"
            class="ms-auto size-4 shrink-0 text-zinc-950 dark:text-gray-500"
          />
        </template>
      </UDropdown>
      <div
        class="flex size-9 justify-center self-end rounded-full bg-primary-dark"
      >
        <p class="text-B2 self-center text-white">
          3
        </p>
      </div>
      <p class="text-B3 text-end text-zinc-400">
        下午 18:12
      </p>
    </div>
  </li>
</template>
