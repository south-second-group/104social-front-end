<script setup>
// 多筆評論打霧 顯示回上一夜或按鈕群組 最下方你可能會感興趣的對象（就是配對結果）
import { commentApi } from '~/apis/repositories/comment'
import { matchListApi } from '~/apis/repositories/matchList'

const route = useRoute()
const router = useRouter()
const matchResult = useMatchResultStore()

const apiData = ref({})
const isLoaded = ref(false)
const hasUnComment = ref(route.params.hasUnComment)
const renderData = ref([])

const toastMessage = ref('')
const toastType = ref('')

function updateRenderData() {
  matchResult.result.forEach((item) => {
    if (item.userInfo._id === route.params.commentId)
      renderData.value = item
  })
}

watchEffect(() => {
  updateRenderData()
})

async function getCommentByUserId() {
  isLoaded.value = false
  try {
    const res = await commentApi.getCommentByUserId(route.params.commentId)
    apiData.value = res.data
  }
  catch (error) {
    console.error(error)
  }
  finally {
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

Promise.all([
  getMatchListOption(),
  getCommentByUserId(),
  updateRenderData(),
]).then(() => {
  isLoaded.value = true
})

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

// 按鈕元件資料
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
  <div class="container p-3 text-start md:px-12">
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
        個人資訊
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
        <div class="flex flex-wrap justify-center pb-6 pt-3">
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
            }"
          />
        </div>

        <!-- 大家的評價 -->
        <div
          v-for="i in apiData.comments"
          :key="i.id"
          class="mt-12 w-full space-y-3"
        >
          <label
            class="text-H4"
            :class="{
              'font-montserrat': !useIsChineseFunc(
                i.commentUserProfile[0].nickNameDetails.nickName,
              ),
            }"
          >
            {{ i.commentUserProfile[0].nickNameDetails.nickName }}
            留下的評價</label>
          <p
            v-if="hasUnComment === 'true'"
            class="rounded-md border-2 p-3"
          >
            {{ i.content }}
          </p>
          <p
            v-else
            class="rounded-md border-2 p-3 blur-sm"
          >
            {{ i.content }}
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
  </div>
</template>

<style scoped></style>
