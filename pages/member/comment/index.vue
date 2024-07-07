<script setup>
import { commentApi } from '~/apis/repositories/comment'

useHead({
  title: '我留下的評價',
})

const commentList = useCommentStore()

const isDataLoading = ref(true)
const pagination = reactive({ page: 1, totalCount: 1 })
// const sortOption = ref([
//   { label: '最近更新', value: '-updatedAt' },
//   { label: '最久更新', value: 'updatedAt' },
// ])
const sortSelected = ref('-updatedAt')

async function getCommentILiftList(page, sort) {
  isDataLoading.value = true
  try {
    const res = await commentApi.getCommentILiftList(page, sort)
    const { data } = res

    commentList.result = data.resultList
    commentList.resultTotal = data?.pagination?.totalCount || 0

    pagination.page = data?.pagination?.page || 1
    pagination.totalCount = data?.pagination?.totalCount || 1
  }
  catch (error) {
    console.error(error)
  }
  finally {
    isDataLoading.value = false
  }
}

Promise.all([getCommentILiftList(pagination.page, sortSelected)]).then(() => {
  isDataLoading.value = false
})

watch([sortSelected], () => {
  getCommentILiftList(pagination.page, sortSelected)
})

watch(
  () => pagination.page,
  () => {
    getCommentILiftList(pagination.page, sortSelected)
  },
)
</script>

<template>
  <main class="flex justify-center ">
    <div class="mx-auto px-3 md:min-w-[856px] md:px-0">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[40px]">
        我留下的評價
      </h1>

      <!-- 卡片 -->
      <section
        v-if="!isDataLoading && commentList.result && commentList.result.length > 0"
        class="space-y-3"
      >
        <div
          v-for="item in commentList.result"
          :key="item._id"
        >
          <utilsUserCardMatchResult
            :result-item="item"
            :is-trash-icon="false"
          />
        </div>
      </section>

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
        尚無評價資料
      </div>

      <!-- 分頁 -->
      <section
        v-if="commentList.result && commentList.result.length > 0"
        class="py-12 font-montserrat"
      >
        <utilsPaginationComp
          v-model="pagination.page"
          :items="Array(pagination.totalPage)"
        />
      </section>
    </div>
  </main>
</template>

<style scoped></style>
