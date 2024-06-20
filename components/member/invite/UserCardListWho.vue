<script setup>
import { inviteListApi } from '~/apis/repositories/inviteList'
import { useNavigation } from '~/components/utils/navigation'

defineProps({
  resultItem: {
    type: Object,
    required: true,
  },
  isTrashIcon: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['refreshWhoList'])
const isOpenModal = ref(false)
const modalStatus = ref('')
const { goToDetail } = useNavigation()
// 使用事件來通知父組件刷新列表

function handleClick(status) {
  if (['rejected', 'cancel', 'finishDating', 'pending'].includes(status)) {
    isOpenModal.value = true
    modalStatus.value = status
  }
}

async function handleConfirm(inviteId) {
  const response = await inviteListApi.deleteInviteWho(inviteId)
  emit('refreshWhoList')
  isOpenModal.value = false
}

function handleClose() {
  isOpenModal.value = false
}

// 監聽 isOpenModal 變化
watch(isOpenModal, (newVal) => {
  if (!newVal)
    modalStatus.value = ''
})

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
])
</script>

<template>
  <section
    v-if="resultItem"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <div class="flex items-center justify-between">
      <MemberInviteStatusBtnWho :status="resultItem.status" />

      <div class="flex gap-3">
        <!-- 聊天 -->
        <div
          v-if="resultItem.status === 'accepted' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
        >
          <utilsChatBtn />
        </div>
        <!-- 刪除 -->
        <div
          v-if="resultItem.status === 'rejected' || resultItem.status === 'cancel' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
          @click="handleClick(resultItem.status)"
        >
          <utilsTrashBtn />
        </div>
        <!-- 收藏 -->
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn
            :is-collected="resultItem.isCollected"
            :user-id="resultItem.userId"
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <img
          :src="resultItem?.profileByInvitedUser?.[0]?.photoDetails?.photo || '~/public/chatRoom/No-Result-Found.png'"
          alt="s3-alpha-sig"
          class="mx-auto size-[150px] rounded-full object-cover object-top"
        >
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <h2
            class="text-H4 cursor-pointer text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(resultItem?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName),
            }"
            @click="() => goToDetail(resultItem._id, 'who')"
          >
            {{ resultItem?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName }}
          </h2>

          <div>
            <span>
              {{ resultItem?.profileByInvitedUser?.[0]?.tags?.join('、') }}
            </span>
          </div>
        </div>

        <!-- 職業 -->
        <div class="space-y-3 border-l-2 border-x-neutral-300 pl-3">
          <p class="text-B2 text-neutral-500">
            {{ resultItem?.profileByInvitedUser?.[0]?.jobDetails?.job }}
          </p>
          <p class="text-B2 text-neutral-400">
            {{ resultItem?.profileByInvitedUser?.[0]?.companyDetails?.company }}
          </p>
        </div>

        <div
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <div>
            <!-- 年收 -->
            <span>
              <a
                href=""
                class="text-special-info"
                target="_blank"
              >
                {{ resultItem?.profileByInvitedUser?.[0]?.incomeDetails?.income }}
              </a>
            </span>
          </div>
          <!-- 評分 -->
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span class="text-B3 text-neutral-400">
              評分 {{ resultItem?.profileByInvitedUser?.[0]?.userStatus?.commentScore }} ({{ resultItem?.profileByInvitedUser?.[0]?.userStatus?.commentCount }})
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 按鈕 -->
    <div class="flex flex-wrap justify-end">
      <MemberInviteComplexBtnWho
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          invitationStatus: resultItem.status,
          isLocked: resultItem.isLocked,
          createRenderResult,
          cardUserName: resultItem?.profileByInvitedUser?.[0]?.nickNameDetails?.nickName,
          userId: resultItem.userId,
          isUnlock: resultItem.isUnlock,
          resultItem,
        }"
      />
    </div>

    <!-- 刪除彈窗 -->
    <MemberInviteDeleteConfirmModalWho
      :show-modal="isOpenModal"
      :status="modalStatus"
      :result-item="resultItem"
      :on-confirm="handleConfirm"
      :on-close="handleClose"
    />
  </section>
</template>

<style scoped>
/* 樣式 */
</style>
