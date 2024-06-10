<script setup>
const hashtags = {
  signs: [
    '牡羊座',
    '金牛座',
    '雙子座',
    '巨蟹座',
    '獅子座',
    '處女座',
    '天秤座',
    '天蠍座',
    '射手座',
    '摩羯座',
    '水瓶座',
    '雙魚座',
  ],
  personality: [
    '健談',
    '冷靜',
    '害羞',
    '社恐',
    '大而化之',
    '個性內向',
    '個性外向',
    '嚴謹',
  ],
  hobby: ['登山', '游泳', '手遊', '購物', '看電影', '聚餐', '睡覺', '旅行'],
  values: [
    '愛情優先',
    '信仰',
    '孝順',
    '享樂主義',
    '工作成就',
    '穩定',
    '樂於助人',
  ],
}

const selectedHashtag = ref([])
const excludedHashtag = ref([])

const currentTab = ref('')

const filteredItems = computed(() => {
  return items.filter(item => item.category === currentTab.value)
})

function changeTab(tab) {
  currentTab.value = tab
}

function handleAddToSelectedHashtag(tag) {
  if (!selectedHashtag.value.includes(tag))
    selectedHashtag.value = [...selectedHashtag.value, tag]

  if (excludedHashtag.value.includes(tag))
    removeExcludedHashtag(tag)
}

function handleAddToExcludedHashtag(tag) {
  if (!excludedHashtag.value.includes(tag))
    excludedHashtag.value = [...excludedHashtag.value, tag]

  if (selectedHashtag.value.includes(tag))
    removeSelectedTag(tag)
}

function removeSelectedTag(tag) {
  selectedHashtag.value = selectedHashtag.value.filter(item => item !== tag)
}

function removeExcludedHashtag(tag) {
  excludedHashtag.value = excludedHashtag.value.filter(item => item !== tag)
}

onMounted(() => {
  currentTab.value = 'signs'
  // 避免 tags 的高度跑掉
})
</script>

<template>
  <div class="box w-[95%] p-4 md:w-[666px]">
    <div class="">
      <div class="mb-3">
        <p class="text-B3 mb-1 text-start text-zinc-400">
          搜尋條件
        </p>
        <div class="flex items-center rounded-lg border border-zinc-200 p-2">
          <div class="flex shrink-0 gap-3">
            <UBadge
              v-for="tag in selectedHashtag"
              :key="tag"
              :ui="{ rounded: 'rounded-full' }"
              class="bg-[#FFF5F5] px-3 py-2"
            >
              <p class="me-1 text-base text-zinc-900">
                {{ tag }}
              </p>
              <icon-heroicons-x-mark
                class="size-4 cursor-pointer text-zinc-900"
                @click="removeSelectedTag(tag)"
              />
            </UBadge>
          </div>
          <div class="w-full">
            <UInput
              size="xl"
              variant="none"
              placeholder="輸入標籤關鍵字"
            />
          </div>
        </div>
      </div>
      <div class="">
        <p class="text-B3 mb-1 text-start text-zinc-400">
          排除條件
        </p>
        <div class="flex items-center rounded-lg border border-zinc-200 p-2">
          <div class="flex shrink-0 gap-3">
            <UBadge
              v-for="tag in excludedHashtag"
              :key="tag"
              :ui="{ rounded: 'rounded-full' }"
              class="bg-[#FFF5F5] px-3 py-2"
            >
              <p class="me-1 text-base text-zinc-900">
                {{ tag }}
              </p>
              <icon-heroicons-x-mark
                class="size-4 cursor-pointer text-zinc-900"
                @click="removeExcludedHashtag(tag)"
              />
            </UBadge>
          </div>
          <div class="w-full">
            <UInput
              size="xl"
              variant="none"
              placeholder="輸入標籤關鍵字"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 flex">
      <div
        :class="{
          'active-tab': currentTab === 'signs',
          'inactive-tab': currentTab !== 'signs',
        }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out"
        @click="changeTab('signs')"
      >
        星座
      </div>
      <UDivider
        orientation="vertical"
        class="mx-4"
      />
      <div
        :class="{
          'active-tab': currentTab === 'personality',
          'inactive-tab': currentTab !== 'personality',
        }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out"
        @click="changeTab('personality')"
      >
        個性
      </div>
      <UDivider
        orientation="vertical"
        class="mx-4"
      />
      <div
        :class="{
          'active-tab': currentTab === 'hobby',
          'inactive-tab': currentTab !== 'hobby',
        }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out"
        @click="changeTab('hobby')"
      >
        興趣
      </div>
      <UDivider
        orientation="vertical"
        class="mx-4"
      />
      <div
        :class="{
          'active-tab': currentTab === 'values',
          'inactive-tab': currentTab !== 'values',
        }"
        class="cursor-pointer p-2 text-zinc-400 transition duration-300 ease-in-out"
        @click="changeTab('values')"
      >
        價值觀
      </div>
    </div>
    <div class="flex flex-wrap gap-3 py-3">
      <div
        v-for="item in hashtags[currentTab]"
        :key="item"
      >
        <search-dateHashtag
          :item="item"
          @push-selected-hashtag="handleAddToSelectedHashtag"
          @push-excluded-hashtag="handleAddToExcludedHashtag"
        />
      </div>
    </div>
    <div class="flex justify-end py-4">
      <UButton
        :ui="{ rounded: 'rounded-full' }"
        class="hover:text-primary border bg-primary-dark px-5 py-2 text-base font-bold text-white transition duration-300 ease-in-out hover:border-primary-dark hover:bg-white"
        hover:text-primary-dark
      >
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
  background: linear-gradient(90deg, #fe839a, #4a72ff);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.active-tab {
  color: #f47277;
}

.active-tab p {
  font-weight: 700;
}

.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
