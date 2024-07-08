<script setup>
import { blackListApi } from '~/apis/repositories/blackList' // 黑名單
import { unlockCommentApi } from '~/apis/repositories/unlockComment' // 解鎖評價
import { commentApi } from '~/apis/repositories/comment' // 評價
import { beInviteApi } from '~/apis/repositories/beInvite' // 被邀約
import { reducePointApi } from '~/apis/repositories/reducePoint'

import { useBeInviteResultStore } from '~/store/beInviteResult'

const props = defineProps({
  status: String,
  createRenderResult: Set,
  userId: String,
  resultItem: Object,
  invitationTableId: String,
  commentTableId: String,
})

const beInviteResult = useBeInviteResultStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)
const isCheer = ref(false)

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
    case 'status5':
      return '確認取消邀約'
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

    beInviteResult.updateInviteResultList(props.userId, { isUnlock: true })
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

    await beInviteResult.updateInviteResultListCommentsCount(props.userId)
    await beInviteResult.deleteInviteResult(props.userId)
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

// 刪除黑名單
async function deleteBlackListById() {
  isLoading.value = true
  try {
    await blackListApi.deleteBlackListById(props.userId)
    toastMessage.value = '恢復往來成功'
    toastType.value = 'success'

    beInviteResult.updateInviteResultList(props.userId, { isLocked: false })
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

    beInviteResult.updateInviteResultList(props.userId, { isLocked: true })
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

// 被邀約-完成約會
async function finishInvitationDating() {
  isLoading.value = true
  isCheer.value = true
  try {
    await beInviteApi.finishInvitationDating(props.invitationTableId)
    toastMessage.value = '完成約會成功'
    toastType.value = 'success'

    beInviteResult.updateInviteResultList(props.userId, { status: 'finishDating' })
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

// 被邀約-接受邀約
async function acceptInvitation() {
  isLoading.value = true
  try {
    await beInviteApi.acceptInvitation(props.invitationTableId)
    toastMessage.value = '接受邀約成功'
    toastType.value = 'success'

    beInviteResult.updateInviteResultList(props.userId, { status: 'accept' })
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

// 被邀約-取消邀約
async function cancelInvitation() {
  isLoading.value = true
  try {
    await beInviteApi.cancelInvitation(tempInvitationTableId.value || props.invitationTableId)
    toastMessage.value = '取消邀約成功'
    toastType.value = 'success'

    beInviteResult.updateInviteResultList(props.userId, { status: 'cancel' })
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

// 被邀約-拒絕邀約
async function rejectInvitation() {
  isLoading.value = true
  try {
    await beInviteApi.rejectInvitation(props.invitationTableId)
    toastMessage.value = '拒絕邀約成功'
    toastType.value = 'success'

    beInviteResult.updateInviteResultList(props.userId, { status: 'reject' })
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
      <UCard
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
    </UModal>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>

<style scoped></style>
