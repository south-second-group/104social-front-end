<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

defineProps({
  resultItem: Object,
})

const isDataLoading = ref(true)

// 取得配對選項
const matchListOptionData = ref([])
async function getMatchListOption() {
  try {
    const res = await matchListApi.matchListOptions()
    const { data } = res
    matchListOptionData.value = data
  }
  catch (error) {
    console.error(error)
  }
}

Promise.all([getMatchListOption()]).then(() => {
  isDataLoading.value = false
})

// 渲染詳細資料邏輯
function renderValue(key, value) {
  if (Array.isArray(value) && value.length >= 1)
    return value.map(v => matchListOptionData.value[0][key][v].label)

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
}

const createRenderResult = new Set()
function createRenderValue(key, value) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (matchListOptionData.value[0][key][v].label !== '請選擇')
        createRenderResult.add(matchListOptionData.value[0][key][v].label)
    })
  }
  else if (matchListOptionData.value[0][key][value].label !== '請選擇') {
    createRenderResult.add(matchListOptionData.value[0][key][value].label)
  }
}
</script>

<template>
  <!-- {{ resultItem?.matchListSelfSetting.workInfo.occupation }} -->
  <div
    class="relative mb-3 me-6 max-w-[312px] rounded-[10px] bg-[#FAFAFA] p-4 lg:me-0 lg:max-w-full lg:p-6"
  >
    <div class="absolute end-[16px] lg:end-[24px]">
      <span class="text-xl">
        <utilsCollectionBtn
          :is-collected="resultItem?.isCollected"
          :user-id="resultItem?.matchListSelfSetting?.userId"
          :collection-table-id="resultItem?.collectionTableId"
        />
      </span>
    </div>
    <div class="flex w-full flex-col lg:flex-row">
      <div class="mb-4 shrink-0 self-center overflow-hidden rounded-full border-2 border-neutral-300 lg:mb-0 lg:me-6">
        <NuxtImg
          :src="resultItem.profile.photoDetails.photo"
          :alt="resultItem.profile.photoDetails.photo"
          class="size-[150px]   object-contain"
          :class="{ 'blur-md': resultItem.profile.photoDetails.isShow === false }"
        />
      </div>
      <div class="w-full text-start">
        <p class="text-H4 mb-1 text-zinc-900">
          {{ resultItem.profile.nickNameDetails.isShow ? resultItem.profile.nickNameDetails.nickName : '對方保留' }}
        </p>
        <p
          v-if="
            !isDataLoading && resultItem.matchListSelfSetting
              && resultItem.matchListSelfSetting.workInfo
              && resultItem.matchListSelfSetting.workInfo.occupation
          "
          class="text-B2 mb-3 text-zinc-400"
        >
          {{
            renderValue(
              'occupation',
              resultItem?.matchListSelfSetting.workInfo.occupation) === '請選擇'
              ? '保留職業資訊'
              : renderValue(
                'occupation',
                resultItem?.matchListSelfSetting.workInfo.occupation)
          }}
        </p>
        <p
          v-if="
            !isDataLoading
              && resultItem.matchListSelfSetting
              && resultItem.matchListSelfSetting.personalInfo
          "
          class="text-B2 mb-3 text-zinc-900"
        >
          <!-- 將個人條件全部加入顯示陣列 -->
          <span
            v-for="(value, key) in resultItem.matchListSelfSetting
              .personalInfo"
            :key="key"
            class="hidden"
          >
            {{ createRenderValue(key, value) }}
          </span>
          <!-- 將工作條件的產業 加入 顯示陣列 -->
          <span class="hidden">
            {{
              createRenderValue(
                'industry',
                resultItem.matchListSelfSetting.workInfo.industry,
              )
            }}
          </span>
          <!-- 顯示陣列 -->
          <span class="text-B2 text-neutral-600">{{
            Array.from(createRenderResult).join('、')
          }}</span>
        </p>

        <p
          v-if="
            !isDataLoading
              && resultItem.matchListSelfSetting
              && resultItem.matchListSelfSetting.personalInfo
          "
        >
          <span
            v-for="(item, idx) in renderValue(
              'activities',
              resultItem.matchListSelfSetting.personalInfo.activities,
            )"
            :key="idx"
          >
            <a
              :href="`https://www.google.com/search?q=${item}`"
              class="text-special-info"
              target="_blank"
              :class="{
                'pointer-events-none !text-neutral-300': item === '請選擇',
              }"
            >
              {{ item === '請選擇' ? '無興趣嗜好' : item }}{{ ' ' }}</a>
          </span>
        </p>
      </div>
    </div>

    <div class="flex flex-wrap justify-end">
      <!-- <utilsComplexBtn
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          invitationStatus: resultItem?.status,
          isLocked: resultItem?.isLocked,
          createRenderResult,
          cardUserName: resultItem?.userInfo?.personalInfo?.username,
        }"
      /> -->
    </div>
  </div>
</template>
