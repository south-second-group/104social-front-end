<script setup>
import { matchListApi } from '~/apis/repositories/matchList'

useHead({
  title: '配對結果',
})

const matchResult = useMatchResultStore()

const isDataLoading = ref(true)
const toastMessage = ref('')
const toastType = ref('')
const currentPage = ref(1)

async function getMatchResult() {
  try {
    const res = await matchListApi.getMatchResult()
    const { data } = res

    matchResult.result = data
  }
  catch (error) {
    console.error(error)
  }
}

Promise.all([getMatchResult()]).then(() => {
  isDataLoading.value = false
})
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
                <div>{{ matchResult.result.length }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- 配對條件 -->
        <div class="col-span-12 md:col-span-9">
          <div class="flex justify-between">
            <h2 class="text-H4 md:text-H3 mb-4 text-start text-primary-dark">
              <!-- 搜尋結果 -->
            </h2>
            <!-- <div>
              <UToggle
                v-model="matchListData.noticeInfo.notice"
                :disabled="toastMessage !== ''"
              />
              <b class="ml-2">配對通知</b>
            </div> -->
          </div>

          <div
            v-if="!isDataLoading"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            {{ matchResult.result }}

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
            v-model="currentPage"
            :items="matchResult.result"
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
