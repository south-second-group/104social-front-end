<script setup>
const userNotificationsStore = useNotificationsStore()
const { notifications } = storeToRefs(userNotificationsStore)

const sortedNotifications = ref([])

function sortNotifications() {
  sortedNotifications.value = notifications.value.sort((a, b) => {
    const aDate = new Date(a.updatedAt)
    const bDate = new Date(b.updatedAt)
    return bDate - aDate
  })
}

const newestList = ref([])

function updateNewestList() {
  sortNotifications()
  newestList.value = sortedNotifications.value.length <= 4
    ? sortedNotifications.value
    : sortedNotifications.value.slice(0, 4)
}

watch(notifications, updateNewestList, { immediate: true })

function useFormattedTime(data) {
  const date = new Date(data)
  const now = new Date()
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
</script>

<template>
  <div v-if="notifications.length === 0">
    <NuxtImg
      src="/SubmitStory/img-sm.png"
      alt=""
      class="mx-auto w-[150px]"
    />
    <p class="mb-2 text-center text-xl font-bold text-zinc-400">
      目前尚未收到任何通知
    </p>
  </div>

  <ul
    v-if="notifications.length > 0"
    class="flex flex-col gap-3"
  >
    <li
      v-for="not in newestList"
      :key="not.id"
      class="flex rounded-md bg-[#F5F5F5] p-3 pe-[28px] md:p-0 md:pe-0"
    >
      <div class="hidden px-[25.5px] py-[15px] md:block">
        <UBadge
          :ui="{ rounded: 'rounded-full' }"
          class="bg-primary-dark"
          :class="{ 'opacity-0': not.isRead }"
        >
          NEW
        </UBadge>
      </div>
      <div class="ms-[30px] flex flex-col md:ms-0 md:w-full md:flex-row md:items-center md:justify-between">
        <NuxtLink
          class="relative"
          to="/notifications"
        >
          <div
            class="absolute -start-[23px] top-2 size-1.5 rounded-full bg-primary-dark md:hidden"
            :class="{ 'opacity-0': not.isRead }"
          ></div>
          <p class="mb:text-base line-clamp-1 text-sm font-bold text-zinc-950">
            {{ not.user[0].personalInfo.username }} 向你發送了邀約訊息
          </p>
        </NuxtLink>
        <p class="mt-1 text-start text-xs text-zinc-400 md:mt-0 md:w-[90px] md:ps-3 md:text-center">
          {{ useFormattedTime(not.updatedAt) }}
        </p>
      </div>
    </li>
  </ul>
</template>
