<script setup>
const popularTag = ['水瓶座', '雙魚座', '登山', '射手座', '游泳', '獅子座', '巨蟹座', '健談', '冷靜', '害羞']

// const userGenderOptions = [{
//   value: 'male',
//   label: '男性',
// }, {
//   value: 'female',
//   label: '女性',
// }, {
//   value: 'non-binary',
//   label: '非二元性別',
// }]

// const lookingForGenderOptions = [{
//   value: 'male',
//   label: '男性',
// }, {
//   value: 'female',
//   label: '女性',
// }, {
//   value: 'non-binary',
//   label: '非二元性別',
// }]

// const selectedUserGender = ref('')
// const selectedLookingForGenderOptions = ref('')

const searchCriteriaStore = useSearchCriteriaStore()
const { selected, excluded } = storeToRefs(searchCriteriaStore)
const { setSelectedList, setExcludedList, removeSelectedTag, removeExcludedHashtag } = searchCriteriaStore

function selectedBySelectedHashtag(item) {
  return selected.value.includes(item)
}

function selectedByExcludedHashtag(item) {
  return excluded.value.includes(item)
}

function handleAddToSelectedHashtag(tag) {
  if (!selected.value.includes(tag))
    setSelectedList([...selected.value, tag])

  if (excluded.value.includes(tag))
    removeExcludedHashtag(tag)
}

function handleAddToExcludedHashtag(tag) {
  if (!excluded.value.includes(tag))
    setExcludedList([...excluded.value, tag])

  if (selected.value.includes(tag))
    removeSelectedTag(tag)
}

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
  <div class="col-span-3 hidden lg:block">
    <div class="mb-4 rounded-xl bg-primary-light p-6 lg:mb-6">
      <p class="mb-4 text-[20px] font-bold text-primary-dark">
        會員享福利
      </p>
      <div class="mb-2 flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A] transition duration-300 ease-in-out hover:text-primary-dark">
        <icon-heroicons-user />
        <p class="ms-2 font-bold">
          註冊即送點數
        </p>
      </div>
      <div class="mb-2 flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A] transition duration-300 ease-in-out hover:text-primary-dark">
        <icon-heroicons-chat-bubble-left-ellipsis />
        <p class="ms-2 font-bold">
          自由聊天邀約
        </p>
      </div>
      <div class="mb-2 flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A] transition duration-300 ease-in-out hover:text-primary-dark">
        <icon-heroicons-lock-open />
        <p class="ms-2 font-bold">
          解鎖真實評價
        </p>
      </div>
      <!-- <div class="flex items-center rounded-xl bg-white p-4 text-zinc-600 shadow-[#F4766E1A] transition duration-300 ease-in-out hover:text-primary-dark">
        <icon-heroicons-sparkles-solid />
        <p class="ms-2 font-bold">
          成為精選會員
        </p>
      </div> -->
    </div>
    <!-- <div class="mb-4 rounded-xl border border-zinc-200 p-6 lg:mb-6">
      <div class="mb-10">
        <p class="text-B2 mb-4 text-start text-zinc-400">
          我是
        </p>
        <URadioGroup
          v-model="selectedUserGender"
          :options="userGenderOptions"
          :ui="{ fieldset: isDesktop ? '' : 'flex gap-4' }"
        >
          <template #label="{ option }">
            <p class="text-B2 mb-2 text-zinc-900">
              {{ option.label }}
            </p>
          </template>
        </URadioGroup>
      </div>
      <div class="">
        <p class="text-B2 mb-4 text-start text-zinc-400">
          尋找
        </p>
        <URadioGroup
          v-model="selectedLookingForGenderOptions"
          :options="lookingForGenderOptions"
          :ui="{ fieldset: isDesktop ? '' : 'flex gap-4' }"
        >
          <template #label="{ option }">
            <p class="text-B2 mb-2 text-zinc-900">
              {{ option.label }}
            </p>
          </template>
        </URadioGroup>
      </div>
    </div> -->
    <div class="mb-4 rounded-xl border border-zinc-200 p-4 lg:mb-6 lg:p-3">
      <div class="mb-6 flex items-center justify-center text-zinc-600">
        <icon-heroicons-fire-solid class="size-6" />
        <p class="ms-2 text-[20px] font-bold">
          熱門標籤
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="item in popularTag"
          :key="item"
        >
          <search-dateHashtag
            :item="item"
            :selected-by-selected-hashtag="selectedBySelectedHashtag(item)"
            :selected-by-excluded-hashtag="selectedByExcludedHashtag(item)"
            @push-selected-hashtag="handleAddToSelectedHashtag"
            @push-excluded-hashtag="handleAddToExcludedHashtag"
          />
        </div>
      </div>
    </div>
  </div>
</template>
