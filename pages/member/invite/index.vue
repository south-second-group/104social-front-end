<script setup>
import { inviteListApi } from '~/apis/repositories/inviteList'
import { useInviteResultStore } from '~/store/inviteResult'
import { useBeInviteResultStore } from '~/store/beInviteResult'

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
}

// toast
const toastMessage = ref('')
const toastType = ref('')

// 分頁
const pagination = reactive({ page: 1, totalCount: 10 })
const query = reactive({
  sort: '-score',
  page: pagination.page,
})

// loading 狀態
const isDataLoading = ref(true)

// 我的邀約列表
const inviteWhoListData = ref([])
// 誰邀約我列表
const inviteMeListData = ref([])

const inviteResult = useInviteResultStore()
const beInviteResult = useBeInviteResultStore()

async function loadData() {
  isDataLoading.value = true
  try {
    if (selectedItem.value === '我邀約誰') {
      const { data } = await inviteListApi.getInviteWhoList(query)
      inviteWhoListData.value = data.invitations || []
      pagination.page = data.pagination.page || 1
      pagination.totalCount = data.pagination.totalCount || 0

      // 初始化 store 中的數據
      inviteResult.result = inviteWhoListData.value
    }
    else {
      const { data } = await inviteListApi.getInviteMeList(query)
      inviteMeListData.value = data.beInvitations || []
      pagination.page = data.pagination.page || 1
      pagination.totalCount = data.pagination.totalCount || 0

      // 初始化 store 中的數據
      beInviteResult.result = inviteMeListData.value
    }
  }
  catch (error) {
    console.error(error)
    toastMessage.value = '加載資料失敗，請稍後再試'
    toastType.value = 'error'
  }
  finally {
    isDataLoading.value = false
  }
}

watchEffect(() => {
  query.page = pagination.page
})

// 頁面載入時顯示我的邀約列表
onMounted(loadData)

// 監聽 tab 變化，根據選擇顯示相應的 API
watch(selectedItem, loadData)

// 監聽 store 中 result 的變化
watch(
  () => inviteResult.result,
  (newResult) => {
    if (selectedItem.value === '我邀約誰')
      inviteWhoListData.value = newResult
  },
  { deep: true },
)

watch(
  () => beInviteResult.result,
  (newResult) => {
    if (selectedItem.value === '誰邀約我')
      inviteMeListData.value = newResult
  },
  { deep: true },
)
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
          v-if="!isDataLoading && inviteWhoListData.length > 0"
          class="space-y-3"
        >
          <MemberInviteUserCardListWho
            v-for="item in inviteWhoListData"
            :key="item._id"
            :result-item="item"
            :is-trash-icon="false"
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
        <div v-else>
          <NuxtImg
            src="/chatRoom/No-Result-Found.png"
            alt=""
            class="mx-auto w-[250px]"
          />
          <p class="font-bold text-zinc-400">
            尚無邀約資料，快去邀約心儀的對象吧!
          </p>
        </div>

        <!-- 分頁 -->
        <utilsPaginationComp
          v-if="inviteWhoListData.length > 0"
          v-model="pagination.page"
          :items="Array(pagination.totalCount)"
        />
      </section>

      <!-- 誰邀約我 -->
      <section
        v-else
        class="space-y-3"
      >
        <!-- card -->
        <div
          v-if="!isDataLoading && inviteMeListData.length > 0"
          class="space-y-3"
        >
          <MemberInviteUserCardListMe
            v-for="item in inviteMeListData"
            :key="item._id"
            :result-item="item"
            :is-trash-icon="false"
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
        <div v-else>
          <NuxtImg
            src="/chatRoom/No-Result-Found.png"
            alt=""
            class="mx-auto w-[250px]"
          />
          <p class="font-bold text-zinc-400">
            尚無被邀約資料，趕緊主動出擊吧!
          </p>
        </div>

        <!-- 分頁 -->
        <utilsPaginationComp
          v-if="inviteMeListData.length > 0"
          v-model="pagination.page"
          :items="Array(pagination.totalCount)"
        />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
