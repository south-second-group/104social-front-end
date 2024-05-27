<script setup>
const props = defineProps(
  {
    status: String,
  },
)
const isOpenModal = defineModel()
const modalText = computed(() => {
  switch (props.status) {
    case 'status1':
      return '確認已解鎖評價'
    case 'status2':
      return '確認解鎖評價'
    case 'status3':
      return '確認完成約會'
    case 'status4':
      return '確認邀約'
    case 'status5':
      return '確認收回邀約'
    case 'status6':
      return '確認拒絕往來'
    case 'status7':
      return '確認恢復往來'
    case 'status8':
      return '確認未給評價'
    case 'status9':
      return '確認已給評價'
    case 'status10':
      return '確認刪除評價'
    default:
      return ''
  }
})
</script>

<template>
  <div>
    <UModal
      v-model="isOpenModal"
      :overlay="true"
      :ui="{ width: 'max-w-[350px] md:max-w-[666px]' }"
    >
      <UCard :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-center">
            <h3 class="text-B1  text-base font-bold leading-6 text-gray-900  dark:text-white">
              {{ modalText }}
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isOpenModal = false"
            />
          </div>
        </template>

        <section class=" -mt-4 flex justify-center">
          <button
            class="  px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark "
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button class=" rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px]  leading-[24px] text-white ">
            <p>確定</p>
          </button>
        </section>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
