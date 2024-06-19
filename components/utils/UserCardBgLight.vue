<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

defineProps({
  resultItem: Object,
  isTrashIcon: Boolean,
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
  { status: 'status11' },
  { status: 'status12' },
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

// 渲染詳細資料邏輯
function renderValue(key, value) {
  if (Array.isArray(value) && value.length > 1)
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
  <section
    v-if="resultItem"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <div class="flex items-center justify-between">
      <utilsInviteStatusBtn :status="resultItem.status" />

      <div class="flex gap-3">
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsChatBtn />
        </div>
        <div
          v-if="isTrashIcon"
          class="rounded-full bg-neutral-100 p-[10px]"
        >
          <utilsTrashBtn />
        </div>

        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn
            :is-collected="resultItem.isCollected"
            :user-id="resultItem.matchListSelfSetting.userId"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <img
          src="~/assets/img/member/Image03.png"
          alt="s3-alpha-sig"
          class="mx-auto size-[150px] rounded-full object-cover object-top"
        >
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(
                resultItem.userInfo.personalInfo.username,
              ),
            }"
          >
            {{ resultItem.userInfo.personalInfo.username }}
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
              Array.from(createRenderResult).join('、')
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
            <span class="text-B3 text-neutral-400">
              評分 {{ resultItem.profile.userStatus.commentScore }} ({{
                resultItem.profile.userStatus.commentCount
              }})
            </span>
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
          invitationStatus: resultItem.status,
          isLocked: resultItem.isLocked,
          createRenderResult,
          cardUserName: resultItem.userInfo.personalInfo.username,
        }"
      />
    </div>
  </section>
</template>

<style scoped></style>
