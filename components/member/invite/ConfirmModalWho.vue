<script setup>
import { blackListApi } from '~/apis/repositories/blackList' // 黑名單
import { unlockCommentApi } from '~/apis/repositories/unlockComment' // 解鎖評價
import { commentApi } from '~/apis/repositories/comment' // 評價
import { inviteApi } from '~/apis/repositories/invite' // 邀約

const props = defineProps({
  status: String,
  createRenderResult: Set,
  cardUserName: String,
  userId: String,
  id: String,
  resultItem: Object,
})

// 通知渲染列表資料
// const emit = defineEmits(['refreshWhoList'])

const matchResult = useMatchResultStore()

const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)

const tempInvitationTableId = ref(props.resultItem._id)

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
    await unlockCommentApi.unlockComment(props.resultItem.invitedUserId)
    // emit('refreshWhoList')
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, isUnlock: true }
      return item
    })
    toastMessage.value = '解鎖評價成功'
    toastType.value = 'success'
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
    await commentApi.deleteComment(props.resultItem.invitedUserId)
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, hasComment: false }
      return item
    })

    toastMessage.value = '刪除評價成功'
    toastType.value = 'success'
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
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === tempInvitationTableId.value)
        return { ...item, isLocked: false }
      return item
    })

    toastMessage.value = '恢復往來成功'
    toastType.value = 'success'
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

// 新增黑名單
async function postBlackList() {
  isLoading.value = true
  try {
    await blackListApi.postBlackList({ lockedUserId: props.resultItem.invitedUserId })
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, isLocked: true }
      return item
    })
    toastMessage.value = '拒絕往來成功'
    toastType.value = 'success'
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
  invitedUserId: props.resultItem.invitedUserId,
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
// props.resultItem.forEach(item => addedValue.add(item))
// props.createRenderResult.forEach(item => addedValue.add(item))
// addedValue.add(`我的名字是：${props.cardUserName}`)
// const theme = Array.from(addedValue)

async function fetchAnswer() {
  isLoading.value = true
  inviteForm.message.content = ''

  try {
    inviteForm.message.content = await useGetGenerativeModelGP(
      JSON.stringify(theme),
    )
  }
  catch (error) {
    console.error({ error })

    toastMessage.value = 'AI 提示發生錯誤，請通知開發者'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
  }
}

// 邀約-新增邀約
async function postInvitation() {
  isLoading.value = true
  try {
    await inviteApi.postInvitation(inviteForm)
    // emit('refreshWhoList')
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, status: 'pending' }
      return item
    })

    toastMessage.value = '邀約成功'
    toastType.value = 'success'
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
// async function postInvitation() {
//   isLoading.value = true
//   try {
//     await inviteApi.postInvitation(inviteForm)
//     // emit('refreshWhoList')
//     toastMessage.value = '邀約成功'
//     toastType.value = 'success'

//     // matchResult.result = matchResult.result.map((item) => {
//     //   if (item.userInfo._id === props.userId)
//     //     return { ...item, invitationStatus: 'pending' }
//     //   return item
//     // })
//   }
//   catch (error) {
//     console.error({ error })

//     toastMessage.value = '邀約失敗，請通知開發者'
//     toastType.value = 'error'
//   }
//   finally {
//     isLoading.value = false
//     isOpenModal.value = false
//   }
// }

// 邀約-取消邀約
async function cancelInvitation() {
  isLoading.value = true
  try {
    const res = await inviteApi.cancelInvitation(tempInvitationTableId.value)
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, status: 'cancel' }

      return item
    })

    // matchResult.result = res.data.map((item) => {
    //   if (item.userId === tempInvitationTableId.value)
    //     console.log('取消邀約:', item)
    //   return { ...item, status: 'cancel' }
    // })

    // matchResult.result = matchResult.result.map((item) => {
    //   console.log('取消邀約:', item)
    //   if (item.userId === props.userId)
    //     return { ...item, status: 'cancel' }
    //   return item
    // })

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
// async function cancelInvitation() {
//   isLoading.value = true
//   try {
//     await inviteApi.cancelInvitation(props.id)
//     // emit('refreshWhoList')
//     toastMessage.value = '取消邀約成功'
//     toastType.value = 'success'

//     // matchResult.result = matchResult.result.map((item) => {
//     //   console.log('item', item)
//     //   if (item._id === props.id)
//     //     return { ...item, invitationStatus: 'cancel' }
//     //   return item
//     // })
//   }
//   catch (error) {
//     console.error({ error })

//     toastMessage.value = '取消邀約失敗，請通知開發者'
//     toastType.value = 'error'
//   }
//   finally {
//     isLoading.value = false
//     isOpenModal.value = false
//   }
// }
// async function cancelInvitation() {
//   isLoading.value = true
//   try {
//     const data = props.resultItem.id
//     const response = await inviteListApi.cancelInviteWho(data)
//     emit('refreshWhoList')
//     toastMessage.value = '取消邀約成功'
//     toastType.value = 'success'
//   }
//   catch (error) {
//     console.error({ error })
//     toastMessage.value = '取消邀約失敗，請通知開發者'
//     toastType.value = 'error'
//   }
//   finally {
//     isLoading.value = false
//     isOpenModal.value = false
//   }
// }

// 邀約-完成約會
async function finishInvitationDating() {
  isLoading.value = true
  try {
    await inviteApi.finishInvitationDating(tempInvitationTableId.value)
    matchResult.result = matchResult.result.map((item) => {
      if (item.userId === props.resultItem.invitedUserId)
        return { ...item, status: 'finishDating' }
      return item
    })

    toastMessage.value = '完成約會成功'
    toastType.value = 'success'
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
  }
}
</script>

<template>
  <div>
    <utilsFireWork :is-fire-work="isLoading" />

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
              v-show="isLoading"
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
              :disabled="isLoading"
              @click.prevent="fetchAnswer"
            >
              <p>AI 提示</p>
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
