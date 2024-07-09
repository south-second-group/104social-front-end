<script setup>
import { useBanResultStore } from '~/store/banResult'
import { matchListApi } from '~/apis/repositories/matchList'

defineProps({
  resultItem: Object,
  isTrashIcon: Boolean,
})

const banResultStore = useBanResultStore()
// const isOpenModal = ref(false)
const toastMessage = ref('')
const toastType = ref('')
const isDataLoading = ref(true)

// function handleDeleteClick() {
//   isOpenModal.value = true
// }

// function handleModalClose() {
//   isOpenModal.value = false
// }

// async function handleDelete(resultItemId) {
//   isOpenModal.value = false
//   try {
//     await inviteApi.deleteInvitation(resultItemId)
//     toastMessage.value = '刪除邀約成功'
//     toastType.value = 'success'

//     inviteResultStore.deleteInviteResult(resultItemId)
//   }
//   catch (error) {
//     console.error(error)
//     toastMessage.value = '刪除邀約失敗，請通知開發者'
//     toastType.value = 'error'
//   }
// }

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
const isLocked = false
</script>

<template>
  <section
    v-if="resultItem"
    class="w-full space-y-4 rounded-[10px] border-2 border-neutral-300 bg-white p-4 md:p-6"
  >
    <!-- 上 -->
    <div class="flex items-center justify-between">
      <!-- <MemberInviteStatusBtnWho :status="resultItem.status" /> -->
      <div class="flex gap-3">
        <!-- 聊天 -->
        <!-- <div
          v-if="resultItem.status === 'accept' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
        >
          <utilsChatBtn />
        </div> -->
        <!-- 刪除 -->
        <!-- <div
          v-if="resultItem.status === 'reject' || resultItem.status === 'cancel' || resultItem.status === 'finishDating'"
          class="rounded-full bg-neutral-100 p-[10px]"
          @click="handleDeleteClick"
        >
          <utilsTrashBtn />
        </div> -->
        <!-- 收藏 -->
        <!-- <div class="rounded-full bg-neutral-100 p-[10px]">
          <utilsCollectionBtn
            :is-collected="resultItem.isCollected"
            :user-id="resultItem.invitedUserId"
            :collection-table-id="resultItem._id"
          />
        </div> -->
      </div>
    </div>

    <!-- 中 -->
    <div class="flex flex-col gap-6 rounded-xl bg-neutral-100 p-6 md:flex-row">
      <div class="shrink-0">
        <!-- 圖片 -->
        <NuxtLink :to="`/member/banlist/${resultItem._id}`">
          <div class="group relative">
            <img
              :src="resultItem.photoDetails.photo"
              alt="s3-alpha-sig"
              class="mx-auto size-[150px] rounded-full border-2 border-neutral-300 object-contain object-center group-hover:blur-sm"
              :class="{ 'blur-md': resultItem.photoDetails.isShow === false }"
            >
            <span class="text-shadow absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white group-hover:block">
              查看資訊
            </span>
          </div>
        </NuxtLink>
      </div>
      <div class="w-full shrink-0 space-y-6 text-start md:w-[586px]">
        <div class="space-y-1">
          <!-- 姓名 -->
          <h2
            class="text-H4 text-neutral-600"
            :class="{
              'font-montserrat': !useIsChineseFunc(resultItem?.nickNameDetails?.nickName),
            }"
          >
            {{ resultItem.nickNameDetails.isShow ? resultItem.nickNameDetails.nickName : '對方保留' }}
          </h2>

          <!-- 個人說明 -->
          <div v-if="!isDataLoading">
            <!-- 將個人條件全部加入顯示陣列 -->
            <span
              v-for="(value, key) in resultItem?.matchListSettings?.personalInfo"
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
                  resultItem?.matchListSettings?.workInfo?.industry,
                )
              }}
            </span>
            <!-- 顯示陣列 -->
            <span class="text-B2 text-neutral-600">
              {{ Array.from(createRenderResult).join('、') }}
            </span>
          </div>
        </div>

        <!-- 職業 -->
        <div
          v-if="!isDataLoading"
          class="space-y-3 border-l-2 border-x-neutral-300 pl-3"
        >
          <p
            v-if="
              resultItem.matchListSettings
                && resultItem.matchListSettings.workInfo
            "
            class="text-B2 text-neutral-500"
            :class="{
              '!text-neutral-300':
                resultItem.matchListSettings.workInfo.occupation === 0,
            }"
          >
            {{
              resultItem.matchListSettings.workInfo.occupation
                === 0
                ? '保留職業資訊'
                : renderValue(
                  'occupation',
                  resultItem.matchListSettings.workInfo.occupation,
                )
            }}
          </p>
          <p
            v-if="
              resultItem.matchListSettings
                && resultItem.matchListSettings.workInfo
            "
            class="text-B2 text-neutral-400"
          >
            <span>
              {{
                renderValue(
                  'expectedSalary',
                  resultItem.matchListSettings.workInfo.expectedSalary,
                )
              }}
            </span>
            <span
              v-for="i in renderValue(
                'industry',
                resultItem.matchListSettings.workInfo?.industry || [],
              )"
              :key="i"
            >
              {{ i === '請選擇' ? '保留產業資訊' : i }}{{ ' ' }}
            </span>
          </p>
        </div>

        <div
          v-if="!isDataLoading"
          class="flex flex-col items-start justify-between gap-3 md:flex-row"
        >
          <!-- 嗜好 -->
          <div>
            <span
              v-for="(item, idx) in renderValue(
                'activities',
                resultItem.matchListSettings.personalInfo?.activities || [],
              )"
              :key="idx"
            >
              <a
                :href="`https://www.google.com/search?q=${item}`"
                class="text-special-info"
                target="_blank"
                :class="{
                  'pointer-events-none !text-neutral-300': item === '請選擇',
                }"
              >
                {{ item === '請選擇' ? '無興趣嗜好' : item }}{{ ' ' }}</a>
            </span>
          </div>

          <!-- 評分 -->
          <div class="flex justify-end space-x-2">
            <icon-heroicons:star-solid class="text-special-warning" />
            <span
              v-if="resultItem?.userStatus?.commentCount"
              class="text-B3 text-neutral-400"
            >
              評分 {{ resultItem?.userStatus?.commentScore }} ({{ resultItem?.userStatus?.commentCount }})
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
      <MemberBanComplexBtn
        v-for="(btn, index) in buttonList"
        :key="index"
        v-bind="{
          status: btn.status,
          //invitationStatus: resultItem.status,
          isLocked,
          createRenderResult,
          cardUserName: resultItem.nickNameDetails.nickName,
          userId: resultItem.userId,
          //isUnlock: resultItem.isUnlock,
          invitationTableId: resultItem._id,
          resultItem,
          commentTableId: resultItem._id,
        }"
      />
    </div>

    <!-- 刪除彈窗 -->
    <!-- <MemberInviteDeleteConfirmModal
      :show-modal="isOpenModal"
      :result-item-id="props.resultItem._id"
      @close="handleModalClose"
      @delete="handleDelete"
    /> -->

    <Toast
      v-if="toastMessage"
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </section>
</template>

<style scoped>
</style>
