<script setup>
const showNotification = ref(false)
const notificationRef = ref(null)

function toggleNotification(event) {
  event.stopPropagation()
  showNotification.value = !showNotification.value
}

function handleClickOutside(event) {
  if (
    notificationRef.value
    && !notificationRef.value.contains(event.target)
    && showNotification.value
  )
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
  <div class="sticky z-[1000] h-[120px] w-full max-w-[1296px]">
    <div
      class="container mx-auto mt-5 rounded-full bg-zinc-50/80"
    >
      <div class="flex w-full px-10 py-4">
        <RouterLink to="/">
          <h1 class="shrink-0">
            <NuxtImg
              src="/logo.png"
              alt="104 緣來如此"
              class="w-[192px]"
            />
          </h1>
        </RouterLink>

        <div class="flex w-full grow items-center justify-between">
          <ul class="relative ml-auto flex gap-6">
            <li class="nav-items p-2">
              <RouterLink to="/articles">
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>精選文章</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-items p-2">
              <RouterLink to="/searching_for_dating">
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>尋找對象</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-items p-2">
              <RouterLink to="/stroy">
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>找案例</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-items p-2">
              <RouterLink to="/about">
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>關於我們</p>
                </div>
              </RouterLink>
            </li>
            <li class="nav-items p-2">
              <RouterLink to="/account">
                <div class="relative">
                  <icon-heroicons:sparkles-solid />
                  <p>會員資料</p>
                </div>
              </RouterLink>
            </li>
            <li
              class="nav-items p-2"
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
            <button class="btn-linear-nav block">
              <p>登入 / 註冊</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
