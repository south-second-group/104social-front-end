<script setup>
import { unlockCommentApi } from '~/apis/repositories/unlockComment'
import { inviteListApi } from '~/apis/repositories/inviteList'

const props = defineProps({
  status: String,
  createRenderResult: Set,
  cardUserName: String,
  userId: String,
  id: String,
  resultItem: Object,
})

const matchResult = useMatchResultStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)

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
    await unlockCommentApi.unlockComment(props.userId)
    toastMessage.value = '解鎖評價成功'
    toastType.value = 'success'

    matchResult.result = matchResult.result.map((item) => {
      if (item.userInfo._id === props.userId)
        return { ...item, isUnlock: true }
      return item
    })
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

async function cancelInvitation() {
  isLoading.value = true
  try {
    const data = props.resultItem.id
    const response = await inviteListApi.cancelInviteWho(data)
    emit('refreshWhoList')
    toastMessage.value = '取消邀約成功'
    toastType.value = 'success'
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
</script>

<template>
  <div>
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

        <section class="mt-4 flex justify-center">
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
