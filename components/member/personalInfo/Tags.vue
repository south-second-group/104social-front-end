<script setup>
// toggle
const selected = ref(false)

// 熱門標籤
const hotTags = [
  '不生小孩',
  '露營',
  '要不要來我家看貓',
]

// 我的標籤
const myTags = [
  '日語',
  '肉食系',
  'Cosplay',
  '愛吃好料',
]
</script>

<template>
  <div class="w-full rounded-[10px] bg-neutral-100 p-4 lg:p-6">
    <h2 class="text-start text-xl font-bold">
      我的標籤
    </h2>
    <p class="text-start text-sm text-neutral-400">
      在 # 後面輸入您的性格特徵或您感興趣的話題
    </p>

    <ul class="mt-2 flex h-[64px] w-full space-x-2 overflow-x-scroll rounded-lg border border-neutral-300 bg-white p-3">
      <li
        v-for="(tag, index) in myTags"
        :key="index"
        class="flex shrink-0 items-center space-x-1 rounded-full bg-primary-light px-3 py-2"
      >
        <span>{{ tag }}</span>
        <button class="i-heroicons-x-mark-16-solid size-4 ring-1"></button>
      </li>
    </ul>

    <h3 class="mt-4 text-start text-neutral-400">
      熱門標籤
    </h3>

    <ul class="mt-2 flex h-[64px] w-full items-center space-x-2 overflow-x-scroll">
      <li
        v-for="(tag, index) in hotTags"
        :key="index"
        class="shrink-0"
      >
        <button class="rounded-full bg-neutral-300 px-3 py-2">
          {{ tag }}
        </button>
      </li>

      <li class=" hidden items-center lg:flex">
        <button class="p-2 font-bold text-primary-dark">
          更多標籤...
        </button>
      </li>
    </ul>

    <div class="flex justify-end lg:hidden">
      <button class="mt-2 p-2 font-bold text-primary-dark">
        更多標籤...
      </button>
    </div>
  </div>
</template>
