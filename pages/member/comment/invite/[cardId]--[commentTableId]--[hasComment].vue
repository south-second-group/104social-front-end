<script setup>
import { useStorage } from '@vueuse/core'

import { commentApi } from '~/apis/repositories/comment'
import { matchListApi } from '~/apis/repositories/matchList'
import { useInviteResultStore } from '~/store/inviteResult'

const route = useRoute()
const router = useRouter()
const inviteResult = useInviteResultStore() // 邀約

const apiData = ref({})
const rating = ref(5)
const tempRating = ref(0)
const isLoaded = ref(false)
const hasComment = ref(route.params.hasComment)
const renderData = ref([])

const toastMessage = ref('')
const toastType = ref('')

const beforeRoute = useStorage('beforeRoute', '')
if (!window.history && window.history.length === 0)
  window.history.go(-1)
else
  beforeRoute.value = window.history.state.back

// 判斷進入哪一個用戶的已給評價
if (beforeRoute.value.includes('/member/invite')) {
  inviteResult.result.map((item) => {
    if (item.invitedUserId === route.params.cardId) {
      renderData.value = item
      return item
    }
    return item
  })
}

// 取得特定會員評價
const tempCommentTableId = route.params.commentTableId
async function getCommentByIdAndUserId() {
  isLoaded.value = false
  try {
    // const res = await commentApi.getCommentByIdAndUserId('668e6ac6f2f0546c891f9d16')
    const res = await commentApi.getCommentByIdAndUserId(tempCommentTableId)
    // 668e6ac6f2f0546c891f9d16
    apiData.value = res.data

    if (hasComment.value === 'true')
      tempRating.value = apiData.value.score
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await new Promise(resolve => setTimeout(resolve, 1000))
    isLoaded.value = true
  }
}

const postCommentForm = reactive({
  commentedUserId: route.params.cardId,
  id: renderData.value.invitedUserId,
  content: '',
  score: 0,
})

watch(
  rating,
  (value) => {
    postCommentForm.score = value
  },
  { immediate: true },
)

// 新增評價
async function postComment() {
  isLoaded.value = false
  try {
    await commentApi
      .postComment(postCommentForm)
      .then((res) => {
        tempCommentTableId = res.data._id

        toastMessage.value = res.message
        toastType.value = 'success'
      })
      .catch((err) => {
        toastMessage.value = err.message
        toastType.value = 'error'
      })

    await getCommentByIdAndUserId()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    hasComment.value = 'true'

    await new Promise(resolve => setTimeout(resolve, 2000))
    isLoaded.value = true
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

if (hasComment.value === 'true') {
  Promise.all([getMatchListOption(), getCommentByIdAndUserId()]).then(() => {
    isLoaded.value = true
  })
}
else {
  Promise.all([getMatchListOption()]).then(() => {
    isLoaded.value = true
  })
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
      .map((v) => {
        const option = matchListOptionData.value[0] && matchListOptionData.value[0][key] && matchListOptionData.value[0][key][v]
        return option && option.label !== '請選擇' ? option.label : '對方保留'
      })
      .join('、')
  }

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
  else return '對方保留'
  // const option = matchListOptionData.value[0] && matchListOptionData.value[0][key] && matchListOptionData.value[0][key][value]
  // return option && option.label !== '請選擇' ? option.label : '對方保留'
}
</script>

<template>
  <div class="container relative p-3 text-start md:px-12">
    <!-- {{ apiData }} -->
    <!-- {{ renderData }} -->

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />

    <div class="mx-auto max-w-[700px]">
      <!-- 圖片 -->
      <USkeleton
        v-if="!isLoaded"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <img
        v-else
        :src="renderData?.profileByInvitedUser?.photoDetails?.photo"
        class="mx-auto size-[150px] rounded-full object-cover object-top"
        :class="{ 'blur-md': renderData?.profileByInvitedUser?.photoDetails?.isShow === false }"
      >

      <h1 class="text-H4 mt-24">
        被評價人資訊
      </h1>
      <div
        v-if="isLoaded "
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-x-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <!-- 姓名 -->
            <label class="mr-4 w-24 align-middle"> 姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData?.profileByInvitedUser?.nickNameDetails?.nickName,
                ),
                'italic text-neutral-400': renderData?.profileByInvitedUser?.nickNameDetails?.nickName === '',
              }"
            >{{ renderData?.profileByInvitedUser?.nickNameDetails?.nickName || '對方保留' }}</span>
          </div>

          <!-- LINE ID -->
          <div class="flex h-[35px] items-center">
            <label class="mr-4 w-24 align-middle"> LINE ID：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData?.profileByInvitedUser?.lineDetails?.lineId,
                ),
                'italic text-neutral-400': renderData?.profileByInvitedUser?.lineDetails?.lineId === '',
              }"
            >{{ renderData?.profileByInvitedUser?.lineDetails?.lineId || '對方保留' }}</span>
          </div>

          <!-- 一般資訊 -->
          <div
            v-for="(value, key) in renderData?.matchListSelfSettingByInvitedUser?.personalInfo"
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
            v-for="(value, key) in renderData?.matchListSelfSettingByInvitedUser?.workInfo"
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
                'italic text-neutral-400': renderData?.profileByInvitedUser?.introDetails?.intro === '',
              }"
            >
              {{ renderData?.profileByInvitedUser?.introDetails?.intro || '對方保留' }}
            </div>
          </div>

          <!-- 標籤 -->
          <div class="col-span-2 mt-3">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData?.profileByInvitedUser?.nickNameDetails?.nickName,
                ),
              }"
            >{{ renderData?.profileByInvitedUser?.nickNameDetails?.nickName }} 的標籤：</label>
            <div
              class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md"
              :class="{
                'italic text-neutral-400': renderData?.profileByInvitedUser?.tags.length === 0,
              }"
            >
              <UBadge
                v-for="i in renderData?.profileByInvitedUser?.tags"
                :key="i"
                class="btn-withIcon-outline-rwd pointer-events-none !rounded-lg !px-1 !py-[2px]"
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
              {{ renderData?.profileByInvitedUser?.tags?.length === 0 ? '對方保留' : '' }}
            </div>
          </div>
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          >見面心得</label>
          <p
            v-if="hasComment === 'true'"
            class="rounded-md border-2 p-3"
          >
            {{ apiData.content }}
          </p>
          <UTextarea
            v-else
            v-model="postCommentForm.content"
            :ui="{ base: ' focus:!ring-primary-dark' }"
            :rows="10"
            placeholder="請填寫心得"
          />
        </div>

        <div class="mt-12 w-full space-y-3">
          <label
            class="text-H4"
            for=""
          >整體評價</label>
          <div
            v-if="hasComment === 'true'"
            class="flex"
          >
            <icon-heroicons:heart-solid
              v-for="heart in 5"
              :key="heart"
              class="size-10"
              :class="{
                'text-primary-dark': heart <= apiData.score,
                'text-gray-300': heart > apiData.score,
              }"
            />
          </div>
          <div
            v-else
            class="flex"
          >
            <span
              v-for="heart in [1, 2, 3, 4, 5]"
              :key="heart"
              @click="rating = heart"
            >
              <icon-heroicons:heart-solid
                class="size-10 hover:cursor-pointer"
                :class="{
                  'text-primary-dark': heart <= tempRating,
                  'text-gray-300': heart > tempRating,
                }"
                @mouseenter="tempRating = heart"
                @mouseleave="tempRating = rating"
              />
            </span>
          </div>
        </div>

        <section class="mt-12 flex justify-center">
          <button
            v-if="hasComment === 'true'"
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            @click="router.go(-1)"
          >
            <p>回到上一頁</p>
          </button>
          <button
            v-else
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            @click="postComment"
          >
            <p>完成評價</p>
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
