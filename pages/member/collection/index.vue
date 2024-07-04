<script setup>
import { collectionApi } from '~/apis/repositories/collections'
import { useCollectionsResultStore } from '~/store/collectionsResult'

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

const collectionsResult = useCollectionsResultStore()

// 收藏列表
const collectionsListData = ref([])
async function getCollectionsData() {
  isDataLoading.value = true
  try {
    const { data } = await collectionApi.getCollections(query)
    collectionsListData.value = data.collections || []
    pagination.page = data.pagination.page || 1
    pagination.totalCount = data.pagination.totalCount || 0

    // 初始化 store 中的數據
    collectionsResult.result = collectionsListData.value
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
  getCollectionsData()
})

watchEffect(() => {
  query.page = pagination.page
})

// 監聽 store 中 result 的變化
watch(
  () => collectionsResult.result,
  (newResult) => {
    collectionsListData.value = newResult
  },
  { deep: true },
)
</script>

<template>
  <div class="container">
    <div class="mx-auto max-w-[856px] px-3 md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        我的收藏
      </h1>

      <!-- 卡片 -->
      <div
        v-if="!isDataLoading && collectionsListData.length > 0"
        class="space-y-3"
      >
        <MemberCollectionUserCardResult
          v-for="item in collectionsListData"
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
          尚無收藏的資料，快去尋找對象吧!
        </p>
      </div>

      <!-- 分頁 -->
      <utilsPaginationComp
        v-if="collectionsListData.length > 0"
        v-model="pagination.page"
        :items="Array(pagination.totalCount)"
        class="mt-6"
      />
    </div>
  </div>
</template>

<style scoped></style>
