<script setup>
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

// 通知渲染列表資料
const emit = defineEmits(['refreshMeList'])

// 彈窗
const isOpenModal = ref(false)
const modalStatus = ref('')
const { goToDetail } = useNavigation()

function handleClick(status) {
  if (['rejected', 'cancel', 'finishDating', 'pending'].includes(status)) {
    isOpenModal.value = true
    modalStatus.value = status
  }
}

// 監聽 isOpenModal 變化
watch(isOpenModal, (newVal) => {
  if (!newVal)
    modalStatus.value = ''
})

function handleClose() {
  isOpenModal.value = false
}

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

// 懸停狀態
const isHovered = ref(false)
</script>

<template>
  <section
    v-if="resultItem"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 p-4 md:p-6"
  >
    <!-- 上 -->
    <div class="flex items-center justify-between">
      <MemberInviteStatusBtnMe :status="resultItem.status" />

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

    <!-- 中 -->
    <div
      class="flex cursor-pointer flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row"
      @click="() => goToDetail(resultItem._id, 'me')"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- 圖片 -->
      <div class="group relative">
        <img
          :src="resultItem?.profileByUser?.photoDetails?.photo || '~/public/chatRoom/No-Result-Found.png'"
          alt="s3-alpha-sig"
          class="mx-auto size-[150px] rounded-full border-2 border-neutral-300 object-contain object-center group-hover:blur-sm"
        >
        <span
          class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block "
        >查看資訊</span>
      </div>

      <div class="w-full space-y-3 text-start">
        <div class="space-y-1">
          <!-- 職稱 -->
          <p class="text-B2 text-neutral-400">
            {{ resultItem?.profileByUser?.jobDetails?.job }}
          </p>
          <!-- 姓名 -->
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(resultItem?.profileByUser?.nickNameDetails?.nickName),
              'text-primary-dark': isHovered,
            }"
          >
            {{ resultItem?.profileByUser?.nickNameDetails?.nickName }}
          </h2>
        </div>

        <!-- 自介 -->
        <p
          class="text-B2 line-clamp-2 text-neutral-600"
        >
          {{ resultItem?.message?.content }}
        </p>

        <!-- 評分 -->
        <div class="flex flex-col items-start gap-3 md:flex-row">
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span
              v-if="resultItem?.profileByInvitedUser?.userStatus?.commentCount"
              class="text-B3 text-neutral-400"
            >
              評分 {{ resultItem?.profileByUser?.userStatus?.commentScore }} ({{ resultItem?.profileByUser?.userStatus?.commentCount }})
            </span>
            <span
              v-else
              class="text-B3 text-neutral-400"
            > 無評分
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 下-按鈕 -->
    <div class="flex flex-wrap justify-end">
      <MemberInviteComplexBtnMe
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          invitationStatus: resultItem.status,
          isLocked: resultItem.isLocked,
          createRenderResult,
          cardUserName: resultItem?.profileByUser?.nickNameDetails?.nickName,
          userId: resultItem.userId,
          isUnlock: resultItem.isUnlock,
          resultItem,
        }"
      />
    </div>
    <!-- 刪除彈窗 -->
    <MemberInviteDeleteConfirmModalMe
      :show-modal="isOpenModal"
      :status="modalStatus"
      :result-item="resultItem"
      :on-confirm="handleConfirm"
      :on-close="handleClose"
      @refresh-me-list="$emit('refreshMeList')"
    />
  </section>
</template>

<style scoped>

</style>
