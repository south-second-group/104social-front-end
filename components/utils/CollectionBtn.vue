<script setup>
import { collectionApi } from '~/apis/repositories/collections'

const props = defineProps({
  userId: String,
  collectionTableId: String,
  isCollected: Boolean,
})

const isHover = ref(false)
const isCheck = ref(false)
const toastMessage = ref('')
const toastType = ref('')
const tempCollectionTableId = ref(props.collectionTableId)
const isLoading = ref(false)

async function clickHandler() {
  isCheck.value = !isCheck.value
  isLoading.value = true

  if (isCheck.value) {
    await collectionApi
      .addCollection({ collectedUserId: props.userId })
      .then((res) => {
        tempCollectionTableId.value = res.data.id

        toastMessage.value = res.message
        toastType.value = 'success'
      })
      .catch(() => {
        toastMessage.value = '加入收藏失敗'
        toastType.value = 'error'
      })
  }
  else {
    await collectionApi
      .deleteCollectionById(tempCollectionTableId.value)
      .then((res) => {
        toastMessage.value = res.message
        toastType.value = 'success'
      })
      .catch(() => {
        toastMessage.value = '移除收藏失敗'
        toastType.value = 'error'
      })
  }

  await new Promise(resolve => setTimeout(resolve, 3000))
  isLoading.value = false
}

onMounted(() => {
  isCheck.value = props.isCollected
})
</script>

<template>
  <div :class="{ ' pointer-events-none ': isLoading }">
    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
      :time-out="3000"
    />
    <svg
      class="cursor-pointer"
      viewBox="0 0 24 24"
      width="1.2em"
      height="1.2em"
      @click="clickHandler"
      @mouseover="() => (isHover = true)"
      @mouseleave="() => (isHover = false)"
    >
      <defs>
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            style="stop-color: #fe839a; stop-opacity: 1"
          />
          <stop
            offset="100%"
            style="stop-color: #4a72ff; stop-opacity: 1"
          />
        </linearGradient>
      </defs>
      <path
        :fill="isCheck || isHover ? 'url(#gradient) #fe839a' : 'none'"
        stroke="url(#gradient) #fe839a"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345z"
      />
    </svg>
  </div>
</template>
