<script setup>
import { memberAPI } from '~/apis/repositories/member'

const selected = ref(false)
const memberStore = useMemberStore()
const imageFile = ref(null)

async function submit() {
  if (imageFile.value) {
    const formData = new FormData()
    formData.append('image', imageFile.value)

    try {
      const res = await memberAPI.uploadImage(formData)
      await memberStore.getMemberData()
      alert('照片上傳成功')

      // toast('照片上傳成功', 'success')
    }
    catch (error) {
      console.error(error)
      alert('照片上傳失敗')
      // toast('照片上傳失敗', 'error')
    }
  }

  // try {
  //   await memberAPI.updateMemberData({
  //     isPublic: selected.value,
  //   })
  //   alert('更新成功')
  //   // toast('更新成功', 'success')
  // }
  // catch (error) {
  //   alert('更新失敗')
  //   // toast('更新失敗', 'error')
  // }
}

function handleFileChange(event) {
  imageFile.value = event.target.files[0]
}
</script>

<template>
  <div class="w-full rounded-xl bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
    <div class="h-[240px] overflow-hidden rounded-xl lg:h-full lg:w-[400px]">
      <NuxtImg
        :src="memberStore.avatar"
        alt="UserSticker Image"
        class="size-full object-cover"
      />
    </div>

    <div class="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col">
      <GradientButtonRevert
        class="m-[2px] w-full lg:px-5 lg:py-3"
        @click="submit"
      >
        <GradientButtonTextRevert
          text="上傳照片"
          class="lg:text-base"
        >
          <!-- TODO:晚點搞定 -->
          <!-- <template #icon>
            <span class="i-heroicons-arrow-up-tray-16-solid text-gradient bg-gradient-to-r from-[#FE839A] to-[#4A72FF] text-xl font-bold !text-transparent lg:group-hover:bg-none lg:group-hover:text-white"></span>
          </template> -->
        </GradientButtonTextRevert>
      </GradientButtonRevert>

      <div class="flex items-center space-x-1">
        <input
          type="file"
          accept="image/*"
          @change="handleFileChange"
        >
        <UToggle
          v-model="selected"
          color="primary"
          :disabled="!memberStore.editStatus"
        />
        <span>揭露</span>
      </div>
    </div>
  </div>
</template>
