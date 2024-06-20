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
  // page.value = 1
  loadData()
}

// 分頁
const page = ref(1)
const itemsPerPage = 6
const totalItems = ref(0)

// 狀態
const isDataLoading = ref(true)

// 我的邀約列表
const inviteWhoListData = ref([])
async function getInviteWhoList() {
  try {
    const res = await inviteListApi.getInviteWhoList()
    inviteWhoListData.value = res.data.invitations
    totalItems.value = inviteWhoListData.value.length
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
    inviteMeListData.value = res.data.beInvitations
    totalItems.value = inviteMeListData.value.length
  }
  catch (error) {
    console.error(error)
  }
}

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
        <div
          v-if="isDataLoading"
          class="space-y-3"
        >
          <utilsUserCardSkeleton
            v-for="i in itemsPerPage"
            :key="i"
          />
        </div>
        <div
          v-else
          class="space-y-3"
        >
          <MemberInviteUserCardListWho
            v-for="(value, key) in inviteWhoListData"
            :key="key"
            :result-item="value"
            :is-trash-icon="false"
            @refresh-who-list="handleRefreshList"
          />
        </div>
      </section>

      <!-- 誰邀約我 -->
      <section
        v-else
        class="space-y-3"
      >
        <div
          v-if="isDataLoading"
          class="space-y-3"
        >
          <utilsUserCardSkeleton
            v-for="i in itemsPerPage"
            :key="i"
          />
        </div>
        <div
          v-else
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
      </section>
    </div>
  </div>
</template>

<style scoped></style>
