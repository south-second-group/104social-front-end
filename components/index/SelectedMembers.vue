<script setup>
import { searchApi } from '../apis/repositories/search'

const isDataLoading = ref(true)
const eliteList = ref([])

async function getEliteList() {
  try {
    const { data } = await searchApi.getEliteList()
    eliteList.value = data.resultList
  }
  catch (error) {
    console.error(error)

    isDataLoading.value = false
  }
}

onMounted(() => {
  getEliteList()
})

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <div class="relative w-full overflow-hidden rounded-t-[40px] bg-[#fff5f5] py-12 lg:rounded-t-[80px] lg:py-[100px]">
    <div class="absolute -left-20 -top-20 opacity-80">
      <NuxtImg
        src="/member/blur/lg.png"
        alt="banner_image"
        class="w-[242px]"
      />
    </div>
    <div class="container relative z-50 m-auto">
      <p class="text-H4 mb-6 font-bold text-primary-dark md:hidden lg:mb-0">
        精選會員
      </p>
      <p class="text-H2 mb-6 hidden font-bold text-primary-dark md:block lg:mb-0">
        精選會員
      </p>

      <!-- 電腦版 -->
      <div
        v-if="isDesktop"
        class="my-[60px] grid grid-cols-2 gap-6 "
      >
        <div
          v-for="(item, index) in eliteList"
          :key="index"
        >
          <indexMemberCard :member="item" />
        </div>
      </div>
      <!-- 手機版 -->
      <UCarousel
        v-else
        v-slot="{ item }"
        :items="eliteList"
      >
        <div class="mx-auto text-center">
          <indexMemberCard :member="item" />
        </div>
      </UCarousel>
    </div>
    <div class="lg:hidden">
      <NuxtLink
        to="/search-date"
        class="btn-textOrIcon-sm mx-auto mt-6"
      >
        <p>查看更多</p>
        <icon-heroicons:arrow-right />
      </NuxtLink>
    </div>
    <div class="hidden lg:block">
      <NuxtLink
        to="/search-date"
        class="btn-textOrIcon-lg mx-auto mt-6"
      >
        <p>查看更多</p>
        <icon-heroicons:arrow-right />
      </NuxtLink>
    </div>
  </div>
</template>
