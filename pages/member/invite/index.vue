<script setup>
import { inviteListApi } from '~/apis/repositories/inviteList'

// 處理 tab 切換
useHead({
  title: '我的邀約',
})

const tabItems = [
  { label: '我邀約誰' },
  { label: '誰邀約我' },
]

const selectedItem = ref('我邀約誰')

function onChange(index) {
  selectedItem.value = tabItems[index].label
  loadData()
}

// 分頁
const pagination = reactive({ page: 1, totalCount: 1 })

// loading 狀態
const isDataLoading = ref(true)

// 我的邀約列表
const inviteWhoListData = ref([])
async function getInviteWhoList() {
  try {
    const res = await inviteListApi.getInviteWhoList()
    inviteWhoListData.value = res.data.invitations || []

    pagination.page = res.data.pagination?.page || 1
    pagination.totalCount = res.data.pagination?.totalCount || 0

    // inviteWhoListData.value.resultTotal = inviteWhoListData.value.pagination.totalCount || 0
    // pagination.page = inviteWhoListData.value.pagination.page
    // pagination.totalCount = inviteWhoListData.value.pagination.totalCount
  }
  catch (error) {
    console.error(error)
  }
}

// 誰邀約我列表
const inviteMeListData = ref([])
async function getInviteMeList() {
  try {
    const res = await inviteListApi.getInviteMeList()
    inviteMeListData.value = res.data.beInvitations || []

    pagination.page = res.data.pagination?.page || 1
    pagination.totalCount = res.data.pagination?.totalCount || 0

    // inviteMeListData.value.resultTotal = inviteMeListData.value.pagination.totalCount || 0
    // pagination.page = inviteMeListData.value.pagination.page
    // pagination.totalCount = inviteMeListData.value.pagination.totalCount
  }
  catch (error) {
    console.error(error)
  }
}

// 切換 tab 載入資料
async function loadData() {
  isDataLoading.value = true
  if (selectedItem.value === '誰邀約我')
    await getInviteMeList()
  else
    await getInviteWhoList()
  isDataLoading.value = false
}

// 頁面載入時顯示我的邀約列表
onMounted(loadData)

// 監聽 tab 變化，根據選擇顯示相應的 API
watch(selectedItem, loadData)

// 監聽子組件的 refreshList 事件
function handleRefreshList() {
  loadData()
}
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        我的邀約
      </h1>

      <UTabs
        :ui="{
          wrapper: 'mb-[24px] text-start',
          container: 'relative w-full',
          list: {
            width: 'w-[200px]',
            background: 'bg-white',
            marker: {
              shadow: 'shadow-none',
            },
            tab: {
              base: 'text-B2 text-neutral-400 border-b-2 border-white box-border px-4 py-2 hover:text-neutral-700 font-normal',
              active: '!text-primary-dark border-b-2 !border-primary-dark font-[700]',
              rounded: 'rounded-none',
              height: 'h-10',
            },
          },
        }"
        :items="tabItems"
        @change="onChange"
      />

      <!-- 卡片區域 -->
      <section
        v-if="selectedItem === '我邀約誰'"
        class="space-y-3"
      >
        <!-- card -->
        <div
          v-if="!isDataLoading && inviteWhoListData.length !== 0"
          class="space-y-3"
        >
          <MemberInviteUserCardListWho
            v-for="(value, key) in inviteWhoListData"
            :key="key"
            :result-item="value"
            :is-trash-icon="false"
            @refresh-who-list="handleRefreshList"
          />
          <!--  -->
        </div>

        <!-- loading -->
        <div
          v-else-if="isDataLoading"
          class="space-y-3"
        >
          <utilsUserCardSkeleton
            v-for="i in 6"
            :key="i"
          />
        </div>

        <!-- 無資料 -->
        <div
          v-else
          class="space-y-3 rounded-lg bg-neutral-100 p-6 text-center"
        >
          尚無邀約資料，快去邀約心儀的對象吧!
        </div>

        <!-- 分頁 -->
        <div
          v-if="inviteWhoListData.length !== 0"
        >
          <utilsPaginationComp
            v-model="pagination.page"
            :items="Array(pagination.totalCount)"
          />
        </div>
      </section>

      <!-- 誰邀約我 -->
      <section
        v-else
        class="space-y-3"
      >
        <!-- card -->
        <div
          v-if="!isDataLoading && inviteMeListData.length !== 0"
          class="space-y-3"
        >
          <MemberInviteUserCardListMe
            v-for="(value, key) in inviteMeListData"
            :key="key"
            :result-item="value"
            :is-trash-icon="false"
            @refresh-me-list="handleRefreshList"
          />
        </div>

        <!-- loading -->
        <div
          v-else-if="isDataLoading"
          class="space-y-3"
        >
          <utilsUserCardSkeleton
            v-for="i in 6"
            :key="i"
          />
        </div>

        <!-- 無資料 -->
        <div
          v-else
          class="space-y-3 rounded-lg bg-neutral-100 p-6 text-center"
        >
          尚無被邀約資料，趕緊主動出擊吧!
        </div>

        <!-- 分頁 -->
        <div
          v-if="inviteMeListData.length !== 0"
        >
          <utilsPaginationComp
            v-model="pagination.page"
            :items="Array(pagination.totalCount)"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
