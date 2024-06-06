<script setup>
// toggle
const selected = ref(false)
</script>

<template>
  <div class=" w-full rounded-xl bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
    <div class="h-[240px] overflow-hidden rounded-xl lg:h-full lg:w-[400px]">
      <NuxtImg
        src="/member/member-sm-02.png"
        alt="UserSticker Image"
        class="size-full object-cover"
      />
    </div>

    <div class="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col">
      <button class="h-10 w-[138px] rounded-full ring-1">
        上傳照片
      </button>

      <div class="flex items-center space-x-1">
        <UToggle
          v-model="selected"
          color="primary"
        />
        <span>揭露</span>
      </div>
    </div>
  </div>
</template>
