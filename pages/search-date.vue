<script setup>
const items = [{
  name: 'Lisa',
  describe_1: ['28 歲', '167 cm'],
  describe_2: ['房仲業'],
  rating: 4.6,
  ratingCount: 12,
  collect: false,
  hashtag: ['婚後自住', '不生小孩'],
  avatar: { src: '/member/member-lg-01.png' },
}, {
  name: 'Mike',
  describe_1: ['31 歲'],
  describe_2: ['台南', '工程師'],
  rating: 4.3,
  ratingCount: 12,
  collect: false,
  hashtag: ['年薪百萬'],
  avatar: { src: '/member/member-lg-02.png' },
}, {
  name: 'Joshua',
  describe_1: ['30 歲', '185 cm'],
  describe_2: ['桃園機場地勤'],
  rating: 4.1,
  ratingCount: 15,
  collect: false,
  hashtag: ['開放關係', '水瓶座'],
  avatar: { src: '/member/member-lg-03.png' },
}, {
  name: 'Liam',
  describe_1: ['45 歲', '173 cm'],
  describe_2: ['台中'],
  rating: 4.6,
  ratingCount: 30,
  collect: false,
  hashtag: ['BDSM', '主'],
  avatar: { src: '/member/member-lg-04.png' },
}]
const locationType = ['北部', '中部', '南部', '東部']
const locationSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const sortType = ['最後更新時間', '最多評價']
const sortSelected = ref(null)

const keyWord = ref(null)

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 1024
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
  <div class="container">
    <div class="grid grid-cols-12 gap-6 py-5 lg:py-20">
      <div class="col-span-12 mt-4 lg:col-span-9">
        <div class="mb-3 flex flex-col lg:mb-20 lg:flex-row">
          <div class="mb-2 me-4 h-12 w-full rounded-lg border bg-white lg:mb-0 lg:max-w-[380px]">
            <UInput
              v-model="keyWord"
              color="primary"
              variant="none"
              size="xl"
              placeholder="輸入理想對象的職業、興趣、星座..."
            />
          </div>
          <div class="flex gap-2 lg:gap-4">
            <div class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]">
              <USelectMenu
                v-model="locationSelected"
                :options="locationType"
                placeholder="所在地區"
                class="text-gray-400"
                size="xl"
                variant="none"
              />
            </div>
            <div class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]">
              <USelectMenu
                v-model="searchTypeSelected"
                :options="searchType"
                placeholder="性別"
                class="text-gray-400"
                size="xl"
                variant="none"
              />
            </div>
            <div class="flex items-center">
              <div class="my-auto">
                <div class="rounded-full bg-[#FFF5F5] p-2">
                  <span class="cursor-pointer text-xl text-primary-dark">
                    <icon-heroicons-adjustments-horizontal class="size-6" />
                  </span>
                </div>
              </div>
              <div class="lg:w-full">
                <UButton
                  :ui="{ rounded: 'rounded-full' }"
                  class="ms-2 bg-primary-dark p-2 text-base font-bold lg:ms-4 lg:w-full lg:px-5 lg:py-2"
                >
                  <p class="hidden lg:block">
                    搜尋
                  </p>
                  <icon-heroicons-magnifying-glass class="size-6 lg:hidden" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
        <search-dateMemberOptions class="lg:hidden" />
        <div class="mb-6 mt-10 flex w-full flex-col justify-between lg:mt-0 lg:flex-row lg:items-center">
          <div class="mb-6 flex gap-6 overflow-x-auto lg:mb-0">
            <div class="whitespace-nowrap p-2">
              全部（9487）
            </div>
            <UDivider
              orientation="vertical"
              class="my-1.5"
            />
            <div class="whitespace-nowrap p-2">
              公開（8524）
            </div>
            <UDivider
              orientation="vertical"
              class="my-1.5"
            />
            <div class="whitespace-nowrap p-2">
              近期刊登（487）
            </div>
          </div>
          <div class="h-12 w-full max-w-[196px] self-start rounded-lg border bg-white lg:self-end">
            <USelectMenu
              v-model="sortSelected"
              :options="sortType"
              placeholder="預設排序"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
        </div>
        <div class="flex flex-wrap justify-center lg:flex-col">
          <search-dateMemberSearchCard />
          <search-dateMemberSearchCard />
          <search-dateMemberSearchCard />
        </div>
      </div>
      <!-- 右側表單 -->
      <search-dateMemberOptions class="hidden lg:block" />
    </div>
    <div class="border border-transparent border-y-zinc-200 py-12 lg:py-20">
      <p class="text-H4 mb-6 text-zinc-400 lg:mb-[60px]">
        也許你也喜歡...
      </p>
      <div
        v-if="isDesktop"
        class="grid grid-cols-2 gap-6"
      >
        <search-dateMemberSearchCard />
        <search-dateMemberSearchCard />
        <search-dateMemberSearchCard />
        <search-dateMemberSearchCard />
      </div>
      <UCarousel
        v-else
        v-slot="{ item }"
        :items="items"
      >
        <div class="mx-auto text-center">
          <search-dateMemberSearchCard :member="item" />
        </div>
      </UCarousel>
    </div>
  </div>
</template>
