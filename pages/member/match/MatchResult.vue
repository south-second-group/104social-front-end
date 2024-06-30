<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

useHead({
  title: '配對結果',
})

const matchResult = useMatchResultStore()

const isDataLoading = ref(true)
const toastMessage = ref('')
const toastType = ref('')

const pagination = reactive({ page: 1, totalCount: 1 })
const sortOption = ref([
  { label: '最近更新', value: '-updatedAt' },
  { label: '最久更新', value: 'updatedAt' },
  // {
  //   label: '最高評分',
  //   value: '{ "scoreByProfile.userStatus.commentScore": -1 }',
  // },
  // {
  //   label: '最低評分',
  //   value: '{ "scoreByProfile.userStatus.commentScore": 1 }',
  // },
])
const sortSelected = ref('-updatedAt')

async function getMatchResult(page, sort) {
  isDataLoading.value = true
  try {
    await matchListApi.matchList()
    const res = await matchListApi.getMatchResult(page, sort)
    const { data } = res

    matchResult.result = data.resultList
    matchResult.resultTotal = data?.pagination?.totalCount || 0

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
    <!-- {{ matchResult.result[0].profile.userStatus.commentCount }} -->
    <!-- {{ matchResult.result[0] }} -->

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
          <div
            v-if="matchResult.resultTotal !== 0"
            class="mb-3 "
          >
            <USelectMenu
              v-model="sortSelected"
              :options="sortOption"
              class="ml-auto w-[203px] rounded-md border border-neutral-300 bg-white text-neutral-500"
              size="sm"
              variant="none"
              value-attribute="value"
              option-attribute="label"
            />
          </div>

          <div
            v-if="!isDataLoading && matchResult.resultTotal !== 0"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <!-- {{ matchResult.result }} -->

            <div
              v-for="item in matchResult.result"
              :key="item._id"
            >
              <utilsUserCardMatchResult
                :result-item="item"
                :is-trash-icon="false"
              />
            </div>
          </div>

          <div
            v-else-if="isDataLoading && matchResult.resultTotal !== 0"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <utilsUserCardSkeleton
              v-for="i in 6"
              :key="i"
            />
          </div>

          <div
            v-else
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6 text-center"
          >
            尚無配對資料，請嘗試重新調整配對條件
          </div>

          <div
            v-if="matchResult.resultTotal !== 0"
          >
            <utilsPaginationComp
              v-model="pagination.page"
              :items="Array(pagination.totalCount)"
            />
          </div>
        </div>
      </div>
    </div>

    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>
