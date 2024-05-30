<script setup>
const props = defineProps({
  status: String,
})

const router = useRouter()

const btnText = computed(() => {
  switch (props.status) {
    case 'status1':
      return '已解鎖評價'
    case 'status2':
      return '解鎖評價'
    case 'status3':
      return '完成約會'
    case 'status4':
      return '邀約'
    case 'status5':
      return '收回邀約'
    case 'status6':
      return '拒絕往來'
    case 'status7':
      return '恢復往來'
    case 'status8':
      return '未給評價'
    case 'status9':
      return '已給評價'
    case 'status10':
      return '刪除評價'
    default:
      return ''
  }
})

// 彈窗邏輯
const isOpenModal = ref(false)
const modalStatus = ref('')
const modalStatuses = [
  'status2',
  'status3',
  'status4',
  'status5',
  'status6',
  'status7',
  'status10',
]

function handleClick(status) {
  if (modalStatuses.includes(status)) {
    isOpenModal.value = true
    modalStatus.value = status
  }
  else {
    switch (status) {
      case 'status1':
        router.push('/member/Comment/true')
        break
      case 'status8':
        router.push('/member/Comment/false')
        break
      case 'status9':
        router.push('/member/Comment/true')
        break
      default:
        console.warn('Unknown status')
    }
  }
}
</script>

<template>
  <div>
    <button
      v-if="props.status === 'status1'"
      class="flex scale-90 gap-3 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:scale-100"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:lock-open />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status2'"
      class="btn-withIcon-outline scale-90 md:scale-100"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:lock-closed />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status3'"
      class="scale-90 rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white md:scale-100"
      @click="handleClick(props.status)"
    >
      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status4'"
      class="btn-withIcon-fill scale-90 md:scale-100 w-[100px]"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:heart />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status5'"
      class="btn-withIcon-outline scale-90 md:scale-100"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:heart />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status6'"
      class="btn-withIcon-outline scale-90 md:scale-100 w-[132px]"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:x-mark />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status7'"
      class="btn-withIcon-fill scale-90 md:scale-100 w-[132px]"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:check />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status8'"
      class="btn-withIcon-fill scale-90 md:scale-100 w-[132px]"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:pencil />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status9'"
      class="flex scale-90 gap-3 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:scale-100"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:pencil />

      <p>{{ btnText }}</p>
    </button>

    <button
      v-if="props.status === 'status10'"
      class="btn-withIcon-outline scale-90 md:scale-100"
      @click="handleClick(props.status)"
    >
      <icon-heroicons:trash v />

      <p>{{ btnText }}</p>
    </button>

    <utilsConfirmModal
      v-model="isOpenModal"
      :status="modalStatus"
    />
  </div>
</template>

<style scoped></style>
