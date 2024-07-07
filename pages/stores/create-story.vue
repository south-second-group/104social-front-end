<script setup>
import { happyStoryAPI } from '@/apis/repositories/happyStory'

const coverPhoto = ref(null)
const lifePhotos = ref([
  { id: 1, file: null, preview: null },
  { id: 2, file: null, preview: null },
  { id: 3, file: null, preview: null },
])
const name1 = ref('')
const name2 = ref('')
const storyTitle = ref('')
const storyContent = ref('')
const coverImgRef = ref(null)

// 方法
function uploadCoverPhoto() {
  coverImgRef.value.click()
}

function handleCoverPhotoChange(event) {
  const file = event.target.files[0]
  if (file)
    coverPhoto.value = URL.createObjectURL(file)
}

function removeCoverPhoto() {
  coverPhoto.value = null
  if (coverImgRef.value)
    coverImgRef.value.value = ''
}

function uploadLifePhoto(photo) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      photo.file = file
      photo.preview = URL.createObjectURL(file)
    }
  }
  input.click()
}

function removeLifePhoto(photo) {
  photo.file = null
  photo.preview = null
  // 如果使用了 URL.createObjectURL，應該在這裡釋放
  if (photo.preview)
    URL.revokeObjectURL(photo.preview)
}

async function submitStory() {
  try {
    // 檢查是否有封面照片
    if (!coverImgRef.value || !coverImgRef.value.files[0]) {
      console.error('請上傳封面照片')
      // 這裡可以添加一些用戶提示，比如使用 toast 通知
      return
    }

    // 準備所有需要上傳的圖片
    const uploadPromises = []

    // 封面照片上傳
    const coverImageData = new FormData()
    coverImageData.append('image', coverImgRef.value.files[0])
    uploadPromises.push(happyStoryAPI.uploadCoverImage(coverImageData))

    // 生活照片上傳
    const validLifePhotos = lifePhotos.value.filter(photo => photo.file)
    if (validLifePhotos.length > 0) {
      const lifePhotosFormData = new FormData()
      validLifePhotos.forEach((photo) => {
        lifePhotosFormData.append(`images`, photo.file)
      })
      uploadPromises.push(happyStoryAPI.uploadMultipleImage(lifePhotosFormData))
    }

    // 等待所有圖片上傳完成
    const uploadResults = await Promise.all(uploadPromises)

    // 解析上傳結果
    const coverPhotoUrl = uploadResults[0].data.coverImage
    const lifePhotosUrls = validLifePhotos.length > 0 ? uploadResults[1].data.images : []

    // 準備故事數據
    const storyData = {
      names: [name1.value, name2.value],
      title: storyTitle.value,
      content: storyContent.value,
      coverPhotoUrl,
      lifePhotosUrls,
    }

    // console.log('準備提交的故事數據:', storyData)

    // const createStoryResult = await happyStoryAPI.createStory(storyData)
    // console.log('故事創建成功:', createStoryResult)

    // 這裡可以添加成功提示或者跳轉邏輯
  }
  catch (error) {
    console.error('提交故事時發生錯誤:', error)
    // 這裡可以添加錯誤處理邏輯，比如顯示錯誤消息給用戶
  }
}
</script>

<template>
  <div class="create-story container mt-20 space-y-8 lg:space-y-10">
    <div class="gap-x-6 md:grid md:grid-cols-6">
      <div class="col-span-4 col-start-2">
        <!-- 封面照片 -->
        <div class="rounded-xl bg-primary-light px-4 py-5">
          <h3 class="text-left font-bold">
            Step 1：上傳封面照片
          </h3>

          <div class="mt-4 items-end justify-between space-y-4">
            <div class="cover-preview relative w-full overflow-hidden rounded-lg bg-neutral-300 md:h-[450px]">
              <input
                ref="coverImgRef"
                type="file"
                class="hidden"
                @change="handleCoverPhotoChange"
              >
              <img
                v-if="coverPhoto"
                :src="coverPhoto"
                class="size-full object-cover"
              >
              <div
                v-if="coverPhoto"
                class="absolute inset-x-0 bottom-0 cursor-pointer bg-black/30 p-2 text-center text-white backdrop-blur-sm lg:hover:bg-black/70"
                @click="removeCoverPhoto"
              >
                移除圖片
              </div>
              <div
                v-else
                class="flex h-[250px] w-full cursor-pointer items-center justify-center text-lg font-bold text-black hover:bg-neutral-200 lg:h-full"
                @click="uploadCoverPhoto"
              >
                點擊上傳照片
              </div>
            </div>
          </div>
        </div>

        <!-- 生活照片 -->
        <div class="mt-8 rounded-xl bg-primary-light px-4 py-5">
          <h3 class="text-left font-bold">
            Step 2：上傳您與伴侶的生活照片
          </h3>

          <div class="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div
              v-for="photo in lifePhotos"
              :key="photo.id"
              class="aspect-square relative cursor-pointer overflow-hidden rounded-lg bg-neutral-300"
              @click="!photo.preview && uploadLifePhoto(photo)"
            >
              <img
                v-if="photo.preview"
                :src="photo.preview"
                class="h-[250px] w-full object-cover lg:h-[185px]"
              >
              <div
                v-if="photo.preview"
                class="absolute inset-x-0 bottom-0 cursor-pointer bg-black/30 p-2 text-center text-white backdrop-blur-sm lg:hover:bg-black/70"
                @click.stop="removeLifePhoto(photo)"
              >
                移除圖片
              </div>
              <div
                v-else
                class="flex h-[250px] w-full items-center justify-center text-lg font-bold text-black hover:bg-neutral-200 lg:h-[185px]"
              >
                點擊上傳照片
              </div>
            </div>
          </div>
        </div>

        <!-- 名稱設定 -->
        <div class="mt-8 rounded-xl bg-neutral-100 px-4 py-5">
          <h3 class="text-left font-bold">
            Step 3：撰寫您與伴侶的名稱
          </h3>

          <div class="mt-3 flex items-center justify-center space-x-3 lg:justify-start">
            <UInput
              v-model="name1"
              size="lg"
              placeholder="您的名字"
            />
            <span>&</span>
            <UInput
              v-model="name2"
              size="lg"
              placeholder="伴侶的名字"
            />
          </div>
        </div>

        <!-- 編輯文章 -->
        <div class="mt-8 rounded-xl bg-neutral-100 px-4 py-5">
          <h3 class="text-left font-bold">
            Step 4：撰寫您與伴侶的故事
          </h3>

          <div class="mt-3 space-y-5">
            <div class="w-full items-center space-y-3">
              <p class="text-left font-semibold">
                文章標題：
              </p>
              <UInput
                v-model="storyTitle"
                class="w-full"
                size="lg"
                placeholder="輸入標題"
              />
            </div>

            <div class="w-full items-center space-y-3">
              <p class="text-left font-semibold">
                文章內容：
              </p>
              <TheCkeditor v-model="storyContent" />
            </div>
          </div>
        </div>

        <!-- 提交按鈕 -->
        <div class="mt-8 flex justify-center">
          <GradientButton
            class="m-[2px] px-10 py-3"
            @click="submitStory"
          >
            <GradientButtonText text="提交故事" />
          </GradientButton>
        </div>
      </div>
    </div>
  </div>
</template>
