<script setup>
const currentTab = ref('all')
const items = [
  {
    category: 'system',
    type: 'nonAccordion',
    title: '您的幸福案例已經公開發佈',
    date: '2 分鐘前',
  },
  {
    category: 'invite',
    type: 'recommend',
    defaultOpen: false,
    slot: 'recommend-list',
    title: 'Terysa 向你提出了邀約，快來看看',
    date: '4 小時前',
    data: [
      {
        name: 'Terysa',
      },
    ],
  },
  {
    category: 'system',
    type: 'recommend',
    defaultOpen: false,
    slot: 'recommend-list',
    title: '快來查看本周由系統為您推薦的對象',
    date: '4 小時前',
    data: [
      {
        name: 'Smile璃寶',
      },
      {
        name: 'Smile璃寶2',
      },
      {
        name: 'Smile璃寶3',
      },
    ],
  },
  {
    category: 'system',
    type: 'text',
    slot: 'mail',
    title: '您的會員方案已更動，請確認以下服務內容及會員權益。',
    defaultOpen: false,
    date: '3/10',
    contents: {
      head: '親愛的用戶您好:',
      body: '您已完成儲值，儲值點數可用於解鎖查看其他會員的評價，一但您啟用此功能即代表您同意本網站的隱私中心協議，不得在未經同意的情況下散佈會員的評價內容，若違反將承擔相關的法律責任。',
      foot: '104 緣來是你',
    },
  },
]
const filteredItems = computed(() => {
  if (currentTab.value === 'all')
    return items

  else
    return items.filter(item => item.category === currentTab.value)
})
function changeTab(tab) {
  currentTab.value = tab
}
</script>

<template>
  <div class="container mt-12 md:mt-20">
    <div class="block gap-x-6 md:grid md:grid-cols-6">
      <p class="text-H3 col-span-4 col-start-2 mb-6 text-start md:mb-10">
        站內通知
      </p>
      <ul class="col-span-4 col-start-2 mb-6 flex">
        <li
          :class="{ 'active-tab': currentTab === 'all', 'inactive-tab': currentTab !== 'all' }"
          class="text-B2 cursor-pointer   px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
          @click="changeTab('all')"
        >
          <p>全部通知</p>
        </li>
        <li
          :class="{ 'active-tab': currentTab === 'invite', 'inactive-tab': currentTab !== 'invite' }"
          class="text-B2 cursor-pointer  px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
          @click="changeTab('invite')"
        >
          邀約通知
        </li>
        <li
          :class="{ 'active-tab': currentTab === 'system', 'inactive-tab': currentTab !== 'system' }"
          class="text-B2 cursor-pointer  px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
          @click="changeTab('system')"
        >
          系統通知
        </li>
      </ul>
      <div class="col-span-4 col-start-2">
        <UAccordion
          :items="filteredItems"
          color="gray"
        >
          <template #nonAccordion>
            <div class="mb-3 flex rounded-md bg-[#F5F5F5] px-2.5 py-1.5 hover:bg-zinc-200">
              <div class="hidden px-[25.5px] py-[15px] md:block">
                <UBadge
                  :ui="{ rounded: 'rounded-full' }"
                  class="bg-primary-dark"
                >
                  NEW
                </UBadge>
              </div>
            </div>
          </template>

          <template #default="{ item, open }">
            <UButton class="mb-3 flex w-full items-center justify-between bg-[#F5F5F5] pe-6 hover:bg-zinc-200">
              <div class="flex w-full items-center">
                <div class="hidden px-[25.5px] py-[15px] md:block">
                  <UBadge
                    :ui="{ rounded: 'rounded-full' }"
                    class="bg-primary-dark"
                  >
                    NEW
                  </UBadge>
                </div>
                <div class="flex w-full justify-between">
                  <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
                    <div class="relative">
                      <div class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark md:hidden"></div>
                      <p class="mb:text-base line-clamp-1 text-sm font-bold text-zinc-950">
                        {{ item.title }}
                      </p>
                    </div>
                    <p class="mt-1 text-start text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3">
                      {{ item.date }}
                    </p>
                  </div>
                </div>
              </div>
              <span
                class="ml-4"
                :class="item.type === 'nonAccordion' ? 'hidden' : ''"
              >
                <i
                  class="text-zinc-950"
                  :class="open ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
                  "
                ></i>
              </span>
            </UButton>
          </template>

          <template #mail="{ item }">
            <div
              :item="item"
              class="rounded-[10px] border-2 border-primary-light p-4 text-start text-gray-900 dark:text-white md:p-6"
            >
              <p class="mb-3">
                {{ item.contents.head }}
              </p>
              <p>{{ item.contents.body }}</p>
              <p class="mt-3 text-end">
                {{ item.contents.foot }}
              </p>
            </div>
          </template>

          <template #recommend-list="{ item }">
            <MemberStatusCard
              v-for="(member, index) in item.data"
              :key="index"
              :member="member"
            />
          </template>
        </UAccordion>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.active-tab {
  border-bottom: 2px solid #F47277;
  color: #F47277;
}

.active-tab p {
  font-weight: 700 ;
}
.inactive-tab {
  border-bottom: 2px solid transparent;
}
</style>
