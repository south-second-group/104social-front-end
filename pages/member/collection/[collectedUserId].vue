<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { collectionApi } from '~/apis/repositories/collections'
import { matchListApi } from '~/apis/repositories/matchList'

const route = useRoute()
const router = useRouter()
const toastMessage = ref('')
const toastType = ref('')

// Loading 狀態
const isLoaded = ref(false)

// 取得路由id
const inviteId = route.params.collectedUserId

// 收藏詳細資料
const collectionDetails = ref({})

async function getCollectionDetail() {
  isLoaded.value = true
  try {
    const response = await collectionApi.getCollectionsDetail(inviteId)
    collectionDetails.value = response.data || {}
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoaded.value = false
  }
}

// 取得評價分數
function getRating() {
  return collectionDetails.value.collectedUsers.userStatus.rating || 0
}

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
    expectedSalary: '薪資',
  }
  return labels[key] || key
}

function renderValue(key, value) {
  if (Array.isArray(value) && value.length >= 1) {
    return value
      .map(v => matchListOptionData.value[0][key][v].label !== '請選擇'
        ? matchListOptionData.value[0][key][v].label
        : '對方保留')
      .join('、')
  }

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
  else return '對方保留'
}

const promises = [getMatchListOption()]
Promise.all(promises).then(() => {
  isLoaded.value = true
})

watchEffect(() => {
  getCollectionDetail()
})
</script>

<template>
  <div class="container p-3 text-start md:p-12">
    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />

    <div class="mx-auto max-w-[700px]">
      <!-- 圖片 -->
      <USkeleton
        v-if="isLoaded === true"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <img
        v-else
        :src="collectionDetails.collectedUsers.photoDetails.photo"
        class="mx-auto size-[150px] rounded-full object-cover object-top"
      >

      <h1 class="text-H4 mt-24">
        個人資訊
      </h1>

      <div
        v-if="!isLoaded"
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <!-- 姓名 -->
            <label class="w-24 align-middle">姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  collectionDetails.collectedUsers.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                collectionDetails.collectedUsers.nickNameDetails.nickName
              }}
            </span>
          </div>

          <!-- 一般資訊 -->
          <div
            v-for="(value, key) in collectionDetails.matchListSelfSettingByUser.personalInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span>{{ renderValue(key, value) }}</span>
          </div>

          <!-- 工作 -->
          <div
            v-for="(value, key) in collectionDetails.matchListSelfSettingByUser.workInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span>{{ renderValue(key, value) }}</span>
          </div>

          <!-- 標籤 -->
          <div class="col-span-2">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  collectionDetails.collectedUsers.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                collectionDetails.collectedUsers.nickNameDetails.nickName
              }} 的標籤：
            </label>
            <div class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md">
              <UBadge
                v-for="tag in collectionDetails.collectedUsers.tags || []"
                :key="tag"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg !px-1 !py-[2px]"
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(tag),
                  }"
                >
                  {{ tag }}
                </p>
              </UBadge>
            </div>
          </div>
        </div>

        <!-- 自我介紹 -->
        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          >自我介紹</label>
          <p class="rounded-md border-2 p-3">
            {{
              collectionDetails.collectedUsers.introDetails.intro || 不透露
            }}
          </p>
        </div>

        <!-- 整體評價 -->
        <div class="mt-12 w-full space-y-3">
          <label class="text-H4">整體評價</label>
          <div class="flex">
            <icon-heroicons:heart-solid
              v-for="heart in 5"
              :key="heart"
              class="size-10"
              :class="{
                'text-primary-dark': heart <= getRating(),
                'text-gray-300': heart > getRating(),
              }"
            />
          </div>
        </div>

        <!-- 返回上一頁 -->
        <section class="mt-12 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="router.go(-1)"
          >
            <p>返回我的收藏</p>
          </button>
        </section>
      </div>

      <!-- Loading -->
      <div
        v-else
        class="mt-6 space-y-3"
      >
        <USkeleton
          v-for="item in 4"
          :key="item"
          class="h-8 w-full bg-neutral-300"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>