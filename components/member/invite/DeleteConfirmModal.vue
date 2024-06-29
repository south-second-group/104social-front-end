<script setup>
const props = defineProps({
  showModal: Boolean,
  resultItemId: String,
  onClose: Function,
  onDelete: Function,
})

const isOpen = ref(props.showModal)

watch(() => props.showModal, (newVal) => {
  isOpen.value = newVal
})

async function confirmDelete() {
  try {
    await props.onDelete(props.resultItemId)
  }
  catch (error) {
    console.error('Error deleting:', error)
  }
  finally {
    isOpen.value = false
    props.onClose()
  }
}
</script>

<template>
  <div>
    <UModal
      v-model="isOpen"
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
              確認刪除此邀約嗎？
            </h3>

            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="absolute right-3 top-5 -my-1"
              @click="props.onClose()"
            />
          </div>
        </template>

        <section class="-mt-4 flex justify-center">
          <button
            class="px-[20px] py-[8px] text-[16px] leading-[24px] text-primary-dark"
            :disabled="isLoading"
            @click="props.onClose()"
          >
            <p>取消</p>
          </button>
          <button
            class="rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white"
            :disabled="isLoading"
            @click="confirmDelete"
          >
            <p>確定</p>
          </button>
        </section>
      </UCard>
    </UModal>
  </div>
</template>

<style scoped>
</style>
