<script setup>
import { blackListApi } from '~/apis/repositories/blackList'
import { useBanResultStore } from '~/store/banResult'

// toast
const toastMessage = ref('')
const toastType = ref('')

// 分頁
const pagination = reactive({ page: 1, totalCount: 10 })
const query = reactive({
  sort: '-updatedAt',
  page: pagination.page,
})

// loading 狀態
const isDataLoading = ref(true)

const banResultStore = useBanResultStore()

// 拒絕往來列表
const banListData = ref([])
async function getBanListData() {
  isDataLoading.value = true
  try {
    const { data } = await blackListApi.getBlackList(query)
    banListData.value = data.blackListProfile || []
    pagination.page = data.pagination.page || 1
    pagination.totalCount = data.pagination.totalCount || 0

    // 初始化 store 中的數據
    banResultStore.result = banListData.value
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

onMounted(() => {
  getBanListData()
})

watchEffect(() => {
  query.page = pagination.page
})

// 監聽 store 中 result 的變化
watch(
  () => banResultStore.result,
  (newResult) => {
    banListData.value = newResult
  },
  { deep: true },
)
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        拒絕往來
      </h1>
      <!-- 卡片 -->
      <div
        v-if="!isDataLoading && banListData.length > 0"
        class="space-y-3"
      >
        <MemberBanUserCardResult
          v-for="item in banListData"
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
          尚無拒絕往來的資料，快去尋找對象吧!
        </p>
      </div>

      <!-- 分頁 -->
      <utilsPaginationComp
        v-if="banListData.length > 0"
        v-model="pagination.page"
        :items="Array(pagination.totalCount)"
        class="mt-6"
      />
    </div>
  </div>
</template>

<style scoped></style>
