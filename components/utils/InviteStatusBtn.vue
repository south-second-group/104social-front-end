<script setup>
const props = defineProps({
  status: {
    type: Number,
    required: true,
  },
})

function getBtnClass(status) {
  switch (status) {
    case 1:
      return 'bg-special-dark'
    case 2:
      return 'bg-special-info'
    case 3:
      return 'bg-neutral-400'
    case 4:
      return 'bg-special-success'
    case 5:
      return 'bg-special-danger'
    default:
      return 'bg-special-danger'
  }
}

function getBtnText(status) {
  switch (status) {
    case 1:
      return '已發起邀約'
    case 2:
      return '已完成約會'
    case 3:
      return '已取消邀約'
    case 4:
      return '成功邀約'
    case 5:
      return '邀約失敗'
    default:
      return 'Unknown'
  }
}
</script>

<template>
  <button
    :class="getBtnClass(props.status)"
    class="text-B3 pointer-events-none rounded-full bg-primary-dark px-3 py-1 text-white "
  >
    {{ getBtnText(props.status) }}
  </button>
</template>
