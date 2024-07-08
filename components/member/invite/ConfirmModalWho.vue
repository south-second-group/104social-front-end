<script setup>
import { blackListApi } from '~/apis/repositories/blackList' // 黑名單
import { unlockCommentApi } from '~/apis/repositories/unlockComment' // 解鎖評價
import { commentApi } from '~/apis/repositories/comment' // 評價
import { inviteApi } from '~/apis/repositories/invite' // 邀約
import { reducePointApi } from '~/apis/repositories/reducePoint'

import { useInviteResultStore } from '~/store/inviteResult'

const props = defineProps({
  status: String,
  createRenderResult: Set,
  userId: String,
  resultItem: Object,
  invitationTableId: String,
  commentTableId: String,
})

const inviteResult = useInviteResultStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)
const isCheer = ref(false)
const isFetch = ref(false)

const tempInvitationTableId = ref(props.invitationTableId)

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

    inviteResult.updateInviteResultList(props.userId, { isUnlock: true })
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = '解鎖評價失敗，請通知開發者'
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

    await inviteResult.updateInviteResultListCommentsCount(props.userId)
    await inviteResult.deleteInviteResult(props.userId)
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

    inviteResult.updateInviteResultList(props.userId, { isLocked: false })
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

    inviteResult.updateInviteResultList(props.userId, { isLocked: true })
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

// AI 提示
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

// const addedValue = new Set()
// props.createRenderResult.forEach(item => addedValue.add(item))
// addedValue.add(`我的名字是：${props.resultItem.profileByInvitedUser.nickNameDetails.nickName}`)

async function fetchAnswer() {
  isLoading.value = true
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
    console.error({ error })

    toastMessage.value = 'AI 提示發生錯誤，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false

    await new Promise(resolve => setTimeout(resolve, 2000))
    isCheer.value = false
  }
}

// 邀約-新增邀約
async function postInvitation() {
  isLoading.value = true
  if (inviteForm.message.content.length === 0) {
    toastMessage.value = '請填寫邀約訊息'
    toastType.value = 'error'
    isLoading.value = false
    return
  }
  try {
    await inviteApi.postInvitation(inviteForm)
    toastMessage.value = '邀約成功'
    toastType.value = 'success'

    inviteResult.updateInviteResultList(props.userId, { status: 'pending' })
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

// 邀約-取消邀約
async function cancelInvitation() {
  isLoading.value = true
  try {
    await inviteApi.cancelInvitation(tempInvitationTableId.value)
    toastMessage.value = '取消邀約成功'
    toastType.value = 'success'

    inviteResult.updateInviteResultList(props.userId, {
      status: 'cancel',
    })
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

// 邀約-完成約會
async function finishInvitationDating() {
  isLoading.value = true
  isCheer.value = true
  try {
    await inviteApi.finishInvitationDating(props.invitationTableId)
    toastMessage.value = '完成約會成功'
    toastType.value = 'success'

    inviteResult.updateInviteResultList(props.userId, { status: 'finishDating' })
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
          <div class="relative">
            <UTextarea
              v-model="inviteForm.message.content"
              :ui="{ base: ' focus:!ring-primary-dark focus:!ring-1' }"
              :rows="10"
              :placeholder="
                isLoading
                  ? ''
                  : '請填寫邀約訊息，推薦主題：電影、音樂會、餐廳、運動、旅行等...'
              "
              :disabled="
                isLoading || inviteForm.message.content.length === 1000
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
              class="btn-linear-sm absolute bottom-2 right-2 !p-0"
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
