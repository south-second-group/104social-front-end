<script setup>
import { searchApi } from '../apis/repositories/search'

useHead({
  title: '尋找對象',
})

const searchCriteriaStore = useSearchCriteriaStore()
const { selected, excluded } = storeToRefs(searchCriteriaStore)
const { removeSelectedTag, removeExcludedHashtag } = searchCriteriaStore

const isDesktop = ref(false)
function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 1024
}

const currentTab = ref('all')
function changeTab(tab) {
  currentTab.value = tab
}

const toastMessage = ref('')
const toastType = ref('')
const isDataLoading = ref(true)

const pagination = reactive({ page: 1, totalCount: 10 })
const query = reactive({
  sort: '-updatedAt',
  page: pagination.page,
})
const searchForm = reactive({
  keyWord: '',
  location: 0,
  gender: 0,
  tags: selected,
  notTags: excluded,
})

function resetSearchForm() {
  searchForm.keyWord = ''
  searchForm.location = 0
  searchForm.gender = 0
  selected.value = []
  excluded.value = []
}

async function keywordSearch() {
  isDataLoading.value = true
  try {
    const { data } = await searchApi.keywordSearch(query, searchForm)

    searchCriteriaStore.searchResultsList = data.resultList
    pagination.totalCount = data?.pagination?.totalCount || 0

    resetSearchForm()
  }
  catch (error) {
    console.error(error)

    toastMessage.value = '搜尋失敗，請洽管理員'
    toastType.value = 'error'
  }
  finally {
    // await new Promise(resolve => setTimeout(resolve, 2000))
    isDataLoading.value = false
  }
}

watchEffect(() => {
  query.page = pagination.page
})

watch(query, () => {
  keywordSearch(pagination.page, query.sort)
})

watch(
  () => pagination.page,
  () => {
    keywordSearch(pagination.page, query.sort)
  },
)

onMounted(async () => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  await resetSearchForm()
  keywordSearch()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

const locationOption = [
  { value: 0, label: '不限' },
  { value: 1, label: '北部' },
  { value: 2, label: '南部' },
  { value: 3, label: '東部' },
  { value: 4, label: '西部' },
  { value: 5, label: '中部' },
  { value: 6, label: '海外' },
]

const genderOption = [
  { value: 0, label: '不限' },
  { value: 1, label: '男性' },
  { value: 2, label: '女性' },
  { value: 3, label: '其他' },
  { value: 4, label: '不透露' },
]

const sortOption = ref([
  { label: '最近更新', value: '-updatedAt' },
  { label: '最久更新', value: 'updatedAt' },
  { label: '最高評分', value: '-score' },
  { label: '最低評分', value: 'score' },
])
</script>

<template>
  <div class="container">
    <Toast
      :toast-message="toastMessage"
      :toast-type="toastType"
    />

    <h1 class="sr-only">
      尋找對象
    </h1>
    <div v-if="searchCriteriaStore.searchResultsList.length > 0 && !isDataLoading">
      {{ searchCriteriaStore.searchResultsList[0] }}
    </div>
    <!-- {{ searchForm }} -->

    <div class="grid grid-cols-12 gap-6 py-5 lg:py-20">
      <div class="col-span-12 mt-4 lg:col-span-9">
        <div class="my-3 flex flex-col lg:mb-6 lg:flex-row">
          <div
            class="mb-2 me-4 h-12 w-full rounded-lg border bg-white lg:mb-0 lg:max-w-[380px]"
          >
            <UInput
              v-model="searchForm.keyWord"
              color="primary"
              variant="none"
              size="xl"
              placeholder="輸入理想對象的職業、興趣、星座..."
              value-attribute="value"
              option-attribute="label"
              @keydown.enter="($event) => !$event.shiftKey && keywordSearch()"
            />
          </div>
          <div class="flex gap-2 lg:gap-4">
            <div
              class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]"
            >
              <USelectMenu
                v-model="searchForm.location"
                :options="locationOption"
                placeholder="所在地區"
                class="text-gray-400"
                size="xl"
                variant="none"
                value-attribute="value"
                option-attribute="label"
              />
            </div>
            <div
              class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]"
            >
              <USelectMenu
                v-model="searchForm.gender"
                :options="genderOption"
                placeholder="性別"
                class="text-gray-400"
                size="xl"
                variant="none"
                value-attribute="value"
                option-attribute="label"
              />
            </div>
            <div class="flex items-center">
              <div class="my-auto">
                <UPopover :popper="{ placement: 'bottom-end' }">
                  <UButton
                    class="rounded-full border-2 border-[#FFF5F5] bg-[#FFF5F5] p-2 transition delay-150 ease-in-out hover:border-primary-dark hover:bg-[#FFF5F5]"
                  >
                    <icon-heroicons-adjustments-horizontal
                      class="size-6 text-primary-dark"
                    />
                  </UButton>
                  <template #panel="{ close }">
                    <search-dateHashtagSelectCard :close="close" />
                  </template>
                </UPopover>
              </div>
              <div class="lg:w-full">
                <UButton
                  :ui="{ rounded: 'rounded-full' }"
                  class="ms-2 border-2 border-primary-dark bg-primary-dark p-2 text-base font-bold transition delay-150 ease-in-out hover:text-primary-dark lg:ms-4 lg:w-full lg:px-5 lg:py-2"
                  @click="keywordSearch"
                >
                  <p class="hidden lg:block">
                    搜尋
                  </p>
                  <icon-heroicons-magnifying-glass class="size-6 lg:hidden" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
        <!-- 標籤輸入值 -->
        <div
          v-if="selected.length > 0 || excluded.length > 0"
          class="my-3 ps-3 lg:mb-5"
        >
          <div
            v-if="selected.length > 0"
            class="mb-3 flex items-center gap-3"
          >
            <p class="text-B2 mb-1 text-start text-zinc-400">
              搜尋條件
            </p>
            <div class="flex shrink-0 flex-wrap gap-3">
              <UBadge
                v-for="tag in selected"
                :key="tag"
                :ui="{ rounded: 'rounded-full' }"
                class="bg-[#FFF5F5] px-3 py-2"
              >
                <p class="me-1 text-base text-zinc-900">
                  {{ tag }}
                </p>
                <icon-heroicons-x-mark
                  class="size-4 cursor-pointer text-zinc-900"
                  @click="removeSelectedTag(tag)"
                />
              </UBadge>
            </div>
          </div>

          <div
            v-if="excluded.length > 0"
            class="flex items-center gap-3"
          >
            <p class="text-B2 mb-1 text-start text-zinc-400">
              排除條件
            </p>
            <div class="flex shrink-0 flex-wrap gap-3">
              <UBadge
                v-for="tag in excluded"
                :key="tag"
                :ui="{ rounded: 'rounded-full' }"
                class="bg-[#FFF5F5] px-3 py-2"
              >
                <p class="me-1 text-base text-zinc-900">
                  {{ tag }}
                </p>
                <icon-heroicons-x-mark
                  class="size-4 cursor-pointer text-zinc-900"
                  @click="removeExcludedHashtag(tag)"
                />
              </UBadge>
            </div>
          </div>
        </div>
        <!-- 切換頁籤 -->
        <search-dateMemberOptions class="lg:hidden" />
        <div
          class="mb-6 mt-10 flex w-full flex-col justify-between lg:mt-0 lg:flex-row lg:items-center"
        >
          <div class="mb-6 flex gap-6 overflow-x-auto lg:mb-0">
            <div
              :class="{
                'active-tab': currentTab === 'all',
                'inactive-tab': currentTab !== 'all',
              }"
              class="cursor-pointer whitespace-nowrap p-2 transition duration-300 ease-in-out"
              @click="changeTab('all')"
            >
              <p class="text-base font-bold md:text-xl">
                全部（{{ pagination.totalCount }}）
              </p>
            </div>
            <!-- <UDivider
              orientation="vertical"
              class="my-1.5"
            />
            <div
              :class="{
                'active-tab': currentTab === 'public',
                'inactive-tab': currentTab !== 'public',
              }"
              class="cursor-pointer whitespace-nowrap p-2 transition duration-300 ease-in-out"
              @click="changeTab('public')"
            >
              <p class="text-base font-bold md:text-xl">
                公開（8524）
              </p>
            </div> -->
            <UDivider
              orientation="vertical"
              class="my-1.5"
            />
            <div
              :class="{
                'active-tab': currentTab === 'newest',
                'inactive-tab': currentTab !== 'newest',
              }"
              class="cursor-pointer whitespace-nowrap p-2 transition duration-300 ease-in-out"
              @click="changeTab('newest')"
            >
              <p class="text-base font-bold md:text-xl">
                近期刊登（487）
              </p>
            </div>
          </div>
          <div
            class="h-12 w-full max-w-[196px] self-start rounded-lg border bg-white hover:border-primary-dark lg:self-end"
          >
            <USelectMenu
              v-model="query.sort"
              :options="sortOption"
              placeholder="預設排序"
              class="text-gray-400"
              size="xl"
              variant="none"
              value-attribute="value"
              option-attribute="label"
            />
          </div>
        </div>
        <div class="space-y-6">
          <div
            v-if="!isDataLoading && pagination.totalCount > 0"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <utilsUserCardMatchResult
              v-for="item in searchCriteriaStore.searchResultsList"
              :key="item._id"
              class="space-y-3"
              :result-item="item"
              :is-trash-icon="false"
            />
          </div>

          <div
            v-else-if="isDataLoading"
            class="mb-4 space-y-3 rounded-lg bg-neutral-100 p-6"
          >
            <utilsUserCardSkeleton
              v-for="i in 6"
              :key="i"
            />
          </div>

          <div v-else>
            <NuxtImg
              src="/chatRoom/No-Result-Found.png"
              alt=""
              class="mx-auto w-[250px]"
            />
            <p class="font-bold text-zinc-400">
              Oops! 沒有找到符合條件的對象
            </p>
          </div>
        </div>

        <utilsPaginationComp
          v-if="pagination.totalCount > 0"
          v-model="pagination.page"
          :items="Array(pagination.totalCount)"
          class="mt-6"
        />
      </div>
      <!-- 右側表單 -->
      <search-dateMemberOptions class="hidden lg:block" />
    </div>
    <!-- 也許你也喜歡 -->
    <div class="border border-transparent border-y-zinc-200 py-12 lg:py-20">
      <p class="text-H4 mb-6 text-zinc-400 lg:mb-[60px]">
        也許你也喜歡...
      </p>
      <div
        v-if="isDesktop"
        class="grid grid-cols-2 gap-6"
      >
        <search-dateMemberSearchCard
          v-for="result in searchCriteriaStore.searchResultsList"
          :key="result"
          :result-item="result"
        />
      </div>
      <UCarousel
        v-if="!isDesktop && !isDataLoading"
        v-slot="{ item }"
        :items="searchCriteriaStore.searchResultsList"
      >
        <div class="mx-auto text-center">
          <search-dateMemberSearchCard :member="item" />
        </div>
      </UCarousel>
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  color: #52525b;
  transition-duration: 0.5s;
}

.inactive-tab {
  color: #a1a1aa;
  transition-duration: 0.5s;
}

.active-tab :hover,
.inactive-tab :hover {
  color: #f47277;
  transition-duration: 0.5s;
}
</style>
