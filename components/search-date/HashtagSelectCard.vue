<script setup>
const hashtags = {
  signs: ['牡羊座', '金牛座', '雙子座', '巨蟹座', '獅子座', '處女座', '天秤座', '天蠍座', '射手座', '摩羯座', '水瓶座', '雙魚座'],
  personality: ['健談', '冷靜', '害羞', '社恐', '大而化之', '個性內向', '個性外向', '嚴謹'],
  hobby: ['登山', '游泳', '手遊', '購物', '看電影', '聚餐', '睡覺', '旅行'],
  values: ['愛情優先', '信仰', '孝順', '享樂主義', '工作成就', '穩定', '樂於助人'],
}

const selectedHashtag = []
const excludedHashtag = []

const currentTab = ref('signs')

const filteredItems = computed(() => {
  return items.filter(item => item.category === currentTab.value)
})

function changeTab(tab) {
  currentTab.value = tab
}
</script>

<template>
  <div class="box w-[666px] p-4">
    <div class="">
      <div class="mb-3">
        <p class="text-B3 mb-1 text-start text-zinc-400">
          搜尋條件
        </p>
        <div class="flex items-center rounded-lg border border-zinc-200 p-2">
          <div class="flex shrink-0 gap-3">
            <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-[#FFF5F5] px-3 py-2 ">
              <p class="me-1 text-base text-zinc-900">
                水瓶座
              </p>
              <icon-heroicons-x-mark class="size-4 text-zinc-900" />
            </UBadge>
            <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-[#FFF5F5] px-3 py-2 ">
              <p class="me-1 text-base text-zinc-900">
                水瓶座
              </p>
              <icon-heroicons-x-mark class="size-4 text-zinc-900" />
            </UBadge>
          </div>
          <div class="w-full">
            <UInput size="xl" variant="none" placeholder="輸入標籤關鍵字" />
          </div>
        </div>
      </div>
      <div class="">
        <p class="text-B3 mb-1 text-start text-zinc-400">
          排除條件
        </p>
        <div class="flex items-center rounded-lg border border-zinc-200 p-2">
          <div class="flex shrink-0 gap-3">
            <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-[#FFF5F5] px-3 py-2 ">
              <p class="me-1 text-base text-zinc-900">
                性格內向
              </p>
              <icon-heroicons-x-mark class="size-4 text-zinc-900" />
            </UBadge>
            <UBadge :ui="{ rounded: 'rounded-full' }" class="bg-[#FFF5F5] px-3 py-2 ">
              <p class="me-1 text-base text-zinc-900">
                性格內向
              </p>
              <icon-heroicons-x-mark class="size-4 text-zinc-900" />
            </UBadge>
          </div>
          <div class="w-full">
            <UInput size="xl" variant="none" placeholder="輸入標籤關鍵字" />
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 flex">
      <div :class="{ 'active-tab': currentTab === 'signs', 'inactive-tab': currentTab !== 'signs' }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out" @click="changeTab('signs')">
        星座
      </div>
      <UDivider orientation="vertical" class="mx-4" />
      <div :class="{ 'active-tab': currentTab === 'personality', 'inactive-tab': currentTab !== 'personality' }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out" @click="changeTab('personality')">
        個性
      </div>
      <UDivider orientation="vertical" class="mx-4" />
      <div :class="{ 'active-tab': currentTab === 'hobby', 'inactive-tab': currentTab !== 'hobby' }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out" @click="changeTab('hobby')">
        興趣
      </div>
      <UDivider orientation="vertical" class="mx-4" />
      <div :class="{ 'active-tab': currentTab === 'values', 'inactive-tab': currentTab !== 'values' }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out" @click="changeTab('values')">
        價值觀
      </div>
    </div>
    <div class="flex flex-wrap gap-3 py-3">
      <search-dateHashtag v-for="item in hashtags[currentTab]" :key="item" :item="item" />
    </div>
    <div class="flex justify-end py-4">
      <UButton :ui="{ rounded: 'rounded-full' }"
        class="border bg-primary-dark px-5 py-2 text-base font-bold text-white hover:border-primary-dark hover:bg-white"
        hover:text-primary-dark>
        開始搜尋
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.box {
  position: relative;
  z-index: 5000;
}

.box::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 6px;
  padding: 2px;
  opacity: 0.6;
  background: linear-gradient(90deg, #FE839A, #4A72FF);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.active-tab {
  color: #F47277;
}

.active-tab p {
  font-weight: 700;
}

.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
