<script setup>
const memberStore = useMemberStore()
</script>

<template>
  <div class=" w-full rounded-[10px] bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
    <ClientOnly>
      <UTextarea
        v-model="memberStore.personalIntro.content"
        placeholder="請輸入自我介紹..."
        :rows="14"
        class="size-full lg:w-2/3"
        :disabled="!memberStore.editStatus"
      />
    </ClientOnly>

    <div class="mt-4 flex items-center justify-end lg:mt-0 lg:flex-col">
      <div class="flex items-center space-x-1">
        <UToggle
          v-model="memberStore.personalIntro.isShow"
          color="primary"
          :disabled="!memberStore.editStatus"
        />
        <span>揭露</span>
      </div>
    </div>
  </div>
</template>
