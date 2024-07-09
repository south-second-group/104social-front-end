<script setup>
import { useBeInviteResultStore } from '~/store/beInviteResult'
import { beInviteApi } from '~/apis/repositories/beInvite'
import { matchListApi } from '~/apis/repositories/matchList'

const props = defineProps({
  resultItem: Object,
  isTrashIcon: Boolean,
})

const beInviteResultStore = useBeInviteResultStore()
const isOpenModal = ref(false)
const toastMessage = ref('')
const toastType = ref('')
const isDataLoading = ref(true)

function handleDeleteClick() {
  isOpenModal.value = true
}

function handleModalClose() {
  isOpenModal.value = false
}

async function handleDelete(resultItemId) {
  isOpenModal.value = false
  try {
    await beInviteApi.deleteInvitation(resultItemId)
    toastMessage.value = '刪除邀約成功'
    toastType.value = 'success'

    beInviteResultStore.deleteInviteResult(resultItemId)
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
  { status: 'status11' },
  { status: 'status12' },
])

// 取得配對選項
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
  finally {
    isDataLoading.value = false
  }
}

Promise.all([getMatchListOption()]).then(() => {
  isDataLoading.value = false
})

// 渲染詳細資料邏輯
function renderValue(key, value) {
  if (Array.isArray(value) && value.length >= 1)
    return value.map(v => matchListOptionData.value[0][key] && matchListOptionData.value[0][key][v]?.label)

  if (matchListOptionData.value.length && matchListOptionData.value[0][key] && matchListOptionData.value[0][key][value]?.label !== '請選擇')
    return matchListOptionData.value[0][key][value]?.label
}

const createRenderResult = new Set()
function createRenderValue(key, value) {
  if (Array.isArray(value)) {
    value.forEach((v) => {
      if (matchListOptionData.value.length && matchListOptionData.value[0][key] && matchListOptionData.value[0][key][v]?.label !== '請選擇')
        createRenderResult.add(matchListOptionData.value[0][key][v].label)
    })
  }
  else if (matchListOptionData.value.length && matchListOptionData.value[0][key] && matchListOptionData.value[0][key][value]?.label !== '請選擇') {
    createRenderResult.add(matchListOptionData.value[0][key][value].label)
  }
}
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
            :user-id="resultItem.userId"
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
          :to="`/member/invite/me/${resultItem._id}`"
        >
          <div class="group relative">
            <img
              :src="resultItem.profileByUser.photoDetails.photo"
              alt="s3-alpha-sig"
              class="mx-auto size-[150px] rounded-full border-2 border-neutral-300 object-contain object-center group-hover:blur-sm"
              :class="{ 'blur-md': resultItem.profileByUser.photoDetails.isShow === false }"
            >
            <span
              class="text-shadow absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block "
            >查看資訊</span>
          </div>
        </NuxtLink>
      </div>
      <div class="w-full space-y-3 text-start">
        <div
          v-if="!isDataLoading"
          class="space-y-1"
        >
          <!-- 職稱 -->
          <p
            v-if="
              resultItem.matchListSelfSettingByUser
                && resultItem.matchListSelfSettingByUser.workInfo
            "
            class="text-B2 text-neutral-400"
            :class="{
              '!text-neutral-300':
                resultItem.matchListSelfSettingByUser.workInfo.occupation === 0,
            }"
          >
            {{
              resultItem.matchListSelfSettingByUser.workInfo.occupation
                === 0
                ? '保留職業資訊'
                : renderValue(
                  'occupation',
                  resultItem.matchListSelfSettingByUser.workInfo.occupation,
                )
            }}
          </p>
          <!-- 姓名 -->
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(resultItem.profileByUser.nickNameDetails.nickName),
            }"
          >
            {{ resultItem.profileByUser.nickNameDetails.isShow ? resultItem.profileByUser.nickNameDetails.nickName : '對方保留' }}
          </h2>
        </div>

        <!-- 自介 -->
        <p
          class="text-B2 line-clamp-2 text-neutral-600"
        >
          {{ resultItem.profileByUser.introDetails.isShow ? resultItem.profileByUser.introDetails.intro : '對方保留' }}
        </p>

        <!-- 評分 -->
        <div class="flex flex-col items-start gap-3 md:flex-row">
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span
              v-if="resultItem.profileByUser.userStatus.commentCount"
              class="text-B3 text-neutral-400"
            >
              評分 {{ resultItem.profileByUser.userStatus.commentScore }} ({{ resultItem.profileByUser.userStatus.commentCount }})
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
          invitationStatus: props.resultItem.status,
          isLocked: props.resultItem.isLocked,
          createRenderResult,
          cardUserName: props.resultItem.profileByUser.nickNameDetails.nickName,
          userId: props.resultItem.userId,
          isUnlock: props.resultItem.isUnlock,
          invitationTableId: props.resultItem._id,
          resultItem: props.resultItem,
          commentTableId: props.resultItem._id,
          beCommentCount: props.resultItem.profileByUser.userStatus.commentCount,
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
