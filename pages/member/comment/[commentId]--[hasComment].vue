<script setup>
import { commentApi } from '~/apis/repositories/comment'
import { matchListApi } from '~/apis/repositories/matchList'

const route = useRoute()
const router = useRouter()
const matchResult = useMatchResultStore()

const apiData = ref({})
const rating = ref(5)
const tempRating = ref(0)
const isLoaded = ref(false)
const hasComment = ref(route.params.hasComment)
const renderData = ref([])

const toastMessage = ref('')
const toastType = ref('')

matchResult.result = matchResult.result.map((item) => {
  if (item.userInfo._id === route.params.commentId) {
    renderData.value = item
    return item
  }
  return item
})

async function getCommentByIdAndUserId() {
  isLoaded.value = false
  try {
    const res = await commentApi.getCommentByIdAndUserId(route.params.commentId)
    apiData.value = res.data

    if (hasComment.value === 'true')
      tempRating.value = apiData.value.score
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isLoaded.value = true
  }
}

const postCommentForm = reactive({
  commentedUserId: route.params.commentId,
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

async function postComment() {
  isLoaded.value = false
  try {
    await commentApi
      .postComment(postCommentForm)
      .then((res) => {
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
      .map(v => matchListOptionData.value[0][key][v].label)
      .join('、')
  }

  if (matchListOptionData.value[0][key][value].label !== '請選擇')
    return matchListOptionData.value[0][key][value].label
  else return '對方保留'
}
</script>

<template>
  <div class="container p-3 text-start md:px-12">
    <!-- {{ apiData }} -->

    {{ renderData }}

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />

    <div class="mx-auto max-w-[700px]">
      <USkeleton
        v-if="!isLoaded"
        class="mx-auto mt-4 h-[300px] w-[250px]"
      />
      <utilsPhotoCaroucel
        v-else
        :photo-details="renderData.profile.photoDetails"
      />

      <h1 class="text-H4 mt-24">
        被被評價人資訊
      </h1>
      <div
        v-if="isLoaded"
        class="mt-6"
      >
        <div class="mb-4 grid w-full grid-cols-2 gap-x-6 gap-y-3">
          <div class="flex h-[35px] items-center">
            <label class="mr-4 w-24 align-middle"> 姓名：</label>
            <span
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData.userInfo.personalInfo.username,
                ),
              }"
            >{{ renderData.userInfo.personalInfo.username }}</span>
          </div>

          <div
            v-for="(value, key) in renderData.matchListSelfSetting.personalInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span>{{ renderValue(key, value) }}</span>
          </div>

          <div
            v-for="(value, key) in renderData.matchListSelfSetting.workInfo"
            :key="key"
            class="mb-2 flex h-[35px] items-center"
          >
            <label class="mr-4 w-24 align-middle">
              {{ `${getKeyLabel(key)}：` }}
            </label>
            <span>{{ renderValue(key, value) }}</span>
          </div>

          <div class="col-span-2">
            <label
              :class="{
                'font-montserrat': !useIsChineseFunc(
                  renderData.userInfo.personalInfo.username,
                ),
              }"
            >{{ renderData.userInfo.personalInfo.username }} 的標籤：</label>
            <div
              class="mt-3 flex flex-wrap items-center justify-start gap-2 rounded-md"
            >
              <UBadge
                v-for="i in renderData.profile.tags"
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
            @click="router.push('/member/comment/')"
          >
            <p>回到我留下的評價</p>
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
  </div>
</template>

<style scoped></style>
