<script setup>
import { inviteListApi } from '~/apis/repositories/inviteList'

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  resultItem: {
    type: Object,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
})

// const emit = defineEmits(['refreshMeList'])
const matchResult = useMatchResultStore()
const isModalOpen = ref(props.showModal)
const toastMessage = ref('')
const toastType = ref('')
const isLoading = ref(false)

const modalText = computed(() => {
  switch (props.status) {
    case 'rejected':
      return '確認刪除？'
    case 'cancel':
      return '確認刪除？'
    case 'finishDating':
      return '確認刪除？'
    case 'pending':
      return '確認刪除？'
    default:
      return ''
  }
})

watch(() => props.showModal, (newVal) => {
  isModalOpen.value = newVal
})

// 刪除邀約
async function deleteModalClick() {
  isLoading.value = true
  try {
    const res = await inviteListApi.deleteInviteMe(props.resultItem._id)
    // emit('refreshMeList')
    toastMessage.value = '刪除邀約成功'
    toastType.value = 'success'

    matchResult.result = matchResult.result.filter(item => item.data.userId !== props.resultItem.invitationId)
  }
  catch (error) {
    console.error('Error deleting:', error)

    toastMessage.value = '刪除邀約失敗'
    toastType.value = 'error'
  }
  finally {
    isLoading.value = false
    isModalOpen.value = false
    props.onClose()
  }
}
</script>

<template>
  <div>
    <utilsFireWork :is-fire-work="isLoading" />

    <UModal
      v-model="isModalOpen"
      :overlay="true"
      :ui="{ width: 'max-w-[350px] md:max-w-[666px]' }"
    >
      <UCard
        :ui="{ ring: '', divide: 'divide-y divide-white dark:divide-gray-800' }"
      >
        <template #header>
          <div class="flex items-center justify-center">
            <h3
              class="text-B1 text-base font-bold leading-6 text-gray-900 dark:text-white"
            >
              {{ modalText }}
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="isModalOpen = false; props.onClose()"
            />
          </div>
        </template>

        <section class="-mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading"
            @click="isModalOpen = false; props.onClose()"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading"
            @click="deleteModalClick"
          >
            <p>確定</p>
          </button>
        </section>
      </UCard>
    </UModal>

    <Toast
      v-if="toastMessage"
      :toast-message="toastMessage"
      :toast-type="toastType"
    />
  </div>
</template>

<style scoped>
</style>
