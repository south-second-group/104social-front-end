<script setup>
const props = defineProps({
  status: String,
})

function getBtnClass(status) {
  switch (status) {
    case 'pending':
      return ''
    case 'finishDating':
      return 'bg-special-info'
    case 'cancel':
      return 'bg-neutral-400'
    case 'accept':
      return 'bg-special-success'
    case 'reject':
      return 'bg-special-danger'
    default:
      return 'bg-social-gradient-default'
  }
}

function getBtnText(status) {
  switch (status) {
    case 'pending':
      return ''
    case 'finishDating':
      return '已完成約會'
    case 'cancel':
      return '對方取消邀約'
    case 'accept':
      return '已接受邀約'
    case 'reject':
      return '已拒絕邀約'
    default:
      return '尚未邀約'
  }
}
</script>

<template>
  <button
    :class="getBtnClass(props.status)"
    class="text-B3 pointer-events-none rounded-full px-3 py-1 text-white "
  >
    {{ getBtnText(props.status) }}
  </button>
</template>
