<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

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
    gender: '性別',
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
    expectedSalary: '薪資',
  }
  return labels[key] || key
}

// 配對設定資料
const matchListSelfSettingData = ref([])
const tempMatchListData = ref([])

async function getMatchListSelfSetting() {
  try {
    const res = await matchListApi.getMatchListSelf()
    const { data } = res

    matchListSelfSettingData.value = data
    matchListSelfSettingData.value.searchDataBase = []

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
    const arrayLabel = value.map(
      v => matchListOptionData.value[0][key][v].label,
    )

    arrayLabel.forEach((item) => {
      if (!matchListSelfSettingData.value.searchDataBase.includes(item))
        matchListSelfSettingData.value.searchDataBase.push(item)
    })

    return arrayLabel.join('、')
  }

  const label = matchListOptionData.value[0][key][value].label
  if (
    label !== '請選擇'
    && !matchListSelfSettingData.value.searchDataBase.includes(label)
  )
    matchListSelfSettingData.value.searchDataBase.push(label)

  return label
}

function cancelEdit() {
  matchListSelfSettingData.value = tempMatchListData.value
  toggleEditMode()
}

async function saveMatchListSelfSetting() {
  try {
    const res = await matchListApi.updateMatchListSelf(
      matchListSelfSettingData.value,
    )
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

    tempMatchListData.value = JSON.parse(
      JSON.stringify(matchListSelfSettingData.value),
    )
    getMatchListSelfSetting()
    getMatchResult()
  }
}

async function getMatchResult() {
  try {
    const res = await matchListApi.getMatchResult()
    const { data } = res

    matchResult.result = data
  }
  catch (error) {
    console.error(error)
  }
}

Promise.all([getMatchListOption(), getMatchListSelfSetting()]).then(() => {
  isDataLoading.value = false
})

const accordionItems = [
  {
    defaultOpen: false,
    slot: 'personalInfo',
    title: '個人條件',
  },
  {
    defaultOpen: false,
    slot: 'workInfo',
    title: '工作條件',
  },
]
</script>

<template>
  <div>
    <!-- {{ matchListSelfSettingData }} -->
    <UAccordion
      :items="accordionItems"
      color="gray"
      :ui="{ wrapper: 'w-full flex md:flex-row gap-3 ' }"
    >
      <template #default="{ item, open }">
        <UButton
          class="mb-3 flex w-full items-center justify-between bg-[#F5F5F5] p-6 hover:bg-zinc-200"
        >
          <p
            class="mb:text-base line-clamp-1 text-sm font-bold text-neutral-600"
          >
            {{ item.title }}
          </p>
          <span
            class="ml-4"
            :class="item.type === 'nonAccordion' ? 'hidden' : ''"
          >
            <i
              class="text-zinc-950"
              :class="
                open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
              "
            ></i>
          </span>
        </UButton>
      </template>

      <template #personalInfo>
        <div class="mb-4 w-full rounded-lg bg-neutral-100 p-6">
          <div
            v-if="!isDataLoading"
            class="hidden grid-cols-1 gap-3"
            :class="!isDataLoading ? '!grid' : ''"
          >
            <div
              v-for="(value, key) in matchListSelfSettingData.personalInfo"
              :key="key"
              class="mb-2 flex h-[35px] items-center"
            >
              <div class="mr-4 w-24 align-middle text-neutral-600">
                {{ getKeyLabel(key) }}
              </div>
              <div>
                <div v-if="editMode">
                  <USelectMenu
                    v-model="matchListSelfSettingData.personalInfo[key]"
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
                  <span class="flex-1 text-neutral-500">{{
                    renderValue(key, value)
                  }}</span>
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
      </template>

      <template #workInfo>
        <div class="mb-4 rounded-lg bg-neutral-100 p-6">
          <div
            v-if="!isDataLoading"
            class="hidden grid-cols-1 gap-3"
            :class="!isDataLoading ? '!grid' : ''"
          >
            <div
              v-for="(value, key) in matchListSelfSettingData.workInfo"
              :key="key"
              class="mb-2 flex h-[35px] items-center"
            >
              <div class="mr-4 w-24 align-middle text-neutral-600">
                {{ getKeyLabel(key) }}
              </div>
              <div>
                <div v-if="editMode">
                  <USelectMenu
                    v-model="matchListSelfSettingData.workInfo[key]"
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
                  <span class="flex-1 text-neutral-600">{{
                    renderValue(key, value)
                  }}</span>
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
      </template>
    </UAccordion>

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
          @click="saveMatchListSelfSetting"
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

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>
