<script setup>
const memberStore = useMemberStore()

function removeFromPersonalMyTags(tag) {
  memberStore.personalMyTags = memberStore.personalMyTags.filter(t => t !== tag)
}

function addToPersonalMyTags(tag) {
  if (memberStore.personalMyTags.includes(tag))
    return
  memberStore.personalMyTags.push(tag)
}
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
        v-for="(tag, index) in memberStore.personalMyTags"
        :key="index"
        class="flex shrink-0 items-center space-x-1 rounded-full bg-primary-light px-3 py-2 "
      >
        <span>{{ tag }}</span>
        <button
          class="i-heroicons-x-mark-16-solid size-4 duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60 lg:hover:scale-90 lg:hover:opacity-60"
          :disabled="!memberStore.editStatus"
          @click="removeFromPersonalMyTags(tag)"
        ></button>
      </li>
    </ul>

    <h3 class="mt-4 text-start text-neutral-400">
      熱門標籤
    </h3>

    <ul class="mt-2 flex h-[64px] w-full items-center space-x-2 overflow-x-scroll">
      <li
        v-for="(tag, index) in memberStore.popularTags"
        :key="index"
        class="shrink-0"
      >
        <button
          class="rounded-full bg-neutral-300 px-3 py-2 duration-300 ease-in-out  disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:opacity-60 disabled:duration-300 disabled:ease-in-out disabled:hover:scale-100 lg:hover:bg-primary-light lg:disabled:hover:bg-neutral-300"
          :disabled="!memberStore.editStatus"
          @click="addToPersonalMyTags(tag)"
        >
          {{ tag }}
        </button>
      </li>

      <li class=" hidden items-center lg:flex">
        <UPopover
          :popper="{ placement: 'bottom-end' }"
          :disabled="memberStore.editStatus" 
          class="disabled:cursor-not-allowed"
        >
          <p
            class="p-2 font-bold text-primary-dark group-disabled:opacity-50"
            :disabled="true"
          >
            更多標籤...
          </p>
          <template #panel>
            <search-dateHashtagSelectCard />
          </template>
        </UPopover>
      </li>
    </ul>

    <div class="flex justify-end lg:hidden">
      <UPopover :popper="{ placement: 'bottom-end' }">
        <p class="p-2 font-bold text-primary-dark">
          更多標籤...
        </p>
        <template #panel>
          <search-dateHashtagSelectCard />
        </template>
      </UPopover>
    </div>
  </div>
</template>
