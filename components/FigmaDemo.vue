<script setup>
const open = ref(false)
const temp = ref(false)
const selectedItem = ref(null) // v-model 我測試無法用，只好用 click 事件 ，應該要可以，等勇者來解
const searchValue = ref('')

const items = [
  [
    {
      label: 'Profile',
      click: () => {
        selectedItem.value = 'Profile'
      },
    },
    {
      label: 'Profile2',
      click: () => {
        selectedItem.value = 'Profile2'
      },
    },
  ],
]

defineShortcuts({
  o: () => (open.value = !open.value),
})
</script>

<template>
  <div class="flex flex-col space-y-5">
    <button class="btn-linear-sm block">
      <p>搜尋</p>
    </button>

    <button class="btn-linear-md block">
      <p>搜尋</p>
    </button>

    <button class="btn-linear-lg block">
      <p>搜尋</p>
    </button>

    <button class="btn-withIcon-fill">
      <icon-heroicons:heart />
      <p>邀約</p>
    </button>

    <button class="btn-withIcon-outline">
      <icon-heroicons:lock-open />
      <p>解鎖評價</p>
    </button>

    <button
      class="btn-textOrIcon-lg"
      disabled
    >
      <p>查看更多</p>
      <icon-heroicons:arrow-right />
    </button>

    <button class="btn-textOrIcon-sm">
      <p>查看更多</p>
      <icon-heroicons:arrow-right />
    </button>

    <button class="btn-textOrIcon-sm">
      <p>閱讀全文</p>
    </button>

    <button class="btn-textOrIcon-lg">
      <icon-heroicons:chat-bubble-left-ellipsis />
    </button>

    <button
      class="btn-textOrIcon-sm pointer-events-none rounded-full"
      disabled
    >
      <icon-heroicons:chat-bubble-left-ellipsis />
    </button>

    <UInput
      v-model="searchValue"
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="搜尋"
      class="search-lg"
    />
    {{ searchValue }}

    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="lg"
      color="white"
      :trailing="false"
      placeholder="搜尋"
      class="search-sm"
      disabled
    />

    <UInput
      icon=""
      size="lg"
      color="white"
      :trailing="false"
      placeholder="職業、興趣、星座..."
      class="search-sm"
    />

    <UDropdown
      v-model:open="temp"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        width: 'w-[303px]',
        ring: 'ring-1 ring-gray-100',
        shadow: 'shadow-md',
      }"
      class="dropdown-sm pointer-events-none opacity-60"
      :class="{
        border: temp,
      }"
      disabled
    >
      <UButton
        color="white"
        label="請選擇性別"
        trailing-icon="i-heroicons-chevron-down-20-solid"
        class="text-[#A1A1AA]"
      />
    </UDropdown>

    <UDropdown
      v-model="selectedItem"
      v-model:open="open"
      :items="items"
      :popper="{ placement: 'bottom-start' }"
      :ui="{
        width: 'w-[514px]',
        ring: 'ring-1 ring-gray-100',
        shadow: 'shadow-md',
      }"
      class="dropdown-lg"
      :class="{
        border: open,
      }"
      @change="console.log('change')"
    >
      <UButton
        color="white"
        :label="selectedItem || '請選擇性別'"
        trailing-icon="i-heroicons-chevron-down-20-solid"
        class="text-[#A1A1AA]"
      />
    </UDropdown>
    {{ selectedItem || '請選擇性別' }}
  </div>
</template>
