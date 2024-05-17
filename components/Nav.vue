<script setup>
import Notification from '@/components/Notification.vue'

const showNotification = ref(false)
const notificationRef = ref(null)

function toggleNotification(event) {
  event.stopPropagation()
  showNotification.value = !showNotification.value
}

function handleClickOutside(event) {
  if (notificationRef.value && !notificationRef.value.contains(event.target) && showNotification.value)
    showNotification.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    class="bg-nav-light-gray sticky top-5 z-[1000] w-full max-w-custom-container rounded-full bg-zinc-50/80"
  >
    <div class="flex w-full px-10 py-4">
      <h1 class="shrink-0">
        <img
          src="../assets/img/logo.png"
          alt="104 緣來如此"
        >
      </h1>

      <div class="flex w-full grow items-center justify-between">
        <ul class="relative ml-auto flex gap-6">
          <li class="p-2 text-zinc-950">
            精選文章
          </li>
          <li class="p-2 text-zinc-950">
            尋找對象
          </li>
          <li class="p-2 text-zinc-950">
            找案例
          </li>
          <li class="p-2 text-zinc-950">
            關於我們
          </li>
          <li class="p-2 text-zinc-950">
            會員資料
          </li>
          <li
            class="p-2 text-zinc-950"
            @click="toggleNotification($event)"
          >
            站內通知
          </li>
          <div
            v-if="showNotification"
            ref="notificationRef"
            class="absolute right-0 top-[48px]"
          >
            <Notification />
          </div>
        </ul>
        <div class="ml-4">
          <!-- <button
            type="button"
            class="btn-linear-nav block"
          >
            <p>登入 / 註冊</p>
          </button> -->

          <router-link
            to="/login"
            type="button"
            class="btn-linear-nav block"
          >
            <p>登入 / 註冊</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
