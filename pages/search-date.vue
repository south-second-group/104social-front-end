<script setup>
import { searchApi } from '../apis/repositories/search'

useHead({
  title: '尋找對象',
})

const searchCriteriaStore = useSearchCriteriaStore()
const { selected, excluded } = storeToRefs(searchCriteriaStore)
const { removeSelectedTag, removeExcludedHashtag } = searchCriteriaStore

const locationType = ['北部', '中部', '南部', '東部']
const locationSelected = ref(null)

const searchType = ['男性', '女性', '其他']
const searchTypeSelected = ref(null)

const sortType = ['最後更新時間', '最多評價']
const sortSelected = ref(null)

const keyWord = ref('')
const isDesktop = ref(false)

const noResultFound = ref(false)

// 抓取畫面尺寸，分辨電腦或手機
function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 1024
}

// 標籤控制
const currentTab = ref('')

function changeTab(tab) {
  currentTab.value = tab
}

// 分頁控制
const pagination = reactive({ page: 1, totalCount: 2 })

// 搜尋 API
const searchResultsList = ref([])
async function getResultListOption(keyword) {
  try {
    const params = {
      keyword: keyword || '',
      pageNumber: 1,
      pageSize: 6,
    }
    const response = await searchApi.getSearchResultList(params)
    if (response.status)
      searchResultsList.value = response.data
  }
  catch (error) {
    const errorMessage = error.response
  }
}

onMounted(async () => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  await getResultListOption(keyWord)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <div class="container">
    <h1 class="sr-only">
      尋找對象
    </h1>

    <div class="grid grid-cols-12 gap-6 py-5 lg:py-20">
      <div class="col-span-12 mt-4 lg:col-span-9">
        <div class="my-3 flex flex-col lg:mb-6 lg:flex-row">
          <div
            class="mb-2 me-4 h-12 w-full rounded-lg border bg-white lg:mb-0 lg:max-w-[380px]"
          >
            <UInput
              v-model="keyWord"
              color="primary"
              variant="none"
              size="xl"
              placeholder="輸入理想對象的職業、興趣、星座..."
              v-bind="keyWord"
            />
          </div>
          <div class="flex gap-2 lg:gap-4">
            <div
              class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]"
            >
              <USelectMenu
                v-model="locationSelected"
                :options="locationType"
                placeholder="所在地區"
                class="text-gray-400"
                size="xl"
                variant="none"
              />
            </div>
            <div
              class="h-12 w-full min-w-[120px] rounded-lg border bg-white lg:min-w-[160px]"
            >
              <USelectMenu
                v-model="searchTypeSelected"
                :options="searchType"
                placeholder="性別"
                class="text-gray-400"
                size="xl"
                variant="none"
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
                  @click="() => getResultListOption(keyWord)"
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
                全部（9487）
              </p>
            </div>
            <UDivider
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
            </div>
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
              v-model="sortSelected"
              :options="sortType"
              placeholder="預設排序"
              class="text-gray-400"
              size="xl"
              variant="none"
            />
          </div>
        </div>
        <div class="flex flex-wrap justify-center lg:flex-col">
          <div v-if="noResultFound">
            <NuxtImg
              src="/chatRoom/No-Result-Found.png"
              alt=""
              class="mx-auto w-[250px]"
            />
            <p class="font-bold text-zinc-400">
              Oops! 沒有找到符合條件的對象
            </p>
          </div>
          <!-- <search-dateSearchUserCard :result-item="result" :is-trash-icon="true" v-for="result in searchResultsList" :key="result" /> -->
          <search-dateMemberSearchCard
            v-for="result in searchResultsList"
            :key="result"
            :result-item="result"
          />
        </div>
        <div v-if="searchResultsList.resultTotal !== 0">
          <utilsPaginationComp
            v-model="pagination.page"
            :items="Array(pagination.totalCount)"
          />
        </div>
      </div>

      <!-- 右側表單 -->
      <search-dateMemberOptions class="hidden lg:block" />
    </div>
    <div class="border border-transparent border-y-zinc-200 py-12 lg:py-20">
      <p class="text-H4 mb-6 text-zinc-400 lg:mb-[60px]">
        也許你也喜歡...
      </p>
      <div
        v-if="isDesktop"
        class="grid grid-cols-2 gap-6"
      >
        <search-dateMemberSearchCard
          v-for="result in searchResultsList"
          :key="result"
          :result-item="result"
        />
      </div>
      <UCarousel
        v-else
        v-slot="{ item }"
        :items="searchResultsList"
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
