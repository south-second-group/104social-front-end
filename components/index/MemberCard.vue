<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

const props = defineProps(['member'])
const { member } = props

const userDataStore = useUserDataStore()

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
  <div

    v-if="!isDataLoading"
    class="me-6 text-center md:me-0"
  >
    <div
      class="shadow-primary-light-800/10 border-real-transparent card-border mx-auto w-[300px] rounded-lg border-2 bg-white shadow transition duration-150 ease-in-out lg:flex lg:w-full"
    >
      <div class="shrink-0 overflow-hidden">
        <NuxtImg
          :src="member.profile.photoDetails.photo"
          alt="member_image"
          class="h-[200px] w-[300px] rounded-t-lg object-cover object-center lg:h-[265px] lg:w-[200px] lg:rounded-l-lg lg:rounded-tr-none"
          :class="{ 'blur-md': member.profile.photoDetails.isShow === false }"
        />
      </div>

      <div class="flex w-full flex-col justify-between  p-5">
        <div class="flex justify-between">
          <p
            class="line-clamp-1 w-[200px] text-start  text-xl font-bold leading-7 text-zinc-950 md:w-full md:text-2xl"
            :class="{
              'font-montserrat': !useIsChineseFunc(
                member.profile.nickNameDetails.nickName,
              ),
            }"
          >
            {{ member.profile.nickNameDetails.isShow ? member.profile.nickNameDetails.nickName : '對方保留' }}
          </p>
          <div>
            <span class="text-xl">

              <utilsCollectionBtn
                v-if="
                  userDataStore.userData
                    && userDataStore.userData.userId
                "
                :is-collected="member.isCollected"
                :user-id="member.matchListSelfSetting.userId"
                :collection-table-id="member.collectionTableId"
              />
              <UTooltip
                v-else
                text="登入後收藏"
              >
                <utilsCollectionBtn
                  class="pointer-events-none"
                />
              </UTooltip>
            </span>
          </div>
        </div>
        <div class=" space-y-3">
          <div class="flex gap-3 text-zinc-600">
            <div
              v-if="
                !isDataLoading
                  && member.matchListSelfSetting
                  && member.matchListSelfSetting.personalInfo
              "
            >
              <!-- 將個人條件全部加入顯示陣列 -->
              <span
                v-for="(value, key) in member.matchListSelfSetting
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
                    member.matchListSelfSetting.workInfo.industry,
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
            v-if="
              member.matchListSelfSetting
                && member.matchListSelfSetting.workInfo
            "
            class="mb-1 flex gap-3 text-zinc-600"
          >
            <p>
              {{
                member.matchListSelfSetting.workInfo.occupation === 0
                  ? '保留職業資訊'
                  : renderValue(
                    'occupation',
                    member.matchListSelfSetting.workInfo.occupation,
                  )
              }}
            </p>
          </div>

          <div class="my-3 flex items-center">
            <span class="text-xl text-amber-400">
              <icon-heroicons-star-solid />
            </span>
            <p
              v-if="member.profile.userStatus.commentCount"
              class="ms-2 pt-1 text-sm text-zinc-400"
            >
              評分 {{ member.profile.userStatus.commentScore }} ({{ member.profile.userStatus.commentCount }})
            </p>
            <p
              v-else
              class="text-B3 ms-2 pt-1 align-middle text-neutral-400"
            >
              無評分
            </p>
          </div>

          <ul class="flex flex-wrap gap-3 text-primary-dark">
            <li
              v-for="(desc, index) in member.profile.tags"
              :key="index"
            >
              #{{ desc }}
            </li>
            <li v-if="member.profile.tags.length === 0">
              #{{ member.profile.tags.length === 0 ? '無選擇興趣' : '' }}
            </li>
          </ul>
        </div>

        <!-- <div class="flex justify-center gap-3 lg:justify-end">
          <button class="btn-withIcon-outline">
            <icon-heroicons:lock-open />
            <p>解鎖評價</p>
          </button>
          <button class="btn-withIcon-fill w-[100px]">
            <icon-heroicons:heart />
            <p>邀約</p>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>
