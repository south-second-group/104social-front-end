<script setup>
import { useInviteResultStore } from '~/store/inviteResult'
import { inviteApi } from '~/apis/repositories/invite'

const props = defineProps({
  resultItem: Object,
  isTrashIcon: Boolean,
})

const inviteResultStore = useInviteResultStore()
const isOpenModal = ref(false)
const toastMessage = ref('')
const toastType = ref('')

function handleDeleteClick() {
  isOpenModal.value = true
}

function handleModalClose() {
  isOpenModal.value = false
}

async function handleDelete(resultItemId) {
  isOpenModal.value = false
  try {
    await inviteApi.deleteInvitation(resultItemId)
    toastMessage.value = '刪除邀約成功'
    toastType.value = 'success'

    inviteResultStore.deleteInviteResult(resultItemId)
  }
  catch (error) {
    console.error(error)

    toastMessage.value = '刪除邀約失敗，請通知開發者'
    toastType.value = 'error'
  }
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
</script>

<template>
  <section
    v-if="resultItem.userId"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <!-- 上 -->
    <div class="flex items-center justify-between">
      <MemberInviteStatusBtnWho :status="resultItem.status" />
      <div class="flex gap-3">
        <!-- 聊天 -->
        <div
          v-if="resultItem.status === 'accept' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
        >
          <utilsChatBtn />
        </div>
        <!-- 刪除 -->
        <div
          v-if="resultItem.status === 'reject' || resultItem.status === 'cancel' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
          @click="handleDeleteClick"
        >
          <utilsTrashBtn />
        </div>
        <!-- 收藏 -->
        <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn
            :is-collected="resultItem.isCollected"
            :user-id="resultItem.invitedUserId"
            :collection-table-id="resultItem._id"
          />
        </div>
      </div>
    </div>

    <!-- 中 -->
    <div
      class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row"
    >
      <div class="shrink-0">
        <!-- 圖片 -->
        <NuxtLink
          :to="`/member/invite/${resultItem._id}`"
        >
          <div class="group relative">
            <img
              :src="resultItem.profileByInvitedUser.photoDetails.photo"
              alt="s3-alpha-sig"
              class="mx-auto size-[150px] rounded-full border-2 border-neutral-300 object-contain object-center group-hover:blur-sm"
            >
            <span
              class="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block"
            >查看資訊</span>
          </div>
        </NuxtLink>
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <!-- 姓名 -->
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(resultItem?.profileByInvitedUser?.nickNameDetails?.nickName),
              'text-primary-dark': isHovered,
            }"
          >
            {{ resultItem?.profileByInvitedUser?.nickNameDetails?.nickName }}
          </h2>

          <!-- tag -->
          <div>
            <span>
              {{ resultItem?.profileByInvitedUser?.tags?.join('、') }}
            </span>
          </div>
        </div>

        <!-- 職業 -->
        <div class="space-y-3 border-l-2 border-x-neutral-300 pl-3">
          <p class="text-B2 text-neutral-500">
            {{ resultItem?.profileByInvitedUser?.jobDetails?.job }}
          </p>
          <p class="text-B2 text-neutral-400">
            {{ resultItem?.profileByInvitedUser?.companyDetails?.company }}
          </p>
        </div>

        <div
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <!-- 職業類別、職位、年收 -->
          <div>
            <span>
              <a
                href=""
                class="text-special-info"
                target="_blank"
              >
                {{ resultItem?.profileByInvitedUser?.incomeDetails?.income }}
              </a>
            </span>
          </div>
          <!-- 評分 -->
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span
              v-if="resultItem?.profileByInvitedUser?.userStatus?.commentCount"
              class="text-B3 text-neutral-400"
            >
              評分 {{ resultItem?.profileByInvitedUser?.userStatus?.commentScore }} ({{ resultItem?.profileByInvitedUser?.userStatus?.commentCount }})
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
      <MemberInviteComplexBtnWho
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          invitationStatus: props.resultItem.status,
          isLocked: props.resultItem.isLocked,
          createRenderResult,
          cardUserName: props.resultItem.profileByInvitedUser.nickNameDetails.nickName,
          userId: props.resultItem.invitedUserId,
          isUnlock: props.resultItem.isUnlock,
          invitationTableId: props.resultItem._id,
          resultItem: props.resultItem,
          commentTableId: props.resultItem._id,
        }"
      />
    </div>

    <!-- 刪除彈窗 -->
    <MemberInviteDeleteConfirmModal
      :show-modal="isOpenModal"
      :result-item-id="props.resultItem._id"
      :on-close="handleModalClose"
      :on-delete="handleDelete"
    />

    <Toast
      v-if="toastMessage"
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </section>
</template>

<style scoped>
</style>
