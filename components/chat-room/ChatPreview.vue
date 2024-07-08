<script setup>
const props = defineProps(['chat'])
const { chat } = props
const openSetting = ref(false)
const items = [
  [
    {
      icon: 'i-heroicons-x-mark',
    },
    {
      label: '置頂',
    },
    {
      label: '關閉通知',
    },
    {
      label: '封鎖對方',
    },
    {
      label: '檢舉',
    },
  ],
]

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

function handleClickSetting(event) {
  openSetting.value = !openSetting.value
  event.stopPropagation() // 阻止事件冒泡
}

function handleClickSettingClose(event) {
  openSetting.value = !openSetting.value
  event.stopPropagation() // 阻止事件冒泡
}

const isDesktop = ref(false)

function checkScreenSize() {
  isDesktop.value = window.innerWidth >= 768
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
  <li class="flex justify-between gap-5 border-b-[1px] border-zinc-200 p-4 md:p-5">
    <div class="flex gap-5 self-start md:self-center">
      <!-- <UAvatar :size="isDesktop ? '3xl' : 'lg'" -->
      <!-- :src="chat.members[0].photo ? chat.members[0].photo : '../../public/chatRoom/default.jpg'" alt="Avatar" /> -->
      <NuxtImg
        :src="chat.members[0].photo !== '' ? chat.members[0].photo : '/chatRoom/default.png'"
        alt="Avatar"
        class="size-[80px] rounded-full object-cover"
      />
      <!-- <img src="../../public/chatRoom/default.jpg" alt=""> -->
      <div class="text-start">
        <p class="mb-1 text-base font-bold text-zinc-950 md:text-xl">
          {{ chat?.members?.length > 0 ? chat.members[0].username : 'someOne' }}
        </p>
        <p class="line-clamp-2 text-sm text-zinc-600 md:text-base">
          {{ chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].message : '' }}
        </p>
      </div>
    </div>
    <div class="flex shrink-0 flex-col items-end justify-end gap-0 md:gap-3">
      <UDropdown
        v-model:open="openSetting"
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
        @click.stop
      >
        <UButton
          color="white"
          trailing-icon="i-heroicons-ellipsis-horizontal"
          class="no-border-no-shadow"
          @click="handleClickSetting"
        />
        <template #item="{ item }">
          <div
            class="size-full"
            @click.stop
          >
            <!-- 阻止事件冒泡 -->
            <p class="truncate p-2 text-start">
              {{ item.label }}
            </p>
          </div>
          <UIcon
            :name="item.icon"
            class="ms-auto size-4 shrink-0 text-zinc-950 dark:text-gray-500"
            @click="handleClickSettingClose"
          />
        </template>
      </UDropdown>
      <div
        :class="{ 'opacity-0': chat.unreadCount < 1 }"
        class="flex size-6 justify-center self-end rounded-full bg-primary-dark md:size-9"
      >
        <p class="text-B2 self-center text-white">
          {{ chat.unreadCount }}
        </p>
      </div>
      <p class="text-B3 mt-1 text-end text-zinc-400 md:mt-0">
        {{ useFormattedTime(chat.latestUpDate) }}
      </p>
    </div>
  </li>
</template>

<style scoped>
.no-border-no-shadow {
  border: none;
  box-shadow: none;
}
</style>
