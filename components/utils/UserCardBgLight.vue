<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

defineProps({
  resultItem: Object,
})

const isDataLoading = ref(true)

const buttonList = ref([
  { status: 'status1' },
  { status: 'status2' },
  { status: 'status3' },
  { status: 'status4' },
  { status: 'status5' },
  { status: 'status6' },
  { status: 'status7' },
  { status: 'status8' },
  { status: 'status9' },
  { status: 'status10' },
])

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

function renderValue(key, value) {
  if (Array.isArray(value) && value.length > 1)
    return value.map(v => matchListOptionData.value[0][key][v].label)

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
}

const result = new Set() // 要傳給邀約潭窗的資料
function createRenderValue(key, value) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (matchListOptionData.value[0][key][v].label !== '請選擇')
        result.add(matchListOptionData.value[0][key][v].label)
    })
  }
  else if (matchListOptionData.value[0][key][value].label !== '請選擇') {
    result.add(matchListOptionData.value[0][key][value].label)
  }
}
</script>

<template>
  <section
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <div class="flex items-center justify-between">
      <utilsInviteStatusBtn :status="resultItem.invitationStatus" />

      <div class="flex gap-3">
        <!-- vif 判斷顯示聊天或移除 -->
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsChatBtn />
        </div>
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsTrashBtn />
        </div>

        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <img
          src="~/assets/img/member/Image01.png"
          alt="s3-alpha-sig"
          class="mx-auto size-[150px] rounded-full object-cover"
        >
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc('張詠晴'),
            }"
          >
            {{ resultItem.personalInfo.username }}
          </h2>

          <div v-if="!isDataLoading">
            <span
              v-for="(value, key) in resultItem.matchListSelfSetting
                .personalInfo"
              :key="key"
              class="hidden"
            >
              {{ createRenderValue(key, value) }}
            </span>
            <span class="hidden">
              {{
                createRenderValue(
                  'industry',
                  resultItem.matchListSelfSetting.workInfo.industry,
                )
              }}
            </span>
            <span class="text-B2 text-neutral-600">{{
              Array.from(result).join('、')
            }}</span>
          </div>
        </div>
        <div
          v-if="!isDataLoading"
          class="space-y-3 border-l-2 border-x-neutral-300 pl-3"
        >
          <p class="text-B2 text-neutral-500">
            {{
              renderValue(
                'occupation',
                resultItem.matchListSelfSetting.workInfo.occupation,
              )
            }}
          </p>
          <p class="text-B2 text-neutral-300">
            {{
              renderValue(
                'expectedSalary',
                resultItem.matchListSelfSetting.workInfo.expectedSalary,
              )
            }}
          </p>
        </div>
        <div
          v-if="!isDataLoading"
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <div>
            <span
              v-for="(item, idx) in renderValue(
                'industry',
                resultItem.matchListSelfSetting.workInfo.industry,
              )"
              :key="idx"
            >
              <a
                :href="`https://www.google.com/search?q=${item}`"
                class="text-special-info"
                target="_blank"
              >
                {{ item }}{{ ' ' }}</a>
            </span>
          </div>
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span class="text-B3 text-neutral-400"> 評分 4.2 (13) </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-end">
      <utilsComplexBtn
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          invitationStatus: resultItem.invitationStatus,
          isLocked: resultItem.isLocked,
        }"
      />
    </div>
  </section>
</template>

<style scoped></style>
