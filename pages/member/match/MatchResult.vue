<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

useHead({
  title: '配對結果',
})

const matchResult = useMatchResultStore()

const isDataLoading = ref(true)
const toastMessage = ref('')
const toastType = ref('')

const pagination = reactive({ page: 1, totalPage: 1 })
const sortOption = ref([
  { label: '最近更新', value: 'desc' },
  { label: '最久更新', value: 'asc' },
  { label: '最高評分', value: 'hightScore' },
  { label: '最低評分', value: 'lowScore' },
])
const sortSelected = ref('desc')

async function getMatchResult(page, sort) {
  isDataLoading.value = true
  try {
    const res = await matchListApi.getMatchResult(page, sort)
    const { data } = res

    matchResult.result = data
    matchResult.resultTotal = data[0].pagination.totalPage

    pagination.page = data[0].pagination.page
    pagination.totalPage = data[0].pagination.totalPage
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await new Promise(resolve => setTimeout(resolve, 2000))
    isDataLoading.value = false
  }
}

Promise.all([getMatchResult(pagination.page, sortSelected)]).then(() => {
  isDataLoading.value = false
})

watch([sortSelected], () => {
  getMatchResult(pagination.page, sortSelected)
})

watch(
  () => pagination.page,
  () => {
    getMatchResult(pagination.page, sortSelected)
  },
)
</script>

<template>
  <div class="container text-start">
    <div class="mx-auto">
      <h1 class="text-H4 md:text-H3 mb-6 mt-[80px] text-start md:mb-[20px]">
        配對結果
      </h1>

      <div class="grid grid-cols-12 gap-5">
        <!-- 適合我的對象 -->
        <div class="col-span-12 md:col-span-3">
          <div
            style="
              background-color: #fff5f5;
              border-radius: 10px;
              padding: 24px;
            "
          >
            <h2 class="text-B1 mb-2 text-center text-primary-dark">
              <b>適合我的對象</b>
            </h2>
            <NuxtLink to="/member/match/MatchResult">
              <div class="mb-2 flex justify-between">
                <div>配對結果</div>
                <div>{{ matchResult.resultTotal }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- 配對條件 -->
        <div class="col-span-12 md:col-span-9">
          <div class="mb-3 flex justify-between">
            <h2 class="text-H4 md:text-H3 mb-4 text-start text-primary-dark">
              <!-- 搜尋結果 -->
            </h2>
            <USelectMenu
              v-model="sortSelected"
              :options="sortOption"
              class="w-[203px] rounded-md border border-neutral-300 bg-white text-neutral-500"
              size="sm"
              variant="none"
              value-attribute="value"
              option-attribute="label"
            />
          </div>

          <div
            v-if="!isDataLoading"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <!-- {{ matchResult.result }} -->

            <utilsUserCardBgLight
              v-for="item in matchResult.result"
              :key="item._id"
              :result-item="item"
            />
          </div>

          <div
            v-else
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <utilsUserCardBgLightSkeleton
              v-for="i in 6"
              :key="i"
            />
          </div>

          <utilsPaginationComp
            v-model="pagination.page"
            :items="Array(pagination.totalPage)"
          />
        </div>
      </div>
    </div>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>
