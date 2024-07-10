<script setup>
// 多筆評論打霧 顯示回上一夜或按鈕群組 最下方你可能會感興趣的對象（就是配對結果）
import { commentApi } from '~/apis/repositories/comment'
import { matchListApi } from '~/apis/repositories/matchList'

const route = useRoute()
const router = useRouter()
const matchResult = useMatchResultStore()
const searchCriteriaStore = useSearchCriteriaStore()
const commentList = useCommentStore()
const userDataStore = useUserDataStore()

const apiData = ref({})
const isLoaded = ref(false)
const renderData = ref([])

const toastMessage = ref('')
const toastType = ref('')
const beforeRoute = ref(window.history.state.back)

if (beforeRoute.value.includes('MatchResult')) {
  matchResult.result.forEach((item) => {
    if (item.userInfo._id === route.params.cardId) {
      renderData.value = item
      return item
    }
    return item
  })
}
else if (beforeRoute.value.includes('search-date')) {
  searchCriteriaStore.searchResultsList.forEach((item) => {
    if (item.userInfo._id === route.params.cardId) {
      renderData.value = item
      return item
    }
    return item
  })
}
else if (beforeRoute.value.includes('comment')) {
  commentList.result.map((item) => {
    if (item.userInfo._id === route.params.cardId) {
      renderData.value = item
      return item
    }
    return item
  })
}

async function getCommentList() {
  isLoaded.value = false
  try {
    const res = await commentApi.getCommentList({
      id: route.params.cardId,
      page: 1,
    })
    apiData.value = res.data
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoaded.value = true
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
  if (Array.isArray(value)) {
    return value
      .map(v =>
        matchListOptionData.value[0][key][v].label !== '請選擇'
          ? matchListOptionData.value[0][key][v].label
          : '對方保留',
      )
      .join('、')
  }

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
  else return '對方保留'
}

// 按鈕元件資料
// const buttonList = ref([
//   { status: 'status1' },
//   { status: 'status2' },
//   { status: 'status3' },
//   { status: 'status4' },
//   { status: 'status5' },
//   { status: 'status6' },
//   { status: 'status7' },
//   { status: 'status8' },
//   { status: 'status9' },
//   { status: 'status10' },
//   { status: 'status11' },
//   { status: 'status12' },
// ])

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

const promises = [getMatchListOption()]
Promise.all(promises).then(() => {
  isLoaded.value = true
})

watchEffect(() => {
  if (renderData.value.profile.userStatus.commentCount)
    getCommentList()
})
</script>

<template>
  <div class="container relative p-3 text-start text-sm md:px-12 md:text-lg">
    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
    <!-- {{ renderData.profile.nickNameDetails.nickName }} -->

    <div class="mx-auto max-w-[700px]">
      <USkeleton
        v-if="!isLoaded"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <utilsPhotoCaroucel
        v-else
        :photo-details="renderData.profile.photoDetails"
        class="z-10"
        :class="{
          'pointer-events-none blur-md': renderData.profile.photoDetails.isShow === false,
        }"
      />

      <h1 class="text-H4 mt-24">
        個人資訊
      </h1>
      <div
        v-if="isLoaded"
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-x-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <label class="align-middle  md:mr-4 md:w-24"> 姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData.profile.nickNameDetails.nickName,
                ),
                'italic text-neutral-400': !renderData.profile.nickNameDetails.isShow,
              }"
            >{{
              renderData.profile.nickNameDetails.isShow ? renderData.profile.nickNameDetails.nickName : '對方保留'
            }}</span>
          </div>

          <div class="flex h-[35px] items-center">
            <label class="align-middle  md:mr-4 md:w-24"> LINE ID：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData.profile.lineDetails.lineId,
                ),
                'italic text-neutral-400': !renderData.profile.lineDetails.isShow,
              }"
            >{{ renderData.profile.lineDetails.isShow ? renderData.profile.lineDetails.lineId : '對方保留' }}</span>
          </div>

          <div
            v-for="(value, key) in renderData.matchListSelfSetting.personalInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="align-middle  md:mr-4 md:w-24">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span
              :class="{
                'italic text-neutral-400': renderValue(key, value) === '對方保留',
              }"
            >{{ renderValue(key, value) }}</span>
          </div>

          <div
            v-for="(value, key) in renderData.matchListSelfSetting.workInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="align-middle  md:mr-4 md:w-24">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span
              :class="{
                'italic text-neutral-400': renderValue(key, value) === '對方保留',
              }"
            >{{ renderValue(key, value) }}</span>
          </div>

          <div class="col-span-2 ">
            <label>自我介紹：</label>
            <div
              class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md "
              :class="{
                'italic text-neutral-400':
                  renderData.profile.introDetails.intro === '',
              }"
            >
              {{ renderData.profile.introDetails.intro || '對方保留' }}
            </div>
          </div>

          <div class="col-span-2 ">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData.profile.nickNameDetails.nickName,
                ),
              }"
            >{{ renderData.profile.nickNameDetails.nickName }} 的標籤：</label>
            <div
              class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md "
              :class="{
                'italic text-neutral-400':
                  renderData.profile.tags.length === 0,
              }"
            >
              <UBadge
                v-for="i in renderData.profile.tags"
                :key="i"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg !px-1 !py-[2px] "
              >
                <p
                  class="!text-[10px]"
                  :class="{
                    'font-montserrat': !useIsChineseFunc(i),
                  }"
                >
                  {{ i }}
                </p>
              </UBadge>
              {{ renderData.profile.tags.length === 0 ? '對方保留' : '' }}
            </div>
          </div>
        </div>

        <!-- 邀約資料需要 -->
        <div v-if="isLoaded">
          <!-- 將個人條件全部加入顯示陣列 -->
          <span
            v-for="(value, key) in renderData.matchListSelfSetting.personalInfo"
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
                renderData.matchListSelfSetting.workInfo.industry,
              )
            }}
          </span>
        </div>
        <!-- <div class="flex flex-wrap justify-center py-6">
          <utilsComplexBtn
            v-for="(btn, index) in buttonList"
            :key="index"
            v-bind="{
              status: btn.status,
              invitationStatus: renderData.invitationStatus,
              isLocked: renderData.isLocked,
              createRenderResult,
              cardUserName: renderData.userInfo.personalInfo.username,
              userId: renderData.matchListSelfSetting.userId,
              isUnlock: renderData.isUnlock,
              beCommentCount: renderData.profile.userStatus.commentCount,
              hasComment: renderData.hasComment,
              beInvitationStatus: renderData.beInvitationStatus,
              beInvitationTableId: renderData.beInvitationTableId,
              commentTableId: renderData.commentTableId,
            }"
          />
        </div> -->

        <!-- 大家的評價 -->
        <div
          v-for="i in apiData.comments"
          :key="i.id"
          class="mt-12 w-full space-y-3"
        >
          <label
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
            v-if="renderData.isUnlock === true || userDataStore.isSubscribe === true"
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
                class="md:size-10"
                :class="{
                  'text-primary-dark': heart <= i.score,
                  'text-gray-300': heart > i.score,
                }"
              />
            </div>
          </div>
        </div>

        <section class="mt-12 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="router.go(-1)"
          >
            <p>回到上一頁</p>
          </button>
        </section>
      </div>

      <div
        v-else
        class="mt-6 space-y-3"
      >
        <USkeleton
          v-for="item in 4"
          :key="item.id"
          class="h-8 w-full bg-neutral-300"
        />
      </div>
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
      class="animate-scale-up-loop decoration-ball-1 absolute right-[200px] top-[545px] z-[-1] w-[184px] md:right-[-155px] md:w-[684px]"
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
      class="animate-scale-up-loop decoration-ball-3 absolute right-[200px] top-[-55px] z-[-1] w-[90px] md:right-[-206px] md:w-[305px]"
    >
      <NuxtImg
        src="/banner/bg-ball-medium-lg.png"
        alt="Banner_ball"
        class="size-full"
      />
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
