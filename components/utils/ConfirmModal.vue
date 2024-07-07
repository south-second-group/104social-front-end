<script setup>
import { blackListApi } from '~/apis/repositories/blackList'
import { unlockCommentApi } from '~/apis/repositories/unlockComment'
import { commentApi } from '~/apis/repositories/comment'
import { inviteApi } from '~/apis/repositories/invite'
import { beInviteApi } from '~/apis/repositories/beInvite'
import { reducePointApi } from '~/apis/repositories/reducePoint'

const props = defineProps({
  status: String,
  createRenderResult: Set,
  cardUserName: String,
  userId: String,
  invitationTableId: String,
  beInvitationTableId: String,
  commentTableId: String,
})

const route = useRoute()

const matchResult = useMatchResultStore()
const {
  updateSearchResultsList,
  updateSearchResultsListCommentsCount,
} = useSearchCriteriaStore()
const commentList = useCommentStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)
const isCheer = ref(false)
const isFetch = ref(false)

// 彈窗邏輯
const isOpenModal = defineModel()
const modalText = computed(() => {
  switch (props.status) {
    case 'status1':
      return '確認已解鎖評價'
    case 'status2':
      return '確認使用點數 5 點，解鎖評價'
    case 'status3':
      return '確認完成約會'
    case 'status4':
      return '傳送邀約訊息，並確認邀約？'
    case 'status5':
      return '確認收回邀約'
    case 'status6':
      return '確認拒絕往來'
    case 'status7':
      return '確認恢復往來'
    case 'status8':
      return '確認未給評價'
    case 'status9':
      return '確認已給評價'
    case 'status10':
      return '確認刪除評價'
    case 'status11':
      return '確認接受邀約'
    case 'status12':
      return '確認拒絕邀約'
    default:
      return ''
  }
})

const modalClick = computed(() => {
  switch (props.status) {
    case 'status1':
      return tempfunc
    case 'status2':
      return unlockComment
    case 'status3':
      return finishInvitationDating
    case 'status4':
      return tempfunc
    case 'status5':
      return cancelInvitation
    case 'status6':
      return postBlackList
    case 'status7':
      return deleteBlackListById
    case 'status8':
      return tempfunc
    case 'status9':
      return tempfunc
    case 'status10':
      return deleteComment
    case 'status11':
      return acceptInvitation
    case 'status12':
      return rejectInvitation
    default:
      return ''
  }
})

function tempfunc() {
  console.warn('tempfunc')
  isOpenModal.value = false
}

// 解鎖評價
async function unlockComment() {
  isLoading.value = true
  try {
    await reducePointApi.reducePoint(5)

    await unlockCommentApi.unlockComment(props.userId)
    toastMessage.value = '解鎖評價成功'
    toastType.value = 'success'

    if (route.path.includes('search-date'))
      updateSearchResultsList(props.userId, { isUnlock: true })
    else if (route.path.includes('MatchResult'))
      matchResult.updateMatchResultList(props.userId, { isUnlock: true })
    else if (route.path.includes('comment'))
      commentList.updateCommentList(props.userId, { isUnlock: true })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = error.response._data.message === '點數不足' ? error.response._data.message : '解鎖評價失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

// 刪除評價
async function deleteComment() {
  isLoading.value = true
  try {
    await commentApi.deleteComment(props.commentTableId, {
      commentedUserId: props.userId,
    })

    toastMessage.value = '刪除評價成功'
    toastType.value = 'success'

    if (route.path.includes('search-date'))
      updateSearchResultsListCommentsCount(props.userId)
    else if (route.path.includes('MatchResult'))
      matchResult.updateMatchResultListCommentsCount(props.userId)
    else if (route.path.includes('comment'))
      commentList.updateCommentListCommentsCount(props.userId)
    commentList.deleteCommentList(props.userId)
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '刪除評價失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

// 恢復往來
async function deleteBlackListById() {
  isLoading.value = true
  try {
    await blackListApi.deleteBlackListById(props.userId)

    toastMessage.value = '恢復往來成功'
    toastType.value = 'success'

    if (route.path.includes('search-date'))
      updateSearchResultsList(props.userId, { isLocked: false })
    else if (route.path.includes('MatchResult'))
      matchResult.updateMatchResultList(props.userId, { isLocked: false })
    else if (route.path.includes('comment'))
      commentList.updateCommentList(props.userId, { isLocked: false })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '恢復往來失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

// 拒絕往來
async function postBlackList() {
  isLoading.value = true
  try {
    await blackListApi.postBlackList({ lockedUserId: props.userId })

    toastMessage.value = '拒絕往來成功'
    toastType.value = 'success'

    if (route.path.includes('search-date'))
      updateSearchResultsList(props.userId, { isLocked: true })
    else if (route.path.includes('MatchResult'))
      matchResult.updateMatchResultList(props.userId, { isLocked: true })
    else if (route.path.includes('comment'))
      commentList.updateCommentList(props.userId, { isLocked: true })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '拒絕往來失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

// 邀約訊息
// const selectedOption = ref('請選擇訊息範本');
// const options = ['訊息01', '訊息02', '訊息03'];
// const selectedToggle = ref(false);

const inviteForm = reactive({
  invitedUserId: props.userId,
  message: {
    title: '預設標題',
    content: '',
  },
})

const MAX_CHARACTERS = 1000
const remainingCharacters = computed(
  () => MAX_CHARACTERS - inviteForm.message.content.length,
)

const addedValue = new Set()
props.createRenderResult.forEach(item => addedValue.add(item))
addedValue.add(`我的名字是：${props.cardUserName}`)
// const theme = Array.from(addedValue)

async function fetchAnswer() {
  isFetch.value = true
  inviteForm.message.content = ''

  try {
    await reducePointApi.reducePoint(50)

    // inviteForm.message.content = await useGetGenerativeModelGP(
    //   JSON.stringify(theme),
    // )

    await new Promise(resolve => setTimeout(resolve, 2000))
    inviteForm.message.content
    = `[對方名字]，您好！

    不知道您最近是否有空？我最近想找家餐廳好好吃一頓，剛好聽說 [餐廳名] 的 [菜色類型] 很不錯，想邀請您一起去品嚐。

    您是[對方職業]，肯定很懂[對方專業]。如果方便的話，您看這個週末有空嗎？可以先聊聊，順便一起吃飯？

    希望您能接受我的邀請，期待您的回覆！ 😊
    `

    isCheer.value = true
  }
  catch (error) {
    console.error(error.response._data.message)

    toastMessage.value = error.response._data.message === '點數不足' ? error.response._data.message : '解鎖評價失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isFetch.value = false

    await new Promise(resolve => setTimeout(resolve, 2000))
    isCheer.value = false
  }
}

// 再不能正常收回邀約，就用 emit 觸發父元件
async function postInvitation() {
  isLoading.value = true

  if (inviteForm.message.content.length === 0) {
    toastMessage.value = '請填寫邀約訊息'
    toastType.value = 'error'
    isLoading.value = false
    return
  }
  try {
    const res = await inviteApi.postInvitation(inviteForm)
    matchResult.tempInvitationTableId = res.data.id
    // console.log(matchResult.tempInvitationTableId);

    toastMessage.value = '邀約成功'
    toastType.value = 'success'

    if (route.path.includes('search-date')) {
      updateSearchResultsList(props.userId, { invitationStatus: 'pending' })
    }
    else if (route.path.includes('MatchResult')) {
      matchResult.updateMatchResultList(props.userId, {
        invitationStatus: 'pending',
      })
    }
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '邀約失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

async function cancelInvitation() {
  isLoading.value = true

  // console.log('tempInvitationTableId', matchResult.tempInvitationTableId);
  try {
    await inviteApi.cancelInvitation(matchResult.tempInvitationTableId || props.invitationTableId)

    toastMessage.value = '取消邀約成功'
    toastType.value = 'success'

    if (route.path.includes('search-date')) {
      updateSearchResultsList(props.userId, { invitationStatus: 'cancel' })
    }
    else if (route.path.includes('MatchResult')) {
      matchResult.updateMatchResultList(props.userId, {
        invitationStatus: 'cancel',
      })
    }
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '取消邀約失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

async function finishInvitationDating() {
  isLoading.value = true
  isCheer.value = true
  try {
    await inviteApi.finishInvitationDating(props.invitationTableId)

    toastMessage.value = '完成約會成功'
    toastType.value = 'success'

    if (route.path.includes('search-date')) {
      updateSearchResultsList(props.userId, { invitationStatus: 'finishDating' })
    }
    else if (route.path.includes('MatchResult')) {
      matchResult.updateMatchResultList(props.userId, {
        invitationStatus: 'finishDating',
      })
    }
    else if (route.path.includes('comment')) {
      commentList.updateCommentList(props.userId, {
        invitationStatus: 'finishDating',
      })
    }
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '完成約會失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isOpenModal.value = false

    await new Promise(resolve => setTimeout(resolve, 3000))
    isLoading.value = false
    isCheer.value = false
  }
}

// 自己的被邀約處理
async function acceptInvitation() {
  isLoading.value = true
  try {
    await beInviteApi.acceptInvitation(props.beInvitationTableId)

    toastMessage.value = '接受邀約成功'
    toastType.value = 'success'

    if (route.path.includes('search-date')) {
      updateSearchResultsList(props.userId, { beInvitationStatus: 'accept' })
    }
    else if (route.path.includes('MatchResult')) {
      matchResult.updateMatchResultList(props.userId, {
        beInvitationStatus: 'accept',
      })
    }
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '接受邀約失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}

async function rejectInvitation() {
  isLoading.value = true
  try {
    await beInviteApi.rejectInvitation(props.beInvitationTableId)

    toastMessage.value = '拒絕邀約成功'
    toastType.value = 'success'

    if (route.path.includes('search-date')) {
      updateSearchResultsList(props.userId, { beInvitationStatus: 'reject' })
    }
    else if (route.path.includes('MatchResult')) {
      matchResult.updateMatchResultList(props.userId, {
        beInvitationStatus: 'reject',
      })
    }
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '拒絕邀約失敗，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isOpenModal.value = false
  }
}
</script>

<template>
  <div>
    <utilsFireWork
      class="z-[99999]"
      :is-fire-work="isCheer"
    />

    <UModal
      v-model="isOpenModal"
      :overlay="true"
      :ui="{ width: 'max-w-[350px] md:max-w-[666px]' }"
    >
      <!-- {{ inviteForm }} -->
      <UCard
        v-if="props.status !== 'status4'"
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-center">
            <h3
              class="text-B1 text-base font-bold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalText }}
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <section class="-mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading"
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading"
            @click="modalClick"
          >
            <p>確定</p>
          </button>
        </section>
      </UCard>

      <!-- 邀約彈窗 -->
      <UCard
        v-else
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-center">
            <h3
              class="text-B1 text-base font-bold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalText }}
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <section class="space-y-3">
          <!-- <utilsDropdownComp
            v-model="selectedOption"
            :options="options"
            size="sm"
            :disabled="isLoading"
          /> -->
          <div class="relative">
            <UTextarea
              v-model="inviteForm.message.content"
              :ui="{ base: ' focus:!ring-primary-dark focus:!ring-1' }"
              :rows="10"
              :placeholder="
                isFetch
                  ? ''
                  : '請填寫邀約訊息，推薦主題：電影、音樂會、餐廳、運動、旅行等...'
              "
              :disabled="
                isFetch || inviteForm.message.content.length === 1000
              "
            />

            <div
              v-show="isFetch"
              class="absolute left-2 top-2 space-y-3"
            >
              <USkeleton
                class="h-4 w-[250px] bg-social-gradient-default md:w-[550px]"
              />
              <USkeleton
                class="h-4 w-[240px] bg-social-gradient-default md:w-[450px]"
              />
              <USkeleton
                class="h-4 w-[220px] bg-social-gradient-default md:w-[200px]"
              />
              <USkeleton
                class="h-4 w-[240px] bg-social-gradient-default md:w-[450px]"
              />
              <USkeleton
                class="h-4 w-[220px] bg-social-gradient-default md:w-[200px]"
              />
            </div>

            <button
              type="button"
              class="btn-linear-sm absolute bottom-2 right-2 !p-0 opacity-[70]"
              :disabled="isFetch"
              @click.prevent="fetchAnswer"
            >
              <UTooltip text="消耗 50 點/次">
                <p>AI 提示</p>
              </UTooltip>
            </button>
          </div>

          <p class="text-B4 text-end text-neutral-400">
            上限 {{ MAX_CHARACTERS }} 字（剩餘 {{ remainingCharacters }} 字）
          </p>
          <div class="flex justify-end">
            <!-- <UToggle
              v-model="selectedToggle"
              :ui="{ active: 'bg-primary-dark' }"
            />
            <span class="text-B4">儲存此次範本</span> -->
          </div>
        </section>

        <section class="mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading || isFetch"
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading || isFetch"
            @click="postInvitation"
          >
            <p>發送邀約</p>
          </button>
        </section>
      </UCard>
    </UModal>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>

<style scoped></style>
