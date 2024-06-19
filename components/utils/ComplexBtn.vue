<script setup>
const props = defineProps({
  status: String,
  invitationStatus: String,
  isLocked: Boolean,
  createRenderResult: Set,
  cardUserName: String,
  userId: String,
  isUnlock: Boolean,
  beCommentCount: Number,
  hasComment: Boolean,
  beInvitationStatus: String,
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
    case 'status11':
      return '接受'
    case 'status12':
      return '拒絕'
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
  'status11',
  'status12',
]

function handleClick(status) {
  if (modalStatuses.includes(status)) {
    isOpenModal.value = true
    modalStatus.value = status
  }
  else {
    switch (status) {
      case 'status1':
        router.push(`/member/Comment/${props.userId}`)
        break
      case 'status8':
        router.push(`/member/Comment/${props.userId}--${'false'}`)
        break
      case 'status9':
        router.push(`/member/Comment/${props.userId}--${'true'}`)
        break
      default:
        console.warn('Unknown status')
    }
  }
}
</script>

<template>
  <button
    v-if="props.status === 'status1' && props.isUnlock"
    class="mx-[1px] my-[3px] flex scale-90 gap-3 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:lock-open />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status2' && !props.isUnlock && props.beCommentCount > 0
    "
    class="btn-withIcon-outline mx-[1px] my-[3px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:lock-closed />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status3'
        && props.invitationStatus === 'accept'
        && props.hasComment
    "
    class="mx-[1px] my-[3px] scale-90 rounded-full bg-primary-dark px-[20px] py-[8px] text-[16px] leading-[24px] text-white md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status4' && props.invitationStatus === 'not invited'"
    class="btn-withIcon-fill mx-[1px] my-[3px] w-[100px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:heart />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="props.status === 'status5' && props.invitationStatus === 'pending'"
    class="btn-withIcon-outline mx-[1px] my-[3px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:heart />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="props.status === 'status6' && !isLocked"
    class="btn-withIcon-outline mx-[1px] my-[3px] w-[132px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:x-mark />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="props.status === 'status7' && isLocked"
    class="btn-withIcon-fill mx-[1px] my-[3px] w-[132px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:check />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status8'
        && !props.hasComment
        && props.invitationStatus === 'accept'
    "
    class="btn-withIcon-fill mx-[1px] my-[3px] w-[132px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:pencil />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status9'
        && props.hasComment
        && (props.invitationStatus === 'accept'
          || props.invitationStatus === 'finishDating')
    "
    class="mx-[1px] my-[3px] flex scale-90 gap-1 rounded-full border-2 border-neutral-400 px-[20px] py-[6px] text-[16px] leading-[24px] text-neutral-400 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:pencil />

    <p>{{ btnText }}</p>
  </button>

  <button
    v-if="
      props.status === 'status10'
        && props.hasComment
        && props.invitationStatus === 'accept'
    "
    class="btn-withIcon-outline mx-[1px] my-[3px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <icon-heroicons:trash v />

    <p>{{ btnText }}</p>
  </button>

  <!-- && router.currentRoute.value.path === '/member/invite' -->
  <button
    v-if="props.status === 'status11' && props.beInvitationStatus === 'pending'"
    class="btn-withIcon-fill mx-[1px] my-[3px] w-[72px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <p>{{ btnText }}</p>
  </button>

  <!-- && router.currentRoute.value.path === '/member/invite' -->
  <button
    v-if="props.status === 'status12' && props.beInvitationStatus === 'pending'"
    class="btn-withIcon-outline mx-[1px] my-[3px] scale-90 md:mx-[6px] md:scale-100"
    @click="handleClick(props.status)"
  >
    <p>{{ btnText }}</p>
  </button>

  <utilsConfirmModal
    v-model="isOpenModal"
    :status="modalStatus"
    v-bind="{
      createRenderResult,
      cardUserName,
      userId,
    }"
  />
</template>
