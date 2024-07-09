<script setup>
import { notificationsAPI } from '../apis/repositories/notifications'

const userNotificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(userNotificationsStore)
const { readNotificationStore } = userNotificationsStore
const currentTab = ref('all')

async function readNotification(id, item) {
  const res = await notificationsAPI.readNotification({ notificationId: id })
  if (res.status) {
    readNotificationStore(id)
    item.isRead = true
  }
}

function useFormattedTime(data) {
  const date = new Date(data)
  const now = new Date()

  // Check if the date is today
  const isToday = date.toDateString() === now.toDateString()

  if (isToday) {
    let hours = date.getHours()
    const minutes = `0${date.getMinutes()}`.slice(-2)
    const period = hours >= 12 ? '下午' : '上午'
    hours = hours % 12
    hours = hours || 12
    return `${period} ${hours}:${minutes}`
  }
  else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}/${day}`
  }
}

const renderList = notifications.value
  .sort((a, b) => {
    const aDate = new Date(a.updatedAt)
    const bDate = new Date(b.updatedAt)
    return bDate - aDate
  })
  .map((i) => {
    return {
      ...i,
      category: i.type === 1 ? 'invite' : 'system',
      type: 'text',
      slot: 'mail',
      title: `來自 ${i.user[0].personalInfo.username} 的訊息`,
      defaultOpen: false,
      date: useFormattedTime(i.updatedAt),
      contents: {
        head: i.message.title,
        body: i.message.content,
        foot: i.user[0].personalInfo.username,
      },
    }
  })
// console.log('renderList', renderList)
const filteredItems = computed(() => {
  if (currentTab.value === 'all')
    return renderList
  else return renderList.filter(item => item.category === currentTab.value)
})
function changeTab(tab) {
  currentTab.value = tab
}
</script>

<template>
  <client-only>
    <div class="container mt-12 md:mt-20">
      <div class="block gap-x-6 md:grid md:grid-cols-6">
        <p class="text-H3 col-span-4 col-start-2 mb-6 text-start md:mb-10">
          站內通知
        </p>
        <ul class="col-span-4 col-start-2 mb-6 flex">
          <li
            :class="{
              'active-tab': currentTab === 'all',
              'inactive-tab': currentTab !== 'all',
            }"
            class="text-B2 cursor-pointer px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
            @click="changeTab('all')"
          >
            <p>全部通知</p>
          </li>
          <li
            :class="{
              'active-tab': currentTab === 'invite',
              'inactive-tab': currentTab !== 'invite',
            }"
            class="text-B2 cursor-pointer px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
            @click="changeTab('invite')"
          >
            邀約通知
          </li>
          <li
            :class="{
              'active-tab': currentTab === 'system',
              'inactive-tab': currentTab !== 'system',
            }"
            class="text-B2 cursor-pointer px-4 py-2 text-zinc-400 transition duration-300 ease-in-out"
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
            <template #default="{ item, open }">
              <UButton
                class="mb-3 flex w-full items-center justify-between bg-[#F5F5F5] pe-6 hover:bg-zinc-200"
                @click="readNotification(item.id, item)"
              >
                <div class="flex w-full items-center">
                  <div class="hidden px-[25.5px] py-[15px] md:block">
                    <UBadge
                      :ui="{ rounded: 'rounded-full' }"
                      class="bg-primary-dark"
                      :class="{ 'opacity-0': item.isRead }"
                    >
                      NEW
                    </UBadge>
                  </div>
                  <div class="flex w-full justify-between">
                    <div
                      class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between"
                    >
                      <div class="relative">
                        <div
                          class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark md:hidden"
                          :class="{ 'opacity-0': item.isRead }"
                        ></div>
                        <p
                          class="mb:text-base line-clamp-1 text-sm font-bold text-zinc-950"
                        >
                          {{ item.title }}
                        </p>
                      </div>
                      <p
                        class="mt-1 text-start text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3"
                      >
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
                    :class="
                      open
                        ? 'i-heroicons-chevron-up'
                        : 'i-heroicons-chevron-down'
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
                <!-- <p class="mb-3">
                  {{ item.contents.head }}
                </p> -->
                <p>{{ item.contents.body }}</p>
                <div class="flex justify-center">
                  <NuxtLink
                    to="/member/invite"
                    class="mt-3"
                  >
                    <UButton
                      :ui="{ rounded: 'rounded-full' }"
                      class="border-2 border-primary-dark bg-primary-dark p-2 text-base font-bold transition delay-150 ease-in-out hover:text-primary-dark"
                    >
                      <p class="">
                        查看我的約會
                      </p>
                    </UButton>
                  </NuxtLink>
                </div>
              </div>
            </template>
          </UAccordion>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped>
.custom-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.active-tab {
  border-bottom: 2px solid #f47277;
  color: #f47277;
}

.active-tab p {
  font-weight: 700;
}
.inactive-tab {
  border-bottom: 2px solid transparent;
}
</style>
