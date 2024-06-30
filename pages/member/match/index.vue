<script setup>
import { z } from 'zod'

import { matchListApi } from '~/apis/repositories/matchList'

useHead({
  title: '配對設定',
})

const matchResult = useMatchResultStore()

const isDataLoading = ref(true)
const toastMessage = ref('')
const toastType = ref('')

const editMode = ref(false)
function toggleEditMode() {
  editMode.value = !editMode.value
}

// 配對設定標頭
function getKeyLabel(key) {
  const labels = {
    age: '年齡',
    gender: '尋找性別',
    height: '身高',
    weight: '體重',
    isMarried: '婚姻狀況',
    location: '居住地',
    education: '學歷',
    liveWithParents: '與父母同住',
    religion: '宗教信仰',
    smoking: '抽菸習慣',
    socialCircle: '社交圈',
    activities: '興趣嗜好',
    occupation: '職業',
    industry: '產業',
    expectedSalary: '期望薪資',
    banSmoking: '抽菸習慣',
    banOccupation: '職業',
    banIndustry: '產業',
    banExpectedSalary: '薪資',
  }
  return labels[key] || key
}

// 切換編輯
const [isEditEmail, toggleEditEmail] = useToggle()

const schema = z.object({
  email: z.string().email('請輸入正確的信箱格式'),
})

// 配對設定資料
// 多選若超過一 就無請選擇 （待處理）
// const processedActivities = computed(() => {
//   if (personalInfo.activities.length > 1)
//     return personalInfo.activities.filter(activity => activity !== 0)

//   return personalInfo.activities
// })

const matchListData = ref([])
const tempMatchListData = ref([])

async function getMatchList() {
  try {
    const res = await matchListApi.matchList()
    const { data } = res

    matchListData.value = data
    tempMatchListData.value = JSON.parse(JSON.stringify(data))
  }
  catch (error) {
    console.error(error)
  }
}

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

function renderValue(key, value) {
  if (Array.isArray(value)) {
    return value
      .map(v => matchListOptionData.value[0][key][v].label)
      .join('、')
  }
  return matchListOptionData.value[0][key][value].label
}

function cancelEdit() {
  matchListData.value = tempMatchListData.value
  toggleEditMode()
}

async function saveMatchList() {
  try {
    // 若選兩個就清除請選擇 （暫時，之後直接改選項 為禁用請選擇 0輸入保留）
    if (matchListData.value.personalInfo.activities.length > 1) {
      matchListData.value.personalInfo.activities = matchListData.value.personalInfo.activities.filter(
        i => i !== 0,
      )
    }
    if (matchListData.value.workInfo.industry.length > 1)
      matchListData.value.workInfo.industry = matchListData.value.workInfo.industry.filter(i => i !== 0)

    if (matchListData.value.blacklist.banIndustry.length > 1) {
      matchListData.value.blacklist.banIndustry = matchListData.value.blacklist.banIndustry.filter(
        i => i !== 0,
      )
    }

    const res = await matchListApi.updateMatchList(matchListData.value)
    const { message } = res

    toastMessage.value = `${message}`
    toastType.value = 'success'
  }
  catch (error) {
    console.error(error)

    toastMessage.value = `${error}`
    toastType.value = 'error'
  }
  finally {
    editMode.value = false
    isEditEmail.value = false
    tempMatchListData.value = JSON.parse(JSON.stringify(matchListData.value))

    await getMatchList()
    getMatchResult()
  }
}

async function getMatchResult() {
  try {
    const res = await matchListApi.getMatchResult()
    const { data } = res

    matchResult.result = data
    matchResult.resultTotal = data?.pagination?.totalCount || 0
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  watch(
    () => matchListData.value?.noticeInfo?.notice,
    (newVal, oldVal) => {
      if (newVal !== oldVal && newVal !== undefined && oldVal !== undefined)
        saveMatchList()
    },
  )
})

Promise.all([getMatchListOption(), getMatchList(), getMatchResult()]).then(
  () => {
    isDataLoading.value = false
  },
)

const temp = ref([])
matchListApi.getMatchListSelf().then((res) => {
  temp.value = res.data
})
</script>

<template>
  <div class="container text-start">
    <div class="mx-auto">
      <!-- matchListData <br>
      {{ matchListData }}

      <hr>
      MatchListSelf<br>
      {{ temp }} -->

      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[20px]">
        配對設定
      </h1>

      <div
        v-if="!isDataLoading"
        class="mb-6 flex items-center border-l-2 border-x-neutral-300 pl-3"
      >
        <span class="text-B2 mr-2 text-neutral-500"> 配對通知信箱 : </span>
        <div
          v-if="Boolean(!isEditEmail)"
          class="flex items-center justify-start"
        >
          <span class="mr-2 text-neutral-500">{{
            matchListData.noticeInfo.email || '無設定信箱'
          }}</span>
          <button
            class="text-primary-dark"
            :disabled="matchListData.noticeInfo.email === ''"
            @click="toggleEditEmail()"
          >
            <icon-heroicons:pencil-square />
          </button>
        </div>

        <UForm
          v-else
          :schema="schema"
          :state="matchListData.noticeInfo"
          class="relative w-[303px]"
          @submit="saveMatchList"
        >
          <UFormGroup name="email">
            <UInput
              v-model="matchListData.noticeInfo.email"
              color="white"
              placeholder="輸入信箱"
              size="lg"
              class="search-sm inline-block"
            />
          </UFormGroup>
          <button
            class="absolute -right-6 top-2 ms-3 text-primary-dark"
            type="submit"
          >
            <icon-heroicons:check />
          </button>
        </UForm>
      </div>

      <div class="grid grid-cols-12 gap-5">
        <!-- 適合我的對象 -->
        <div class="col-span-12 md:col-span-3">
          <div
            style="
              background-color: #fff5f5;
              border-radius: 10px;
              padding: 24px;
            "
          >
            <h2 class="text-B1 mb-2 text-center text-primary-dark">
              <b>適合我的對象</b>
            </h2>
            <NuxtLink to="/member/match/MatchResult">
              <div class="mb-2 flex justify-between">
                <div>配對結果</div>
                <div>{{ matchResult.resultTotal }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- 配對條件 -->
        <div class="col-span-12 md:col-span-9">
          <div
            v-if="!isDataLoading"
            class="flex justify-between"
          >
            <h2 class="text-H4 md:text-H3 mb-4 text-start text-primary-dark">
              配對條件
            </h2>
            <div>
              <UToggle
                v-model="matchListData.noticeInfo.notice"
                :disabled="toastMessage !== ''"
              />
              <b class="ml-2">配對通知</b>
            </div>
          </div>

          <div class="mb-4 rounded-lg bg-neutral-100 p-6">
            <h3 class="text-B1 mb-3">
              <b>個人條件</b>
            </h3>
            <div
              v-if="!isDataLoading"
              class="hidden grid-cols-1 gap-3"
              :class="!isDataLoading ? '!grid' : ''"
            >
              <div
                v-for="(value, key) in matchListData.personalInfo"
                :key="key"
                class="mb-2 flex h-[35px] items-center"
              >
                <div class="mr-4 w-24 align-middle">
                  {{ getKeyLabel(key) }}
                </div>

                <div>
                  <div v-if="editMode">
                    <USelectMenu
                      v-model="matchListData.personalInfo[key]"
                      :options="matchListOptionData[0][key]"
                      placeholder="請選擇性別"
                      class="w-[303px] rounded-md border border-neutral-300 bg-white text-neutral-500"
                      size="xl"
                      variant="none"
                      value-attribute="value"
                      option-attribute="label"
                      :multiple="Array.isArray(value)"
                    />
                  </div>
                  <div v-else>
                    <span class="flex-1">{{ renderValue(key, value) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="space-y-6"
            >
              <USkeleton
                v-for="item in 10"
                :key="item.id"
                class="h-8 w-[403px] bg-neutral-300"
              />
            </div>
          </div>

          <div class="mb-4 rounded-lg bg-neutral-100 p-6">
            <h3 class="text-B1 mb-3">
              <b>工作條件</b>
            </h3>
            <div
              v-if="!isDataLoading"
              class="hidden grid-cols-1 gap-3"
              :class="!isDataLoading ? '!grid' : ''"
            >
              <div
                v-for="(value, key) in matchListData.workInfo"
                :key="key"
                class="mb-2 flex h-[35px] items-center"
              >
                <div class="mr-4 w-24 align-middle">
                  {{ getKeyLabel(key) }}
                </div>

                <div>
                  <div v-if="editMode">
                    <USelectMenu
                      v-model="matchListData.workInfo[key]"
                      :options="matchListOptionData[0][key]"
                      class="w-[303px] rounded-md border border-neutral-300 bg-white text-neutral-500"
                      size="xl"
                      variant="none"
                      value-attribute="value"
                      option-attribute="label"
                      :multiple="Array.isArray(value)"
                    />
                  </div>
                  <div v-else>
                    <span class="flex-1">{{ renderValue(key, value) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="space-y-6"
            >
              <USkeleton
                v-for="item in 10"
                :key="item.id"
                class="h-8 w-[403px] bg-neutral-300"
              />
            </div>
          </div>

          <div class="mb-4 rounded-lg bg-neutral-100 p-6">
            <h3 class="text-B1 mb-3">
              <b>排除條件</b>
            </h3>
            <div
              v-if="!isDataLoading"
              class="hidden grid-cols-1 gap-3"
              :class="!isDataLoading ? '!grid' : ''"
            >
              <div
                v-for="(value, key) in matchListData.blacklist"
                :key="key"
                class="mb-2 flex h-[35px] items-center"
              >
                <div class="mr-4 w-24 align-middle">
                  {{ getKeyLabel(key) }}
                </div>

                <div>
                  <div v-if="editMode">
                    <USelectMenu
                      v-model="matchListData.blacklist[key]"
                      :options="matchListOptionData[0][key]"
                      class="w-[303px] rounded-md border border-neutral-300 bg-white text-neutral-500"
                      size="xl"
                      variant="none"
                      value-attribute="value"
                      option-attribute="label"
                      :multiple="Array.isArray(value)"
                    />
                  </div>
                  <div v-else>
                    <span class="flex-1">{{ renderValue(key, value) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else
              class="space-y-6"
            >
              <USkeleton
                v-for="item in 10"
                :key="item.id"
                class="h-8 w-[403px] bg-neutral-300"
              />
            </div>
          </div>

          <!-- 編輯按鈕 -->
          <div class="mt-4 flex w-full justify-end">
            <template v-if="editMode">
              <button
                type="button"
                class="btn-withIcon-outline mr-2 w-[303px]"
                @click="cancelEdit"
              >
                <p>取消</p>
              </button>
              <button
                type="button"
                class="btn-linear-md"
                @click="saveMatchList"
              >
                <p>儲存</p>
              </button>
            </template>
            <template v-else>
              <button
                type="submit"
                class="btn-linear-md"
                @click="toggleEditMode"
              >
                <p>編輯</p>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>
