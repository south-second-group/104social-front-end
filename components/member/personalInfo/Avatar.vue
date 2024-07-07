<script setup>
const selected = ref(false)
const memberStore = useMemberStore()

async function submit() {
  document.getElementById('fileInput').click()
}
</script>

<template>
  <div class="w-full rounded-xl bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
    <div class="h-[240px] overflow-hidden rounded-xl lg:h-full lg:w-2/3 xl:w-[400px]">
      <NuxtImg
        v-if="memberStore.previewImage || memberStore.personalPhoto.photo"
        :src="memberStore.previewImage || memberStore.personalPhoto.photo"
        alt="UserSticker Image"
        class="size-full object-cover"
      />

      <USkeleton
        v-else
        class="size-full"
        :ui="{ rounded: 'rounded-xl', background: 'bg-primary-dark' }"
      />
    </div>

    <div class="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col">
      <GradientButtonRevert
        class="m-[2px] w-full px-4 py-2 lg:px-5 lg:py-3"
        :is-disabled="!memberStore.editStatus"
        @click="submit"
      >
        <GradientButtonTextRevert
          text="上傳照片"
          class="text-sm lg:text-base"
          :is-disabled="!memberStore.editStatus"
        >
          <!-- TODO:晚點搞定 -->
          <!-- <template #icon>
            <span class="i-heroicons-arrow-up-tray-16-solid text-gradient bg-gradient-to-r from-[#FE839A] to-[#4A72FF] text-xl font-bold !text-transparent lg:group-hover:bg-none lg:group-hover:text-white"></span>
          </template> -->
        </GradientButtonTextRevert>
      </GradientButtonRevert>

      <div class="flex items-center space-x-1">
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style="display: none"
          @change="memberStore.handleFileChange"
        >
        <UToggle
          v-model="memberStore.personalPhoto.isShow"
          color="primary"
          :disabled="!memberStore.editStatus"
        />
        <span>揭露</span>
      </div>
    </div>
  </div>
</template>
