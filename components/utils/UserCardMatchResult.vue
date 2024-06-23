<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

defineProps({
  resultItem: Object,
  isTrashIcon: Boolean,
})

const searchCriteriaStore = useSearchCriteriaStore()

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
  <section
    v-if="!isDataLoading && Object.keys(resultItem).length > 0"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <!-- 上 -->
    <div class="flex items-center justify-between">
      <utilsInviteStatusBtn :status="resultItem.invitationStatus" />
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
            v-if="
              resultItem.matchListSelfSetting
                && resultItem.matchListSelfSetting.userId
            "
            :is-collected="resultItem.isCollected"
            :user-id="resultItem.matchListSelfSetting.userId"
            :collection-table-id="resultItem.collectionTableId"
          />
        </div>
      </div>
    </div>

    <!-- 中 -->
    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div
        v-if="
          resultItem.matchListSelfSetting
            && resultItem.matchListSelfSetting.userId
        "
        class="shrink-0"
      >
        <!-- resultItem.isUnlock -->
        <NuxtLink
          :to="`/member/card/${resultItem.matchListSelfSetting.userId}`"
        >
          <div class="group relative">
            <img
              :src="resultItem.profile.photoDetails.photo"
              alt="s3-alpha-sig"
              class="mx-auto size-[150px] rounded-full border-2 border-neutral-300 object-contain object-center group-hover:blur-sm"
            >
            <span
              class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block"
            >查看資訊</span>
          </div>
        </NuxtLink>
      </div>
      <div class="shrink-1 w-full space-y-6 text-start">
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
          <div
            v-if="
              !isDataLoading
                && resultItem.matchListSelfSetting
                && resultItem.matchListSelfSetting.personalInfo
            "
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
          </div>
        </div>
        <div
          v-if="!isDataLoading"
          class="space-y-3 border-l-2 border-x-neutral-300 pl-3"
        >
          <p
            v-if="
              resultItem.matchListSelfSetting
                && resultItem.matchListSelfSetting.workInfo
            "
            class="text-B2 text-neutral-500"
          >
            {{
              renderValue(
                'occupation',
                resultItem.matchListSelfSetting.workInfo.occupation === '請選擇'
                  ? '保留職業資訊'
                  : resultItem.matchListSelfSetting.workInfo.occupation,
              )
            }}
          </p>
          <div
            v-if="
              resultItem.matchListSelfSetting
                && resultItem.matchListSelfSetting.workInfo
            "
            class="space-x-2"
          >
            <span class="text-B2 text-neutral-300">
              {{
                renderValue(
                  'expectedSalary',
                  resultItem.matchListSelfSetting.workInfo.expectedSalary,
                )
              }}
            </span>
            <span
              v-for="i in renderValue(
                'industry',
                resultItem.matchListSelfSetting.workInfo.industry,
              )"
              :key="i"
              class="text-B2 text-neutral-300"
            >
              {{ i === '請選擇' ? '對方保留產業資訊' : i }}{{ ' ' }}
            </span>
          </div>
        </div>
        <div
          v-if="
            !isDataLoading
              && resultItem.matchListSelfSetting
              && resultItem.matchListSelfSetting.personalInfo
          "
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <div>
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
                {{ item === '請選擇' ? '無選擇嗜好' : item }}{{ ' ' }}</a>
            </span>
          </div>
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span
              v-if="resultItem.profile.userStatus.commentCount"
              class="text-B3 text-neutral-400"
            >
              評分 {{ resultItem.profile.userStatus.commentScore }} ({{
                resultItem.profile.userStatus.commentCount
              }})
            </span>
            <span
              v-else
              class="text-B3 text-neutral-400"
            > 無評分 </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 下 -->
    <div
      v-if="resultItem.profile.userStatus "
      class="flex flex-wrap justify-end"
    >
      <ClientOnly>
        <utilsComplexBtn
          v-for="(btn, index) in buttonList"
          :key="index"
          v-bind="{
            status: btn.status,
            invitationStatus: resultItem.invitationStatus,
            isLocked: resultItem.isLocked,
            createRenderResult,
            cardUserName: resultItem.userInfo.personalInfo.username,
            userId: resultItem.matchListSelfSetting.userId,
            isUnlock: resultItem.isUnlock,
            beCommentCount: resultItem.profile.userStatus.commentCount,
            hasComment: resultItem.hasComment,
            beInvitationStatus: resultItem.beInvitationStatus,
            invitationTableId: resultItem.invitationTableId,
            beInvitationTableId: resultItem.beInvitationTableId,
            commentTableId: resultItem.commentTableId,
          }"
        />
      </ClientOnly>
    </div>
  </section>
</template>

<style scoped></style>
