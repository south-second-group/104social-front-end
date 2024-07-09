<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blackListApi } from '~/apis/repositories/blackList'
import { matchListApi } from '~/apis/repositories/matchList'
import { commentApi } from '~/apis/repositories/comment'// 打霧

const route = useRoute()
const router = useRouter()
const toastMessage = ref('')
const toastType = ref('')

// 評價資料
const apiData = ref({})

// Loading 狀態
const isLoaded = ref(false)

// 取得路由id
const inviteId = route.params.banUserId

// 收藏詳細資料
const banDetails = ref({})

// 評價資訊
async function getCommentList() {
  isLoaded.value = true
  try {
    const res = await commentApi.getCommentList({
      id: banDetails.value._id,
      page: 1,
    })
    apiData.value = res.data
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoaded.value = false
  }
}

// 詳細資訊
async function getBanDetail() {
  isLoaded.value = true
  try {
    const response = await blackListApi.getBlackListDetail(inviteId)
    banDetails.value = response.data || {}
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoaded.value = false
  }
}

// 隨機中文字
function randomChineseText(content) {
  const baseText
    = '這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。這是一個示例文本，包含中文字符用於生成隨機長度的字符串。'

  const randomLength
    = Math.floor(Math.random() * content.length) < 100
      ? 100
      : Math.floor(Math.random() * content.length)
  let result = ''
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * content.length)
    result += baseText[randomIndex]
  }
  return result
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

watchEffect(async () => {
  await getBanDetail()
  if (banDetails.value?.userStatus?.commentCount !== 0)
    await getCommentList()
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
        :src="banDetails.photoDetails.photo"
        class="mx-auto size-[150px] rounded-full object-cover object-top"
        :class="{ 'blur-md': banDetails.photoDetails.isShow === false }"
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
            <label class="mr-4 w-24 align-middle">姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  banDetails.nickNameDetails.nickName,
                ),
                'italic text-neutral-400': banDetails.nickNameDetails.nickName === '',
              }"
            >
              {{
                banDetails.nickNameDetails.nickName || '對方保留'
              }}
            </span>
          </div>

          <!-- LINE ID -->
          <div class="flex h-[35px] items-center">
            <label class="mr-4 w-24 align-middle"> LINE ID：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  banDetails.lineDetails.lineId,
                ),
                'italic text-neutral-400': banDetails.lineDetails.lineId === '',
              }"
            >{{ banDetails.lineDetails.lineId || '對方保留' }}</span>
          </div>

          <!-- 一般資訊 -->
          <div
            v-for="(value, key) in banDetails.matchListSettings.personalInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span
              :class="{
                'italic text-neutral-400': renderValue(key, value) === '對方保留',
              }"
            >{{ renderValue(key, value) }}</span>
          </div>

          <!-- 工作 -->
          <div
            v-for="(value, key) in banDetails.matchListSettings.workInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span
              :class="{
                'italic text-neutral-400': renderValue(key, value) === '對方保留',
              }"
            >{{ renderValue(key, value) }}</span>
          </div>

          <!-- 自我介紹 -->
          <div class="col-span-2">
            <label>自我介紹：</label>
            <div
              class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md"
              :class="{
                'italic text-neutral-400':
                  banDetails.introDetails.intro === '',
              }"
            >
              {{
                banDetails.introDetails.intro || '對方保留'
              }}
            </div>
          </div>

          <!-- 標籤 -->
          <div class="col-span-2 mt-3">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  banDetails.nickNameDetails.nickName,
                ),
              }"
            >
              {{
                banDetails.nickNameDetails.nickName
              }} 的標籤：
            </label>
            <div class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md">
              <UBadge
                v-for="tag in banDetails.tags || []"
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
              {{ banDetails.tags.length === 0 ? '對方保留' : '' }}
            </div>
          </div>
        </div>

        <!-- 大家的評價 -->
        <!-- <div
          v-for="i in apiData.comments"
          :key="i.id"
          class="mt-12 w-full space-y-3"
        >
          <label
            class="text-H4"
            :class="{
              'font-montserrat': !useIsChineseFunc(
                i.commentUserProfile[0].nickNameDetails.nickName !== ''
                  ? i.commentUserProfile[0].nickNameDetails.nickName
                  : i.commentUserUsername[0].personalInfo.username,
              ),
            }"
          >
            {{
              i.commentUserProfile[0].nickNameDetails.nickName !== ''
                ? i.commentUserProfile[0].nickNameDetails.nickName
                : i.commentUserUsername[0].personalInfo.username
            }}
            留下的評價</label>
          <p
            v-if="renderData.isUnlock === true || renderData.isSubscribe === true"
            class="break-words rounded-md border-2 p-3"
          >
            {{ i.content }}
          </p>
          <p
            v-else
            class="break-words rounded-md border-2 p-3"
          >
            {{ i.content.substring(0, 20) }} ...解鎖查看更多
            <span class="block blur-sm">
              {{ randomChineseText(i.content) }}</span>
          </p>

          <div class="mt-12 w-full space-y-3">
            <div class="flex justify-end">
              <icon-heroicons:heart-solid
                v-for="heart in 5"
                :key="heart"
                class="size-10"
                :class="{
                  'text-primary-dark': heart <= i.score,
                  'text-gray-300': heart > i.score,
                }"
              />
            </div>
          </div>
        </div> -->

        <!-- 返回上一頁 -->
        <section class="mt-12 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="router.go(-1)"
          >
            <p>返回拒絕往來</p>
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

      <!-- 裝飾球_Large -->
      <div
        class="animate-scale-up-loop decoration-ball-1 absolute top-[145px] z-[-1] w-[184px] md:left-[-255px] md:w-[684px]"
      >
        <NuxtImg
          src="/banner/bg-ball-large-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>
      <div
        class="animate-scale-up-loop decoration-ball-1 absolute top-[545px] z-[-1] w-[184px] md:right-[-155px] md:w-[684px]"
      >
        <NuxtImg
          src="/banner/bg-ball-large-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>
      <!-- 裝飾球_Medium -->
      <div
        class="animate-scale-up-loop decoration-ball-2 absolute top-[-30px] z-[-1] w-[90px] md:left-[381px] md:w-[305px]"
      >
        <NuxtImg
          src="/banner/bg-ball-medium-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>
      <!-- 裝飾球_Medium -->
      <div
        class="animate-scale-up-loop decoration-ball-3 absolute top-[-55px] z-[-1] w-[90px] md:right-[-206px] md:w-[305px]"
      >
        <NuxtImg
          src="/banner/bg-ball-medium-lg.png"
          alt="Banner_ball"
          class="size-full"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes scaleUp {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scaleUpLoop {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
  50% {
    transform: scale(1.1);
    opacity: 0.4;
    filter: blur(5px);
  }
}

.animate-scale-up-loop {
  animation: scaleUp 1s ease-out forwards,
    scaleUpLoop 5s ease-in-out infinite 3s;
}

.animate-scale-up {
  animation: scaleUp 0.4s ease-in-out forwards;
}

.decoration-ball-1 {
  animation-delay: 0ms;
}

.decoration-ball-2 {
  animation-delay: 1300ms;
}

.decoration-ball-3 {
  animation-delay: 2100ms;
}
</style>
