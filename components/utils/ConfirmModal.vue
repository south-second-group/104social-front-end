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
      return '傳送邀約訊息，並確認邀約？'
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

const selectedOption = ref('請選擇訊息範本')
const options = ['訊息01', '訊息02', '訊息03']
const selectedToggle = ref(false)
</script>

<template>
  <div>
    <UModal
      v-model="isOpenModal"
      :overlay="true"
      :ui="{ width: 'max-w-[350px] md:max-w-[666px]' }"
    >
      <UCard
        v-if="props.status !== 'status4'"
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
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

      <UCard
        v-else
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
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

        <section class=" space-y-3">
          <utilsDropdownComp
            v-model="selectedOption"
            :options="options"
            size="sm"
          />
          <UTextarea
            :ui="{ base: ' focus:!ring-primary-dark' }"
            :rows="10"
            placeholder="請填寫邀約訊息"
          />
          <p class=" text-B4 text-end text-neutral-400">
            上限200字（剩餘100字）
          </p>
          <div class="flex justify-end">
            <UToggle
              v-model="selectedToggle"
              :ui="{ active: 'bg-primary-dark' }"
            />
            <span class="text-B4">儲存此次範本</span>
          </div>
        </section>

        <section
          class="mt-4 flex justify-center"
        >
          <button
            class="  px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark "
            @click="isOpenModal = false"
          >
            <p>取消</p>
          </button>
          <button class=" rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px]  leading-[24px] text-white ">
            <p>發送邀約</p>
          </button>
        </section>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped></style>
