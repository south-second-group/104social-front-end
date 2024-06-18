<script setup>
import { ref } from 'vue'

const selected = ref(false)
const memberStore = useMemberStore()
const imageFile = ref(null)
const previewUrl = ref('')

async function submit() {
  // 觸發傳統樣式的選擇圖片按鈕
  document.getElementById('fileInput').click()
}

async function handleFileChange(event) {
  imageFile.value = event.target.files[0]

  if (imageFile.value) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(imageFile.value)

    const formData = new FormData()
    formData.append('image', imageFile.value)

    // TODO:上傳圖片 API 要拉到 store 內，按下完成編輯時一併上傳
    // try {
    //   const res = await memberAPI.uploadImage(formData)
    //   await memberStore.getMemberData()
    //   alert('照片上傳成功')

    //   // toast('照片上傳成功', 'success')
    // }
    // catch (error) {
    //   console.error(error)
    //   alert('照片上傳失敗')
    //   // toast('照片上傳失敗', 'error')
    // }
  }
}
</script>

<template>
  <div class="w-full rounded-xl bg-neutral-100 p-4 lg:flex lg:space-x-6 lg:p-6">
    <div class="h-[240px] overflow-hidden rounded-xl lg:h-full lg:w-[400px]">
      <NuxtImg
        :src="previewUrl || memberStore.avatar"
        alt="UserSticker Image"
        class="size-full object-cover"
      />
    </div>

    <div class="mt-4 flex items-center justify-between lg:mt-0 lg:flex-col">
      <GradientButtonRevert
        class="m-[2px] w-full px-4 py-2 lg:px-5 lg:py-3"
        @click="submit"
      >
        <GradientButtonTextRevert
          text="上傳照片"
          class="text-sm lg:text-base"
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
